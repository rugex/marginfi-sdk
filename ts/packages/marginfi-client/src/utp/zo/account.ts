import {
  AccountMeta,
  ComputeBudgetProgram,
  Keypair,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import MarginfiAccount from "../../account";
import MarginfiClient from "../../client";
import { BankVaultType, InstructionsWrapper, UiAmount, UtpData } from "../../types";
import {
  createTempTransferAccounts as createTempTransferAccountIxs,
  getBankAuthority,
  processTransaction,
  uiToNative,
} from "../../utils";
import instructions from "./instructions";

import { BN } from "@project-serum/anchor";
import * as ZoClient from "@zero_one/client";
import { CONTROL_ACCOUNT_SIZE, OrderType } from "@zero_one/client";
import BigNumber from "bignumber.js";
import { DUST_THRESHOLD } from "../../constants";
import UtpAccount from "../account";
import { UtpObservation } from "../observation";
import { UtpZoPlacePerpOrderArgs } from "./types";

/**
 * Class encapsulating 01-specific interactions (internal)
 */
export class UtpZoAccount extends UtpAccount {
  /** @internal */
  constructor(client: MarginfiClient, marginfiAccount: MarginfiAccount, accountData: UtpData) {
    super(client, marginfiAccount, accountData.isActive, accountData.accountConfig);
  }

  // --- Getters / Setters

  /**
   * UTP-specific config
   */
  public get config() {
    return this._config.zo;
  }

  // --- Others

  async makeActivateIx(): Promise<InstructionsWrapper> {
    const zoControlKey = Keypair.generate();

    const controlAccountRent = await this._program.provider.connection.getMinimumBalanceForRentExemption(
      CONTROL_ACCOUNT_SIZE
    );

    const provider = this._program.provider;
    const createZoControlAccount = SystemProgram.createAccount({
      fromPubkey: provider.wallet.publicKey,
      newAccountPubkey: zoControlKey.publicKey,
      lamports: controlAccountRent,
      space: CONTROL_ACCOUNT_SIZE,
      programId: this.config.programId,
    });

    const utpAuthoritySeed = Keypair.generate().publicKey;

    const zoProgramId = this._config.zo.programId;
    const [utpAuthorityPk, utpAuthorityBump] = await this.authority(utpAuthoritySeed);

    const zoProgram = ZoClient.createProgram(this._client.program.provider, this._config.zo.cluster);
    const state = await ZoClient.State.load(zoProgram, this._config.zo.statePk);
    const [zoMarginPubkey, zoMarginNonce] = await ZoClient.Margin.getMarginKey(state, utpAuthorityPk, zoProgram);

    const activateZoIx = await instructions.makeActivateIx(
      this._program,
      {
        marginfiGroup: this._config.groupPk,
        marginfiAccount: this._marginfiAccount.publicKey,
        authority: this._program.provider.wallet.publicKey,
        utpAuthority: utpAuthorityPk,
        zoProgram: zoProgramId,
        zoState: state.pubkey,
        zoMargin: zoMarginPubkey,
        zoControl: zoControlKey.publicKey,
      },
      {
        authoritySeed: utpAuthoritySeed,
        authorityBump: utpAuthorityBump,
        zoMarginNonce,
      }
    );

    return {
      instructions: [createZoControlAccount, activateZoIx],
      keys: [zoControlKey],
    };
  }

  async activate(): Promise<string> {
    const debug = require("debug")(`mfi:margin-account:${this._marginfiAccount.publicKey}:utp:zo:activate`);
    debug("Activate 01 UTP");

    const activateIx = await this.makeActivateIx();

    const tx = new Transaction().add(...activateIx.instructions);
    const sig = await processTransaction(this._program.provider, tx, [...activateIx.keys]);
    debug("Sig %s", sig);
    await this._marginfiAccount.reload(); // Required to update the internal UTP address
    return sig;
  }

  /**
   * Create transaction instruction to deactivate Mango.
   *
   * @returns `DeactivateUtp` transaction instruction
   */
  async makeDeactivateIx(): Promise<InstructionsWrapper> {
    return this._marginfiAccount.makeDeactivateUtpIx(this.index);
  }

  /**
   * Deactivate UTP.
   *
   * @returns Transaction signature
   */
  async deactivate() {
    const debug = require("debug")(`mfi:utp:${this.address}:zo:deactivate`);
    this.verifyActive();
    debug("Deactivating 01 UTP");

    const sig = await this._marginfiAccount.deactivateUtp(this.index);
    debug("Sig %s", sig);
    await this._marginfiAccount.reload(); // Required to update the internal UTP address
    return sig;
  }

  async makeDepositIx(amount: UiAmount): Promise<InstructionsWrapper> {
    const zoProgramId = this._config.zo.programId;

    const [utpAuthorityPk] = await this.authority();
    const [tempTokenAccountKey, createTokenAccountIx, initTokenAccountIx] = await createTempTransferAccountIxs(
      this._client.program.provider,
      this._client.group.bank.mint,
      utpAuthorityPk
    );

    const [bankAuthority] = await getBankAuthority(
      this._config.groupPk,
      this._program.programId,
      BankVaultType.LiquidityVault
    );

    const [zoStateSigner] = await ZoClient.State.getSigner(this.config.statePk, zoProgramId);
    const zoState = await ZoClient.State.load(
      await ZoClient.createProgram(this._program.provider, this.config.cluster),
      this.config.statePk
    );
    const [zoVaultPk] = await zoState.getVaultCollateralByMint(this._client.group.bank.mint);
    const remainingAccounts = await this._marginfiAccount.getObservationAccounts();

    return {
      instructions: [
        createTokenAccountIx,
        initTokenAccountIx,
        await instructions.makeDepositIx(
          this._program,
          {
            marginfiGroup: this._config.groupPk,
            marginfiAccount: this._marginfiAccount.publicKey,
            signer: this._program.provider.wallet.publicKey,
            marginCollateralVault: this._client.group.bank.vault,
            bankAuthority: bankAuthority,
            tempCollateralAccount: tempTokenAccountKey.publicKey,
            utpAuthority: utpAuthorityPk,
            zoProgram: zoProgramId,
            zoState: this.config.statePk,
            zoStateSigner: zoStateSigner,
            zoCache: zoState.cache.pubkey,
            zoMargin: this.address,
            zoVault: zoVaultPk,
          },
          { amount: uiToNative(amount) },
          remainingAccounts
        ),
      ],
      keys: [tempTokenAccountKey],
    };
  }

  async deposit(amount: UiAmount): Promise<string> {
    const debug = require("debug")(`mfi:margin-account:${this._marginfiAccount.publicKey}:utp:zo:deposit`);
    debug("Depositing %s into 01", amount);

    const depositIx = await this.makeDepositIx(amount);
    const tx = new Transaction().add(...depositIx.instructions);
    const sig = await processTransaction(this._program.provider, tx, [...depositIx.keys]);
    debug("Sig %s", sig);
    return sig;
  }

  async makeWithdrawIx(amount: UiAmount): Promise<TransactionInstruction> {
    const [utpAuthority] = await this.authority();
    const zoProgram = await ZoClient.createProgram(this._program.provider, this.config.cluster);
    const zoState = await ZoClient.State.load(zoProgram, this.config.statePk);
    const [zoVaultPk] = await zoState.getVaultCollateralByMint(this._client.group.bank.mint);
    const zoMargin = await ZoClient.Margin.load(zoProgram, zoState, undefined, utpAuthority);
    const remainingAccounts = await this._marginfiAccount.getObservationAccounts();

    return instructions.makeWithdrawIx(
      this._program,
      {
        marginfiAccount: this._marginfiAccount.publicKey,
        marginfiGroup: this._client.group.publicKey,
        signer: this._program.provider.wallet.publicKey,
        marginCollateralVault: this._client.group.bank.vault,
        utpAuthority: utpAuthority,
        zoMargin: this.address,
        zoProgram: this.config.programId,
        zoState: this.config.statePk,
        zoStateSigner: zoState.signer,
        zoCache: zoState.cache.pubkey,
        zoControl: zoMargin.control.pubkey,
        zoVault: zoVaultPk,
        heimdall: this.config.heimdall,
      },
      { amount: uiToNative(amount) },
      remainingAccounts
    );
  }

  async withdraw(amount: UiAmount): Promise<string> {
    const debug = require("debug")(`mfi:margin-account:${this._marginfiAccount.publicKey}:utp:zo:withdraw`);
    debug("Withdrawing %s from 01", amount);

    const withdrawIx = await this.makeWithdrawIx(amount);
    const tx = new Transaction().add(withdrawIx);
    const sig = await processTransaction(this._program.provider, tx);
    debug("Sig %s", sig);
    return sig;
  }

  /** @internal */
  private verifyActive() {
    const debug = require("debug")(`mfi:utp:${this.address}:zo:verify-active`);
    if (!this.isActive) {
      debug("Utp isn't active");
      throw new Error("Utp isn't active");
    }
  }

  async makeCreatePerpOpenOrdersIx(marketSymbol: string): Promise<InstructionsWrapper> {
    const [utpAuthority] = await this.authority();
    const zoProgram = await ZoClient.createProgram(this._program.provider, this.config.cluster);
    const zoState = await ZoClient.State.load(zoProgram, this.config.statePk);
    const zoMargin = await ZoClient.Margin.load(zoProgram, zoState, zoState.cache, utpAuthority);
    const [openOrdersPk] = await zoMargin.getOpenOrdersKeyBySymbol(marketSymbol, this.config.cluster);

    return {
      instructions: [
        await instructions.makeCreatePerpOpenOrdersIx(this._program, {
          marginfiAccount: this._marginfiAccount.publicKey,
          marginfiGroup: this._client.group.publicKey,
          utpAuthority,
          signer: this._client.program.provider.wallet.publicKey,
          zoProgram: this.config.programId,
          zoState: this.config.statePk,
          zoStateSigner: zoState.signer,
          zoMargin: this.address,
          zoControl: zoMargin.control.pubkey,
          zoOpenOrders: openOrdersPk,
          zoDexMarket: zoState.getMarketKeyBySymbol(marketSymbol),
          zoDexProgram: this.config.dexProgram,
        }),
      ],
      keys: [],
    };
  }

  async createPerpOpenOrders(symbol: string): Promise<string> {
    const debug = require("debug")(
      `mfi:margin-account:${this._marginfiAccount.publicKey}:utp:zo:create-perp-open-orders`
    );
    debug("Creating perp open orders account on 01");

    const createPerpOpenOrdersIx = await this.makeCreatePerpOpenOrdersIx(symbol);
    const tx = new Transaction().add(...createPerpOpenOrdersIx.instructions);
    const sig = await processTransaction(this._client.program.provider, tx);
    debug("Sig %s", sig);
    return sig;
  }

  async makePlacePerpOrderIx({
    symbol,
    orderType,
    isLong,
    price,
    size,
    limit,
    clientId,
  }: Readonly<{
    symbol: string;
    orderType: OrderType;
    isLong: boolean;
    price: number;
    size: number;
    limit?: number;
    clientId?: BN;
  }>): Promise<InstructionsWrapper> {
    const debug = require("debug")(`mfi:margin-account:${this._marginfiAccount.publicKey}:utp:zo:place-perp-order`);
    const [utpAuthority] = await this.authority();

    const zoProgram = await ZoClient.createProgram(this._program.provider, this.config.cluster);
    const zoState = await ZoClient.State.load(zoProgram, this.config.statePk);

    const zoMargin = await ZoClient.Margin.load(zoProgram, zoState, zoState.cache, utpAuthority);

    const [openOrdersPk] = await zoMargin.getOpenOrdersKeyBySymbol(symbol, this.config.cluster);

    const market = await zoState.getMarketBySymbol(symbol);
    const limitPriceBn = market.priceNumberToLots(price);
    const maxBaseQtyBn = market.baseSizeNumberToLots(size);
    const takerFee =
      market.decoded.perpType.toNumber() === 1
        ? ZoClient.ZO_FUTURE_TAKER_FEE
        : market.decoded.perpType.toNumber() === 2
        ? ZoClient.ZO_OPTION_TAKER_FEE
        : ZoClient.ZO_SQUARE_TAKER_FEE;
    const feeMultiplier = isLong ? 1 + takerFee : 1 - takerFee;
    const maxQuoteQtyBn = new BN(
      Math.round(limitPriceBn.mul(maxBaseQtyBn).mul(market.decoded["quoteLotSize"]).toNumber() * feeMultiplier)
    );
    const remainingAccounts = await this._marginfiAccount.getObservationAccounts();

    const args: UtpZoPlacePerpOrderArgs = {
      isLong,
      limitPrice: limitPriceBn,
      maxBaseQuantity: maxBaseQtyBn,
      maxQuoteQuantity: maxQuoteQtyBn,
      orderType,
      limit: limit ?? 10,
      clientId: clientId ?? new BN(0),
    };

    debug(args);

    return {
      instructions: [
        await instructions.makePlacePerpOrderIx(
          this._client.program,
          {
            marginfiAccount: this._marginfiAccount.publicKey,
            marginfiGroup: this._client.group.publicKey,
            utpAuthority: utpAuthority,
            signer: this._program.provider.wallet.publicKey,
            zoProgram: zoProgram.programId,
            state: zoState.pubkey,
            stateSigner: zoState.signer,
            cache: zoState.cache.pubkey,
            margin: zoMargin.pubkey,
            control: zoMargin.control.pubkey,
            openOrders: openOrdersPk,
            dexMarket: market.publicKey,
            reqQ: market.requestQueueAddress,
            eventQ: market.eventQueueAddress,
            marketBids: market.bidsAddress,
            marketAsks: market.asksAddress,
            dexProgram: this.config.dexProgram,
          },
          { args },
          remainingAccounts
        ),
      ],
      keys: [],
    };
  }

  async placePerpOrder(
    args: Readonly<{
      symbol: string;
      orderType: OrderType;
      isLong: boolean;
      price: number;
      size: number;
      limit?: number;
      clientId?: BN;
    }>
  ): Promise<string> {
    const debug = require("debug")(`mfi:margin-account:${this._marginfiAccount.publicKey}:utp:zo:place-perp-order`);
    debug("Placing perp order on 01");
    debug("%s", args);

    const requestCUIx = ComputeBudgetProgram.requestUnits({
      units: 400000,
      additionalFee: 0,
    });
    const placeOrderIx = await this.makePlacePerpOrderIx(args);
    const tx = new Transaction().add(requestCUIx, ...placeOrderIx.instructions);
    const sig = await processTransaction(this._program.provider, tx);
    debug("Sig %s", sig);
    return sig;
  }

  async makeCancelPerpOrderIx(args: {
    symbol: string;
    isLong?: boolean;
    orderId?: BN;
    clientId?: BN;
  }): Promise<InstructionsWrapper> {
    const [utpAuthority] = await this.authority();

    const zoProgram = await ZoClient.createProgram(this._program.provider, this.config.cluster);
    const zoState = await ZoClient.State.load(zoProgram, this.config.statePk);
    const zoMargin = await ZoClient.Margin.load(zoProgram, zoState, undefined, utpAuthority);
    const [openOrdersPk] = await zoMargin.getOpenOrdersKeyBySymbol(args.symbol, this.config.cluster);
    const market = await zoState.getMarketBySymbol(args.symbol);
    const remainingAccounts = await this._marginfiAccount.getObservationAccounts();

    return {
      instructions: [
        await instructions.makeCancelPerpOrderIx(
          this._client.program,
          {
            marginfiAccount: this._marginfiAccount.publicKey,
            marginfiGroup: this._client.group.publicKey,
            utpAuthority: utpAuthority,
            signer: this._program.provider.wallet.publicKey,
            zoProgram: zoProgram.programId,
            state: zoState.pubkey,
            cache: zoState.cache.pubkey,
            margin: zoMargin.pubkey,
            control: zoMargin.control.pubkey,
            openOrders: openOrdersPk,
            dexMarket: market.publicKey,
            eventQ: market.eventQueueAddress,
            marketBids: market.bidsAddress,
            marketAsks: market.asksAddress,
            dexProgram: this.config.dexProgram,
          },
          {
            clientId: args.clientId,
            isLong: args.isLong,
            orderId: args.orderId,
          },
          remainingAccounts
        ),
      ],
      keys: [],
    };
  }

  async cancelPerpOrder(args: { symbol: string; isLong?: boolean; orderId?: BN; clientId?: BN }): Promise<string> {
    const debug = require("debug")(`mfi:margin-account:${this._marginfiAccount.publicKey}:utp:zo:cancel-perp-order`);
    debug("Cancelling perp order on 01");

    const ix = await this.makeCancelPerpOrderIx(args);
    const tx = new Transaction().add(...ix.instructions);
    const sig = await processTransaction(this._client.program.provider, tx);
    debug("Sig %s", sig);
    return sig;
  }

  async makeSettleFundsIx(symbol: string): Promise<InstructionsWrapper> {
    const [utpAuthority] = await await this.authority();

    const zoProgram = await ZoClient.createProgram(this._program.provider, this.config.cluster);
    const zoState = await ZoClient.State.load(zoProgram, this.config.statePk);
    const zoMargin = await ZoClient.Margin.load(zoProgram, zoState, undefined, utpAuthority);

    const [openOrdersPk] = await zoMargin.getOpenOrdersKeyBySymbol(symbol, this.config.cluster);

    return {
      instructions: [
        await instructions.makeSettleFundsIx(this._client.program, {
          marginfiAccount: this._marginfiAccount.publicKey,
          marginfiGroup: this._client.group.publicKey,
          utpAuthority: utpAuthority,
          signer: this._program.provider.wallet.publicKey,
          zoProgram: zoProgram.programId,
          state: zoState.pubkey,
          stateSigner: zoState.signer,
          cache: zoState.cache.pubkey,
          margin: zoMargin.pubkey,
          control: zoMargin.control.pubkey,
          openOrders: openOrdersPk,
          dexMarket: zoState.getMarketKeyBySymbol(symbol),
          dexProgram: this.config.dexProgram,
        }),
      ],
      keys: [],
    };
  }

  async settleFunds(symbol: string): Promise<string> {
    const debug = require("debug")(`mfi:margin-account:${this._marginfiAccount.publicKey}:utp:zo:settle-funds`);
    debug(`Settling funds on market ${symbol}`);
    const ix = await this.makeSettleFundsIx(symbol);
    const tx = new Transaction().add(...ix.instructions);
    const sig = processTransaction(this._client.program.provider, tx);
    debug("Sig %s", sig);
    return sig;
  }

  async getZoState(): Promise<ZoClient.State> {
    const zoProgram = await ZoClient.createProgram(this._program.provider, this.config.cluster);
    return ZoClient.State.load(zoProgram, this.config.statePk);
  }

  async getZoMargin(zoState?: ZoClient.State): Promise<ZoClient.Margin> {
    const [utpAuthority] = await this.authority();

    if (!zoState) {
      zoState = await this.getZoState();
    }

    const zoProgram = zoState.program;
    const zoMargin = await ZoClient.Margin.load(zoProgram, zoState, undefined, utpAuthority);

    return zoMargin;
  }

  async getObservationAccounts(): Promise<AccountMeta[]> {
    const zoMargin = await this.getZoMargin();
    const zoState = await this.getZoState();

    return [
      { pubkey: zoMargin.pubkey, isWritable: false, isSigner: false },
      { pubkey: zoMargin.control.pubkey, isWritable: false, isSigner: false },
      { pubkey: zoState.pubkey, isWritable: false, isSigner: false },
      { pubkey: zoState.cache.pubkey, isWritable: false, isSigner: false },
    ];
  }

  async observe(): Promise<UtpObservation> {
    const debug = require("debug")(`mfi:utp:${this.address}:zo:local-observe`);
    debug("Observing Locally");

    const zoMargin = await this.getZoMargin();

    const equity = new BigNumber(zoMargin.unweightedAccountValue.toString());
    const initMarginRequirement = new BigNumber(zoMargin.initialMarginInfo(null)[0].toString());
    const freeCollateral = new BigNumber(zoMargin.freeCollateralValue.toString());
    const isRebalanceDepositNeeded = equity.lt(initMarginRequirement); // TODO: Check disconnect between equity/freeCollateral/initMarginRequirement according 01 and our terminology
    const maxRebalanceDepositAmount = BigNumber.max(0, initMarginRequirement.minus(equity));
    const isEmpty = equity.lt(DUST_THRESHOLD);

    const observation = new UtpObservation({
      timestamp: new Date(),
      equity,
      freeCollateral,
      initMarginRequirement,
      liquidationValue: equity,
      isRebalanceDepositNeeded,
      maxRebalanceDepositAmount,
      isEmpty,
    });
    this._cachedObservation = observation;
    return observation;
  }
}
