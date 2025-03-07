require("dotenv").config();

import { BankVaultType, getBankAuthority, MarginfiClient } from "@mrgnlabs/marginfi-client";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import { Command, OptionValues } from "commander";
import { writeFileSync } from "fs";
import { createAccount } from "./src/account/create";
import { deposit } from "./src/account/deposit";
import { getAccount, getAccounts as listAccounts } from "./src/account/get";
import { activateMango } from "./src/account/mango/activate";
import { depositMango } from "./src/account/mango/deposit";
import { withdrawMango } from "./src/account/mango/withdraw";
import { withdraw } from "./src/account/withdraw";
import { activateZo } from "./src/account/zo/activate";
import { depositZo } from "./src/account/zo/deposit";
import { withdrawZo } from "./src/account/zo/withdraw";
import { getClientFromOptions } from "./src/common";
import { decodeEvent } from "./src/decode-event";
import { configureGroup } from "./src/group/configure-group";
import { createGroup } from "./src/group/create-group";
import { getGroup } from "./src/group/load-group-config";
import { airdropCollateral } from "./src/token-faucet";

function attachDefaultOptions(command: Command, excludeGroup: boolean = false): Command {
  command.requiredOption(
    "-k, --keypair <KEYPAIR>",
    "Path to keypair file",
    process.env.WALLET || "~/.config/solana/id.json"
  );
  command.requiredOption(
    "-u, --url <URL>",
    "URL for Solana's JSON RPC",
    process.env.RPC_ENDPOINT || "https://marginfi.genesysgo.net/"
  );
  command.requiredOption(
    "-e, --environment <ENVIRONMENT>",
    "Environment to use [mainnet-beta, devnet]",
    process.env.ENV || "mainnet-beta"
  );

  if (!excludeGroup) {
    command.option("-G, --group <address>", "marginfi group address");
  }

  return command;
}

const cliProgram = new Command();

cliProgram.name("marginfi cli");

const accountProgram = cliProgram.command("account");

attachDefaultOptions(accountProgram.command("create")).action(createAccount);
attachDefaultOptions(accountProgram.command("get")).argument("[address]", "account address").action(getAccount);
attachDefaultOptions(accountProgram.command("list")).action(listAccounts);

attachDefaultOptions(accountProgram.command("deposit")).arguments("<amount>").action(deposit);
attachDefaultOptions(accountProgram.command("withdraw")).arguments("<amount>").action(withdraw);

const mangoProgram = accountProgram.command("mango");

attachDefaultOptions(mangoProgram.command("activate")).action(activateMango);
attachDefaultOptions(mangoProgram.command("deposit")).arguments("<amount>").action(depositMango);
attachDefaultOptions(mangoProgram.command("withdraw")).arguments("<amount>").action(withdrawMango);

const zoProgram = accountProgram.command("zo");

attachDefaultOptions(zoProgram.command("activate")).action(activateZo);
attachDefaultOptions(zoProgram.command("deposit")).arguments("<amount>").action(depositZo);
attachDefaultOptions(zoProgram.command("withdraw")).arguments("<amount>").action(withdrawZo);

const utilProgram = cliProgram.command("utils");

attachDefaultOptions(utilProgram.command("faucet-airdrop"))
  .argument("<amount>")
  .requiredOption("-F, --faucet <address>", "faucet address")
  .requiredOption("-M, --mint <address>", "mint address")
  .action(airdropCollateral);

attachDefaultOptions(utilProgram.command("decode")).argument("<data>").action(decodeEvent);

const groupProgram = utilProgram.command("group");

attachDefaultOptions(groupProgram.command("get")).action(getGroup);
attachDefaultOptions(groupProgram.command("create"))
  .requiredOption("-C, --collateral <string>", "collateral mint address")
  .action(createGroup);

attachDefaultOptions(groupProgram.command("config"))
  .option("--admin <string>", "group admin")
  .option("--scalingFactorC <number>", "interest rate curve scaling factor c")
  .option("--fixedFee <number>", "interest rate curve fixed fee")
  .option("--interestFee <number>", "interest rate curve interest fee")
  .option("--initMarginRatio <number>", "initialization margin ratio")
  .option("--maintMarginRatio <number>", "maintenance margin ratio")
  .option("-P, --paused <boolean>", "paused")
  .option("--accountDepositLimit <number>", "account deposit limit")
  .option("--lpDepositLimit <number>", "liquidity pool deposit limit")
  .action(configureGroup);

attachDefaultOptions(utilProgram.command("get-config")).action(async (options: OptionValues) => {
  const client = await getClientFromOptions(options);
  console.log(
    "ENV=%s\nRPC_ENDPOINT=%s\nMARGINFI_PROGRAM=%s\nMARGINFI_GROUP=%s\nMARGINFI_ACCOUNT=%s\nWALLET=%s\nSIGNER=%s",
    client.config.environment,
    client.program.provider.connection.rpcEndpoint,
    client.programId,
    client.config.groupPk,
    process.env.MARGINFI_ACCOUNT,
    options.keypair,
    client.program.provider.wallet.publicKey
  );
});

attachDefaultOptions(utilProgram.command("dump-account"))
  .arguments("<address> <out>")
  .action(async (address: string, out: string, options: OptionValues) => {
    const client = await getClientFromOptions(options);
    const ai = await client.program.provider.connection.getAccountInfo(new PublicKey(address));

    writeFileSync(out, ai!.data);
  });

attachDefaultOptions(groupProgram.command("withdraw-fees"))
  .arguments("<address> <amount>")
  .action(async (address: string, amount: number) => {
    const mfiClient = await MarginfiClient.fromEnv();
    const [bankFeeVaultAuthority, _] = await getBankAuthority(
      mfiClient.group.publicKey,
      mfiClient.programId,
      BankVaultType.FeeVault
    );
    const sig = await mfiClient.program.methods
      .bankFeeVaultWithdraw(new BN(amount))
      .accounts({
        marginfiGroup: mfiClient.group.publicKey,
        admin: mfiClient.program.provider.wallet.publicKey,
        bankFeeVault: mfiClient.group.bank.feeVault,
        bankFeeVaultAuthority,
        tokenProgram: TOKEN_PROGRAM_ID,
        recipientTokenAccount: new PublicKey(address),
      })
      .rpc();

    console.log("Sig %s", sig);
  });

cliProgram.parse();
