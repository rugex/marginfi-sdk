export type Marginfi = {
  version: "0.1.0";
  name: "marginfi";
  instructions: [
    {
      name: "initMarginfiGroup";
      accounts: [
        {
          name: "marginfiGroup";
          isMut: true;
          isSigner: false;
        },
        {
          name: "admin";
          isMut: true;
          isSigner: true;
        },
        {
          name: "collateralMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "bankVault";
          isMut: false;
          isSigner: false;
        },
        {
          name: "bankAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "insuranceVault";
          isMut: false;
          isSigner: false;
        },
        {
          name: "insuranceVaultAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "feeVault";
          isMut: false;
          isSigner: false;
        },
        {
          name: "feeVaultAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "bankAuthorityPdaBump";
          type: "u8";
        },
        {
          name: "insuranceVaultAuthorityPdaBump";
          type: "u8";
        },
        {
          name: "feeVaultAuthorityPdaBump";
          type: "u8";
        }
      ];
    },
    {
      name: "configureMarginfiGroup";
      accounts: [
        {
          name: "marginfiGroup";
          isMut: true;
          isSigner: false;
        },
        {
          name: "admin";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "configArg";
          type: {
            defined: "GroupConfig";
          };
        }
      ];
    },
    {
      name: "bankFeeVaultWithdraw";
      accounts: [
        {
          name: "marginfiGroup";
          isMut: true;
          isSigner: false;
        },
        {
          name: "admin";
          isMut: false;
          isSigner: true;
        },
        {
          name: "bankFeeVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "bankFeeVaultAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "recipientTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "initMarginfiAccount";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "marginfiGroup";
          isMut: false;
          isSigner: false;
        },
        {
          name: "marginfiAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "bankInsuranceVaultWithdraw";
      accounts: [
        {
          name: "marginfiGroup";
          isMut: true;
          isSigner: false;
        },
        {
          name: "admin";
          isMut: false;
          isSigner: true;
        },
        {
          name: "insuranceVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "insuranceVaultAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "recipientTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "marginDepositCollateral";
      accounts: [
        {
          name: "marginfiAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "marginfiGroup";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: false;
          isSigner: true;
        },
        {
          name: "fundingAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "marginWithdrawCollateral";
      accounts: [
        {
          name: "marginfiAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "marginfiGroup";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: false;
          isSigner: true;
        },
        {
          name: "marginCollateralVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "marginBankAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "receivingTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "liquidate";
      accounts: [
        {
          name: "marginfiAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "marginfiGroup";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "marginfiAccountLiquidatee";
          isMut: true;
          isSigner: false;
        },
        {
          name: "bankVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "bankAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "bankInsuranceVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "utpIndex";
          type: "u64";
        }
      ];
    },
    {
      name: "deactivateUtp";
      accounts: [
        {
          name: "marginfiAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "utpIndex";
          type: "u64";
        }
      ];
    },
    {
      name: "handleBankruptcy";
      accounts: [
        {
          name: "marginfiAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "marginfiGroup";
          isMut: true;
          isSigner: false;
        },
        {
          name: "insuranceVaultAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "insuranceVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "liquidityVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "updateInterestAccumulator";
      accounts: [
        {
          name: "marginfiGroup";
          isMut: true;
          isSigner: false;
        },
        {
          name: "bankVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "bankAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "bankFeeVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "utpMangoActivate";
      accounts: [
        {
          name: "marginfiAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "marginfiGroup";
          isMut: false;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "mangoAuthority";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mangoAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mangoProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mangoGroup";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "authoritySeed";
          type: "publicKey";
        },
        {
          name: "authorityBump";
          type: "u8";
        }
      ];
    },
    {
      name: "utpMangoDeposit";
      accounts: [
        {
          name: "marginfiAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "marginfiGroup";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "marginCollateralVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "bankAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tempCollateralAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mangoAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mangoAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mangoProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mangoGroup";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mangoCache";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mangoRootBank";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mangoNodeBank";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mangoVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "utpMangoWithdraw";
      accounts: [
        {
          name: "marginfiAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "marginfiGroup";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: false;
          isSigner: true;
        },
        {
          name: "marginCollateralVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mangoAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mangoAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mangoProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mangoGroup";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mangoCache";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mangoRootBank";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mangoNodeBank";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mangoVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mangoVaultAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "utpMangoUsePlacePerpOrder";
      accounts: [
        {
          name: "marginfiAccount";
          isMut: false;
          isSigner: false;
        },
        {
          name: "marginfiGroup";
          isMut: false;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "mangoAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mangoAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mangoProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mangoGroup";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mangoCache";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mangoPerpMarket";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mangoBids";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mangoAsks";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mangoEventQueue";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "args";
          type: {
            defined: "UtpMangoPlacePerpOrderArgs";
          };
        }
      ];
    },
    {
      name: "utpMangoUseCancelPerpOrder";
      accounts: [
        {
          name: "marginfiAccount";
          isMut: false;
          isSigner: false;
        },
        {
          name: "marginfiGroup";
          isMut: false;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "mangoAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mangoAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mangoProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mangoGroup";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mangoPerpMarket";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mangoBids";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mangoAsks";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "orderId";
          type: "i128";
        },
        {
          name: "invalidIdOk";
          type: "bool";
        }
      ];
    },
    {
      name: "utpZoActivate";
      accounts: [
        {
          name: "marginfiAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "marginfiGroup";
          isMut: false;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "utpAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "zoProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "zoState";
          isMut: false;
          isSigner: false;
        },
        {
          name: "zoMargin";
          isMut: true;
          isSigner: false;
        },
        {
          name: "zoControl";
          isMut: true;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "authoritySeed";
          type: "publicKey";
        },
        {
          name: "authorityBump";
          type: "u8";
        },
        {
          name: "zoMarginNonce";
          type: "u8";
        }
      ];
    },
    {
      name: "utpZoDeposit";
      accounts: [
        {
          name: "marginfiAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "marginfiGroup";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "marginCollateralVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "bankAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tempCollateralAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "utpAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "zoProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "zoState";
          isMut: false;
          isSigner: false;
        },
        {
          name: "zoStateSigner";
          isMut: false;
          isSigner: false;
        },
        {
          name: "zoCache";
          isMut: true;
          isSigner: false;
        },
        {
          name: "zoMargin";
          isMut: true;
          isSigner: false;
        },
        {
          name: "zoVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "utpZoWithdraw";
      accounts: [
        {
          name: "marginfiAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "marginfiGroup";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: false;
          isSigner: true;
        },
        {
          name: "marginCollateralVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "utpAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "zoMargin";
          isMut: true;
          isSigner: false;
        },
        {
          name: "zoProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "zoState";
          isMut: true;
          isSigner: false;
        },
        {
          name: "zoStateSigner";
          isMut: true;
          isSigner: false;
        },
        {
          name: "zoCache";
          isMut: true;
          isSigner: false;
        },
        {
          name: "zoControl";
          isMut: true;
          isSigner: false;
        },
        {
          name: "zoVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "heimdall";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "utpZoCreatePerpOpenOrders";
      accounts: [
        {
          name: "header";
          accounts: [
            {
              name: "marginfiAccount";
              isMut: false;
              isSigner: false;
            },
            {
              name: "marginfiGroup";
              isMut: false;
              isSigner: false;
            },
            {
              name: "signer";
              isMut: true;
              isSigner: true;
            },
            {
              name: "utpAuthority";
              isMut: false;
              isSigner: false;
            }
          ];
        },
        {
          name: "zoProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "state";
          isMut: false;
          isSigner: false;
        },
        {
          name: "stateSigner";
          isMut: true;
          isSigner: false;
        },
        {
          name: "margin";
          isMut: true;
          isSigner: false;
        },
        {
          name: "control";
          isMut: true;
          isSigner: false;
        },
        {
          name: "openOrders";
          isMut: true;
          isSigner: false;
        },
        {
          name: "dexMarket";
          isMut: true;
          isSigner: false;
        },
        {
          name: "dexProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "utpZoPlacePerpOrder";
      accounts: [
        {
          name: "header";
          accounts: [
            {
              name: "marginfiAccount";
              isMut: false;
              isSigner: false;
            },
            {
              name: "marginfiGroup";
              isMut: false;
              isSigner: false;
            },
            {
              name: "signer";
              isMut: true;
              isSigner: true;
            },
            {
              name: "utpAuthority";
              isMut: false;
              isSigner: false;
            }
          ];
        },
        {
          name: "zoProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "state";
          isMut: false;
          isSigner: false;
        },
        {
          name: "stateSigner";
          isMut: true;
          isSigner: false;
        },
        {
          name: "cache";
          isMut: true;
          isSigner: false;
        },
        {
          name: "margin";
          isMut: true;
          isSigner: false;
        },
        {
          name: "control";
          isMut: true;
          isSigner: false;
        },
        {
          name: "openOrders";
          isMut: true;
          isSigner: false;
        },
        {
          name: "dexMarket";
          isMut: true;
          isSigner: false;
        },
        {
          name: "reqQ";
          isMut: true;
          isSigner: false;
        },
        {
          name: "eventQ";
          isMut: true;
          isSigner: false;
        },
        {
          name: "marketBids";
          isMut: true;
          isSigner: false;
        },
        {
          name: "marketAsks";
          isMut: true;
          isSigner: false;
        },
        {
          name: "dexProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "args";
          type: {
            defined: "UtpZoPlacePerpOrderIxArgs";
          };
        }
      ];
    },
    {
      name: "utpZoCancelPerpOrder";
      accounts: [
        {
          name: "header";
          accounts: [
            {
              name: "marginfiAccount";
              isMut: false;
              isSigner: false;
            },
            {
              name: "marginfiGroup";
              isMut: false;
              isSigner: false;
            },
            {
              name: "signer";
              isMut: true;
              isSigner: true;
            },
            {
              name: "utpAuthority";
              isMut: false;
              isSigner: false;
            }
          ];
        },
        {
          name: "zoProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "state";
          isMut: false;
          isSigner: false;
        },
        {
          name: "cache";
          isMut: true;
          isSigner: false;
        },
        {
          name: "margin";
          isMut: true;
          isSigner: false;
        },
        {
          name: "control";
          isMut: true;
          isSigner: false;
        },
        {
          name: "openOrders";
          isMut: true;
          isSigner: false;
        },
        {
          name: "dexMarket";
          isMut: true;
          isSigner: false;
        },
        {
          name: "marketBids";
          isMut: true;
          isSigner: false;
        },
        {
          name: "marketAsks";
          isMut: true;
          isSigner: false;
        },
        {
          name: "eventQ";
          isMut: true;
          isSigner: false;
        },
        {
          name: "dexProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "orderId";
          type: {
            option: "u128";
          };
        },
        {
          name: "isLong";
          type: {
            option: "bool";
          };
        },
        {
          name: "clientId";
          type: {
            option: "u64";
          };
        }
      ];
    },
    {
      name: "utpZoSettleFunds";
      accounts: [
        {
          name: "header";
          accounts: [
            {
              name: "marginfiAccount";
              isMut: false;
              isSigner: false;
            },
            {
              name: "marginfiGroup";
              isMut: false;
              isSigner: false;
            },
            {
              name: "signer";
              isMut: true;
              isSigner: true;
            },
            {
              name: "utpAuthority";
              isMut: false;
              isSigner: false;
            }
          ];
        },
        {
          name: "zoProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "state";
          isMut: false;
          isSigner: false;
        },
        {
          name: "stateSigner";
          isMut: true;
          isSigner: false;
        },
        {
          name: "cache";
          isMut: true;
          isSigner: false;
        },
        {
          name: "margin";
          isMut: true;
          isSigner: false;
        },
        {
          name: "control";
          isMut: true;
          isSigner: false;
        },
        {
          name: "openOrders";
          isMut: true;
          isSigner: false;
        },
        {
          name: "dexMarket";
          isMut: true;
          isSigner: false;
        },
        {
          name: "dexProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "marginfiAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "publicKey";
          },
          {
            name: "marginfiGroup";
            type: "publicKey";
          },
          {
            name: "depositRecord";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "borrowRecord";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "activeUtps";
            type: {
              array: ["bool", 32];
            };
          },
          {
            name: "utpAccountConfig";
            type: {
              array: [
                {
                  defined: "UTPAccountConfig";
                },
                32
              ];
            };
          },
          {
            name: "reservedSpace";
            type: {
              array: ["u128", 256];
            };
          }
        ];
      };
    },
    {
      name: "marginfiGroup";
      type: {
        kind: "struct";
        fields: [
          {
            name: "admin";
            type: "publicKey";
          },
          {
            name: "bank";
            type: {
              defined: "Bank";
            };
          },
          {
            name: "paused";
            type: "bool";
          },
          {
            name: "reservedSpace";
            type: {
              array: ["u128", 384];
            };
          }
        ];
      };
    },
    {
      name: "state";
      type: {
        kind: "struct";
        fields: [
          {
            name: "marginRequirementInit";
            type: "u128";
          },
          {
            name: "marginRequirementMaint";
            type: "u128";
          },
          {
            name: "equity";
            type: "u128";
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "UtpMangoPlacePerpOrderArgs";
      type: {
        kind: "struct";
        fields: [
          {
            name: "side";
            type: {
              defined: "MangoSide";
            };
          },
          {
            name: "price";
            type: "i64";
          },
          {
            name: "maxBaseQuantity";
            type: "i64";
          },
          {
            name: "maxQuoteQuantity";
            type: "i64";
          },
          {
            name: "clientOrderId";
            type: "u64";
          },
          {
            name: "orderType";
            type: {
              defined: "MangoOrderType";
            };
          },
          {
            name: "reduceOnly";
            type: "bool";
          },
          {
            name: "expiryTimestamp";
            type: {
              option: "u64";
            };
          },
          {
            name: "limit";
            type: "u8";
          },
          {
            name: "expiryType";
            type: {
              defined: "MangoExpiryType";
            };
          }
        ];
      };
    },
    {
      name: "UtpZoPlacePerpOrderIxArgs";
      type: {
        kind: "struct";
        fields: [
          {
            name: "isLong";
            type: "bool";
          },
          {
            name: "limitPrice";
            type: "u64";
          },
          {
            name: "maxBaseQuantity";
            type: "u64";
          },
          {
            name: "maxQuoteQuantity";
            type: "u64";
          },
          {
            name: "orderType";
            type: {
              defined: "OrderType";
            };
          },
          {
            name: "limit";
            type: "u16";
          },
          {
            name: "clientId";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "UtpZoCancelPerpOrderIxArgs";
      type: {
        kind: "struct";
        fields: [
          {
            name: "orderId";
            type: {
              option: "u128";
            };
          },
          {
            name: "isLong";
            type: {
              option: "bool";
            };
          },
          {
            name: "clientId";
            type: {
              option: "u64";
            };
          }
        ];
      };
    },
    {
      name: "WrappedI80F48";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bits";
            type: "i128";
          }
        ];
      };
    },
    {
      name: "UTPAccountConfig";
      type: {
        kind: "struct";
        fields: [
          {
            name: "address";
            type: "publicKey";
          },
          {
            name: "authoritySeed";
            type: "publicKey";
          },
          {
            name: "authorityBump";
            type: "u8";
          },
          {
            name: "utpAddressBook";
            type: {
              array: ["publicKey", 4];
            };
          },
          {
            name: "reservedSpace";
            type: {
              array: ["u32", 32];
            };
          }
        ];
      };
    },
    {
      name: "UTPConfig";
      type: {
        kind: "struct";
        fields: [
          {
            name: "utpProgramId";
            type: "publicKey";
          },
          {
            name: "marginRequirementDepositBuffer";
            type: {
              defined: "WrappedI80F48";
            };
          }
        ];
      };
    },
    {
      name: "GroupConfig";
      type: {
        kind: "struct";
        fields: [
          {
            name: "admin";
            type: {
              option: "publicKey";
            };
          },
          {
            name: "bank";
            type: {
              option: {
                defined: "BankConfig";
              };
            };
          },
          {
            name: "paused";
            type: {
              option: "bool";
            };
          }
        ];
      };
    },
    {
      name: "BankConfig";
      type: {
        kind: "struct";
        fields: [
          {
            name: "scalingFactorC";
            type: {
              option: "u64";
            };
          },
          {
            name: "fixedFee";
            type: {
              option: "u64";
            };
          },
          {
            name: "interestFee";
            type: {
              option: "u64";
            };
          },
          {
            name: "initMarginRatio";
            type: {
              option: "u64";
            };
          },
          {
            name: "maintMarginRatio";
            type: {
              option: "u64";
            };
          },
          {
            name: "accountDepositLimit";
            type: {
              option: "u64";
            };
          },
          {
            name: "lpDepositLimit";
            type: {
              option: "u64";
            };
          }
        ];
      };
    },
    {
      name: "Bank";
      type: {
        kind: "struct";
        fields: [
          {
            name: "scalingFactorC";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "fixedFee";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "interestFee";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "depositAccumulator";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "borrowAccumulator";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "lastUpdate";
            type: "i64";
          },
          {
            name: "totalDepositsRecord";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "totalBorrowsRecord";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "mint";
            type: "publicKey";
          },
          {
            name: "vault";
            type: "publicKey";
          },
          {
            name: "vaultAuthorityPdaBump";
            type: "u8";
          },
          {
            name: "insuranceVault";
            type: "publicKey";
          },
          {
            name: "insuranceVaultAuthorityPdaBump";
            type: "u8";
          },
          {
            name: "insuranceVaultOutstandingTransfers";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "feeVault";
            type: "publicKey";
          },
          {
            name: "feeVaultAuthorityPdaBump";
            type: "u8";
          },
          {
            name: "feeVaultOutstandingTransfers";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "initMarginRatio";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "maintMarginRatio";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "accountDepositLimit";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "lpDepositLimit";
            type: {
              defined: "WrappedI80F48";
            };
          },
          {
            name: "reservedSpace";
            type: {
              array: ["u128", 31];
            };
          }
        ];
      };
    },
    {
      name: "MangoOrderType";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Limit";
          },
          {
            name: "ImmediateOrCancel";
          },
          {
            name: "PostOnly";
          },
          {
            name: "Market";
          },
          {
            name: "PostOnlySlide";
          }
        ];
      };
    },
    {
      name: "MangoSide";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Bid";
          },
          {
            name: "Ask";
          }
        ];
      };
    },
    {
      name: "MangoExpiryType";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Absolute";
          },
          {
            name: "Relative";
          }
        ];
      };
    },
    {
      name: "MarginRequirement";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Init";
          },
          {
            name: "PartialLiquidation";
          },
          {
            name: "Maint";
          }
        ];
      };
    },
    {
      name: "EquityType";
      type: {
        kind: "enum";
        variants: [
          {
            name: "InitReqAdjusted";
          },
          {
            name: "Total";
          }
        ];
      };
    },
    {
      name: "BankVaultType";
      type: {
        kind: "enum";
        variants: [
          {
            name: "LiquidityVault";
          },
          {
            name: "InsuranceVault";
          },
          {
            name: "ProtocolFeeVault";
          }
        ];
      };
    },
    {
      name: "InternalTransferType";
      type: {
        kind: "enum";
        variants: [
          {
            name: "InsuranceFee";
          },
          {
            name: "ProtocolFee";
          }
        ];
      };
    },
    {
      name: "LendingSide";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Borrow";
          },
          {
            name: "Deposit";
          }
        ];
      };
    },
    {
      name: "OrderType";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Limit";
          },
          {
            name: "ImmediateOrCancel";
          },
          {
            name: "PostOnly";
          },
          {
            name: "ReduceOnlyIoc";
          },
          {
            name: "ReduceOnlyLimit";
          },
          {
            name: "FillOrKill";
          }
        ];
      };
    }
  ];
  events: [
    {
      name: "UpdateInterestAccumulatorEvent";
      fields: [
        {
          name: "currentTimestamp";
          type: "i64";
          index: false;
        },
        {
          name: "deltaCompoundingPeriods";
          type: "u64";
          index: false;
        },
        {
          name: "feesCollected";
          type: {
            defined: "WrappedI80F48";
          };
          index: false;
        },
        {
          name: "utilizationRate";
          type: {
            defined: "WrappedI80F48";
          };
          index: false;
        },
        {
          name: "interestRate";
          type: {
            defined: "WrappedI80F48";
          };
          index: false;
        }
      ];
    },
    {
      name: "MarginRequirementCheck";
      fields: [
        {
          name: "init";
          type: "bool";
          index: false;
        },
        {
          name: "equity";
          type: {
            defined: "WrappedI80F48";
          };
          index: false;
        },
        {
          name: "marginRequirement";
          type: {
            defined: "WrappedI80F48";
          };
          index: false;
        }
      ];
    },
    {
      name: "UptObservationFreeCollateral";
      fields: [
        {
          name: "utpIndex";
          type: "u8";
          index: false;
        },
        {
          name: "value";
          type: {
            defined: "WrappedI80F48";
          };
          index: false;
        }
      ];
    },
    {
      name: "UptObservationNeedsRebalance";
      fields: [
        {
          name: "utpIndex";
          type: "u8";
          index: false;
        },
        {
          name: "netFreeCollateral";
          type: {
            defined: "WrappedI80F48";
          };
          index: false;
        }
      ];
    },
    {
      name: "RiskEnginePermissionlessAction";
      fields: [];
    },
    {
      name: "RiskEngineReduceOnly";
      fields: [];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "Unauthorized";
      msg: "Signer not authorized to perform this action";
    },
    {
      code: 6001;
      name: "EmptyLendingPool";
      msg: "Lending pool empty";
    },
    {
      code: 6002;
      name: "IllegalUtilizationRatio";
      msg: "Illegal utilization ratio";
    },
    {
      code: 6003;
      name: "MathError";
      msg: "very bad mafs";
    },
    {
      code: 6004;
      name: "InvalidTimestamp";
      msg: "Invalid timestamp";
    },
    {
      code: 6005;
      name: "MarginRequirementsNotMet";
      msg: "Initialization margin requirements not met";
    },
    {
      code: 6006;
      name: "OnlyReduceAllowed";
      msg: "Only reducing trades are allowed when under init margin requirements";
    },
    {
      code: 6007;
      name: "UtpInactive";
      msg: "Inactive UTP";
    },
    {
      code: 6008;
      name: "UtpAlreadyActive";
      msg: "Utp is already active";
    },
    {
      code: 6009;
      name: "InvalidAccountData";
      msg: "Invalid Account Data";
    },
    {
      code: 6010;
      name: "LiquidatorHasActiveUtps";
      msg: "Liquidator has active utps";
    },
    {
      code: 6011;
      name: "AccountHasActiveUtps";
      msg: "Account has active utps";
    },
    {
      code: 6012;
      name: "AccountNotLiquidatable";
      msg: "Marginfi account not liquidatable";
    },
    {
      code: 6013;
      name: "AccountNotBankrupt";
      msg: "Marginfi account not bankrupt";
    },
    {
      code: 6014;
      name: "IllegalUtpDeactivation";
      msg: "Utp account cannot be deactivated";
    },
    {
      code: 6015;
      name: "IllegalRebalance";
      msg: "Rebalance not legal";
    },
    {
      code: 6016;
      name: "BorrowNotAllowed";
      msg: "Borrow not allowed";
    },
    {
      code: 6017;
      name: "IllegalConfig";
      msg: "Config value not legal";
    },
    {
      code: 6018;
      name: "OperationsPaused";
      msg: "Operations paused";
    },
    {
      code: 6019;
      name: "InsufficientVaultBalance";
      msg: "Insufficient balance";
    },
    {
      code: 6020;
      name: "Forbidden";
      msg: "This operation is forbidden";
    },
    {
      code: 6021;
      name: "InvalidUTPAccount";
      msg: "Invalid account key";
    },
    {
      code: 6022;
      name: "AccountDepositLimit";
      msg: "Deposit exceeds account cap";
    },
    {
      code: 6023;
      name: "GroupDepositLimit";
      msg: "Deposit exceeds group cap";
    },
    {
      code: 6024;
      name: "InvalidObserveAccounts";
      msg: "Missing accounts for UTP observation";
    },
    {
      code: 6025;
      name: "MangoError";
      msg: "Mango error";
    }
  ];
};

export const IDL: Marginfi = {
  version: "0.1.0",
  name: "marginfi",
  instructions: [
    {
      name: "initMarginfiGroup",
      accounts: [
        {
          name: "marginfiGroup",
          isMut: true,
          isSigner: false,
        },
        {
          name: "admin",
          isMut: true,
          isSigner: true,
        },
        {
          name: "collateralMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "bankVault",
          isMut: false,
          isSigner: false,
        },
        {
          name: "bankAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "insuranceVault",
          isMut: false,
          isSigner: false,
        },
        {
          name: "insuranceVaultAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "feeVault",
          isMut: false,
          isSigner: false,
        },
        {
          name: "feeVaultAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "bankAuthorityPdaBump",
          type: "u8",
        },
        {
          name: "insuranceVaultAuthorityPdaBump",
          type: "u8",
        },
        {
          name: "feeVaultAuthorityPdaBump",
          type: "u8",
        },
      ],
    },
    {
      name: "configureMarginfiGroup",
      accounts: [
        {
          name: "marginfiGroup",
          isMut: true,
          isSigner: false,
        },
        {
          name: "admin",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "configArg",
          type: {
            defined: "GroupConfig",
          },
        },
      ],
    },
    {
      name: "bankFeeVaultWithdraw",
      accounts: [
        {
          name: "marginfiGroup",
          isMut: true,
          isSigner: false,
        },
        {
          name: "admin",
          isMut: false,
          isSigner: true,
        },
        {
          name: "bankFeeVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "bankFeeVaultAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "recipientTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "initMarginfiAccount",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "marginfiGroup",
          isMut: false,
          isSigner: false,
        },
        {
          name: "marginfiAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "bankInsuranceVaultWithdraw",
      accounts: [
        {
          name: "marginfiGroup",
          isMut: true,
          isSigner: false,
        },
        {
          name: "admin",
          isMut: false,
          isSigner: true,
        },
        {
          name: "insuranceVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "insuranceVaultAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "recipientTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "marginDepositCollateral",
      accounts: [
        {
          name: "marginfiAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marginfiGroup",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: false,
          isSigner: true,
        },
        {
          name: "fundingAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "marginWithdrawCollateral",
      accounts: [
        {
          name: "marginfiAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marginfiGroup",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: false,
          isSigner: true,
        },
        {
          name: "marginCollateralVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marginBankAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "receivingTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "liquidate",
      accounts: [
        {
          name: "marginfiAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marginfiGroup",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "marginfiAccountLiquidatee",
          isMut: true,
          isSigner: false,
        },
        {
          name: "bankVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "bankAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "bankInsuranceVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "utpIndex",
          type: "u64",
        },
      ],
    },
    {
      name: "deactivateUtp",
      accounts: [
        {
          name: "marginfiAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "utpIndex",
          type: "u64",
        },
      ],
    },
    {
      name: "handleBankruptcy",
      accounts: [
        {
          name: "marginfiAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marginfiGroup",
          isMut: true,
          isSigner: false,
        },
        {
          name: "insuranceVaultAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "insuranceVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "liquidityVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "updateInterestAccumulator",
      accounts: [
        {
          name: "marginfiGroup",
          isMut: true,
          isSigner: false,
        },
        {
          name: "bankVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "bankAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "bankFeeVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "utpMangoActivate",
      accounts: [
        {
          name: "marginfiAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marginfiGroup",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "mangoAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mangoAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mangoProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mangoGroup",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "authoritySeed",
          type: "publicKey",
        },
        {
          name: "authorityBump",
          type: "u8",
        },
      ],
    },
    {
      name: "utpMangoDeposit",
      accounts: [
        {
          name: "marginfiAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marginfiGroup",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "marginCollateralVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "bankAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tempCollateralAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mangoAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mangoAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mangoProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mangoGroup",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mangoCache",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mangoRootBank",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mangoNodeBank",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mangoVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "utpMangoWithdraw",
      accounts: [
        {
          name: "marginfiAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marginfiGroup",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: false,
          isSigner: true,
        },
        {
          name: "marginCollateralVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mangoAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mangoAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mangoProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mangoGroup",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mangoCache",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mangoRootBank",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mangoNodeBank",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mangoVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mangoVaultAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "utpMangoUsePlacePerpOrder",
      accounts: [
        {
          name: "marginfiAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "marginfiGroup",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "mangoAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mangoAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mangoProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mangoGroup",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mangoCache",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mangoPerpMarket",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mangoBids",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mangoAsks",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mangoEventQueue",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: "UtpMangoPlacePerpOrderArgs",
          },
        },
      ],
    },
    {
      name: "utpMangoUseCancelPerpOrder",
      accounts: [
        {
          name: "marginfiAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "marginfiGroup",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "mangoAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mangoAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mangoProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mangoGroup",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mangoPerpMarket",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mangoBids",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mangoAsks",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "orderId",
          type: "i128",
        },
        {
          name: "invalidIdOk",
          type: "bool",
        },
      ],
    },
    {
      name: "utpZoActivate",
      accounts: [
        {
          name: "marginfiAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marginfiGroup",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "utpAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "zoProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "zoState",
          isMut: false,
          isSigner: false,
        },
        {
          name: "zoMargin",
          isMut: true,
          isSigner: false,
        },
        {
          name: "zoControl",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "authoritySeed",
          type: "publicKey",
        },
        {
          name: "authorityBump",
          type: "u8",
        },
        {
          name: "zoMarginNonce",
          type: "u8",
        },
      ],
    },
    {
      name: "utpZoDeposit",
      accounts: [
        {
          name: "marginfiAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marginfiGroup",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "marginCollateralVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "bankAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tempCollateralAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "utpAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "zoProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "zoState",
          isMut: false,
          isSigner: false,
        },
        {
          name: "zoStateSigner",
          isMut: false,
          isSigner: false,
        },
        {
          name: "zoCache",
          isMut: true,
          isSigner: false,
        },
        {
          name: "zoMargin",
          isMut: true,
          isSigner: false,
        },
        {
          name: "zoVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "utpZoWithdraw",
      accounts: [
        {
          name: "marginfiAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marginfiGroup",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: false,
          isSigner: true,
        },
        {
          name: "marginCollateralVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "utpAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "zoMargin",
          isMut: true,
          isSigner: false,
        },
        {
          name: "zoProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "zoState",
          isMut: true,
          isSigner: false,
        },
        {
          name: "zoStateSigner",
          isMut: true,
          isSigner: false,
        },
        {
          name: "zoCache",
          isMut: true,
          isSigner: false,
        },
        {
          name: "zoControl",
          isMut: true,
          isSigner: false,
        },
        {
          name: "zoVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "heimdall",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "utpZoCreatePerpOpenOrders",
      accounts: [
        {
          name: "header",
          accounts: [
            {
              name: "marginfiAccount",
              isMut: false,
              isSigner: false,
            },
            {
              name: "marginfiGroup",
              isMut: false,
              isSigner: false,
            },
            {
              name: "signer",
              isMut: true,
              isSigner: true,
            },
            {
              name: "utpAuthority",
              isMut: false,
              isSigner: false,
            },
          ],
        },
        {
          name: "zoProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "state",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stateSigner",
          isMut: true,
          isSigner: false,
        },
        {
          name: "margin",
          isMut: true,
          isSigner: false,
        },
        {
          name: "control",
          isMut: true,
          isSigner: false,
        },
        {
          name: "openOrders",
          isMut: true,
          isSigner: false,
        },
        {
          name: "dexMarket",
          isMut: true,
          isSigner: false,
        },
        {
          name: "dexProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "utpZoPlacePerpOrder",
      accounts: [
        {
          name: "header",
          accounts: [
            {
              name: "marginfiAccount",
              isMut: false,
              isSigner: false,
            },
            {
              name: "marginfiGroup",
              isMut: false,
              isSigner: false,
            },
            {
              name: "signer",
              isMut: true,
              isSigner: true,
            },
            {
              name: "utpAuthority",
              isMut: false,
              isSigner: false,
            },
          ],
        },
        {
          name: "zoProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "state",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stateSigner",
          isMut: true,
          isSigner: false,
        },
        {
          name: "cache",
          isMut: true,
          isSigner: false,
        },
        {
          name: "margin",
          isMut: true,
          isSigner: false,
        },
        {
          name: "control",
          isMut: true,
          isSigner: false,
        },
        {
          name: "openOrders",
          isMut: true,
          isSigner: false,
        },
        {
          name: "dexMarket",
          isMut: true,
          isSigner: false,
        },
        {
          name: "reqQ",
          isMut: true,
          isSigner: false,
        },
        {
          name: "eventQ",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marketBids",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marketAsks",
          isMut: true,
          isSigner: false,
        },
        {
          name: "dexProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: "UtpZoPlacePerpOrderIxArgs",
          },
        },
      ],
    },
    {
      name: "utpZoCancelPerpOrder",
      accounts: [
        {
          name: "header",
          accounts: [
            {
              name: "marginfiAccount",
              isMut: false,
              isSigner: false,
            },
            {
              name: "marginfiGroup",
              isMut: false,
              isSigner: false,
            },
            {
              name: "signer",
              isMut: true,
              isSigner: true,
            },
            {
              name: "utpAuthority",
              isMut: false,
              isSigner: false,
            },
          ],
        },
        {
          name: "zoProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "state",
          isMut: false,
          isSigner: false,
        },
        {
          name: "cache",
          isMut: true,
          isSigner: false,
        },
        {
          name: "margin",
          isMut: true,
          isSigner: false,
        },
        {
          name: "control",
          isMut: true,
          isSigner: false,
        },
        {
          name: "openOrders",
          isMut: true,
          isSigner: false,
        },
        {
          name: "dexMarket",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marketBids",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marketAsks",
          isMut: true,
          isSigner: false,
        },
        {
          name: "eventQ",
          isMut: true,
          isSigner: false,
        },
        {
          name: "dexProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "orderId",
          type: {
            option: "u128",
          },
        },
        {
          name: "isLong",
          type: {
            option: "bool",
          },
        },
        {
          name: "clientId",
          type: {
            option: "u64",
          },
        },
      ],
    },
    {
      name: "utpZoSettleFunds",
      accounts: [
        {
          name: "header",
          accounts: [
            {
              name: "marginfiAccount",
              isMut: false,
              isSigner: false,
            },
            {
              name: "marginfiGroup",
              isMut: false,
              isSigner: false,
            },
            {
              name: "signer",
              isMut: true,
              isSigner: true,
            },
            {
              name: "utpAuthority",
              isMut: false,
              isSigner: false,
            },
          ],
        },
        {
          name: "zoProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "state",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stateSigner",
          isMut: true,
          isSigner: false,
        },
        {
          name: "cache",
          isMut: true,
          isSigner: false,
        },
        {
          name: "margin",
          isMut: true,
          isSigner: false,
        },
        {
          name: "control",
          isMut: true,
          isSigner: false,
        },
        {
          name: "openOrders",
          isMut: true,
          isSigner: false,
        },
        {
          name: "dexMarket",
          isMut: true,
          isSigner: false,
        },
        {
          name: "dexProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "marginfiAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "marginfiGroup",
            type: "publicKey",
          },
          {
            name: "depositRecord",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "borrowRecord",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "activeUtps",
            type: {
              array: ["bool", 32],
            },
          },
          {
            name: "utpAccountConfig",
            type: {
              array: [
                {
                  defined: "UTPAccountConfig",
                },
                32,
              ],
            },
          },
          {
            name: "reservedSpace",
            type: {
              array: ["u128", 256],
            },
          },
        ],
      },
    },
    {
      name: "marginfiGroup",
      type: {
        kind: "struct",
        fields: [
          {
            name: "admin",
            type: "publicKey",
          },
          {
            name: "bank",
            type: {
              defined: "Bank",
            },
          },
          {
            name: "paused",
            type: "bool",
          },
          {
            name: "reservedSpace",
            type: {
              array: ["u128", 384],
            },
          },
        ],
      },
    },
    {
      name: "state",
      type: {
        kind: "struct",
        fields: [
          {
            name: "marginRequirementInit",
            type: "u128",
          },
          {
            name: "marginRequirementMaint",
            type: "u128",
          },
          {
            name: "equity",
            type: "u128",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "UtpMangoPlacePerpOrderArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "side",
            type: {
              defined: "MangoSide",
            },
          },
          {
            name: "price",
            type: "i64",
          },
          {
            name: "maxBaseQuantity",
            type: "i64",
          },
          {
            name: "maxQuoteQuantity",
            type: "i64",
          },
          {
            name: "clientOrderId",
            type: "u64",
          },
          {
            name: "orderType",
            type: {
              defined: "MangoOrderType",
            },
          },
          {
            name: "reduceOnly",
            type: "bool",
          },
          {
            name: "expiryTimestamp",
            type: {
              option: "u64",
            },
          },
          {
            name: "limit",
            type: "u8",
          },
          {
            name: "expiryType",
            type: {
              defined: "MangoExpiryType",
            },
          },
        ],
      },
    },
    {
      name: "UtpZoPlacePerpOrderIxArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "isLong",
            type: "bool",
          },
          {
            name: "limitPrice",
            type: "u64",
          },
          {
            name: "maxBaseQuantity",
            type: "u64",
          },
          {
            name: "maxQuoteQuantity",
            type: "u64",
          },
          {
            name: "orderType",
            type: {
              defined: "OrderType",
            },
          },
          {
            name: "limit",
            type: "u16",
          },
          {
            name: "clientId",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "UtpZoCancelPerpOrderIxArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "orderId",
            type: {
              option: "u128",
            },
          },
          {
            name: "isLong",
            type: {
              option: "bool",
            },
          },
          {
            name: "clientId",
            type: {
              option: "u64",
            },
          },
        ],
      },
    },
    {
      name: "WrappedI80F48",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bits",
            type: "i128",
          },
        ],
      },
    },
    {
      name: "UTPAccountConfig",
      type: {
        kind: "struct",
        fields: [
          {
            name: "address",
            type: "publicKey",
          },
          {
            name: "authoritySeed",
            type: "publicKey",
          },
          {
            name: "authorityBump",
            type: "u8",
          },
          {
            name: "utpAddressBook",
            type: {
              array: ["publicKey", 4],
            },
          },
          {
            name: "reservedSpace",
            type: {
              array: ["u32", 32],
            },
          },
        ],
      },
    },
    {
      name: "UTPConfig",
      type: {
        kind: "struct",
        fields: [
          {
            name: "utpProgramId",
            type: "publicKey",
          },
          {
            name: "marginRequirementDepositBuffer",
            type: {
              defined: "WrappedI80F48",
            },
          },
        ],
      },
    },
    {
      name: "GroupConfig",
      type: {
        kind: "struct",
        fields: [
          {
            name: "admin",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "bank",
            type: {
              option: {
                defined: "BankConfig",
              },
            },
          },
          {
            name: "paused",
            type: {
              option: "bool",
            },
          },
        ],
      },
    },
    {
      name: "BankConfig",
      type: {
        kind: "struct",
        fields: [
          {
            name: "scalingFactorC",
            type: {
              option: "u64",
            },
          },
          {
            name: "fixedFee",
            type: {
              option: "u64",
            },
          },
          {
            name: "interestFee",
            type: {
              option: "u64",
            },
          },
          {
            name: "initMarginRatio",
            type: {
              option: "u64",
            },
          },
          {
            name: "maintMarginRatio",
            type: {
              option: "u64",
            },
          },
          {
            name: "accountDepositLimit",
            type: {
              option: "u64",
            },
          },
          {
            name: "lpDepositLimit",
            type: {
              option: "u64",
            },
          },
        ],
      },
    },
    {
      name: "Bank",
      type: {
        kind: "struct",
        fields: [
          {
            name: "scalingFactorC",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "fixedFee",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "interestFee",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "depositAccumulator",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "borrowAccumulator",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "lastUpdate",
            type: "i64",
          },
          {
            name: "totalDepositsRecord",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "totalBorrowsRecord",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "mint",
            type: "publicKey",
          },
          {
            name: "vault",
            type: "publicKey",
          },
          {
            name: "vaultAuthorityPdaBump",
            type: "u8",
          },
          {
            name: "insuranceVault",
            type: "publicKey",
          },
          {
            name: "insuranceVaultAuthorityPdaBump",
            type: "u8",
          },
          {
            name: "insuranceVaultOutstandingTransfers",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "feeVault",
            type: "publicKey",
          },
          {
            name: "feeVaultAuthorityPdaBump",
            type: "u8",
          },
          {
            name: "feeVaultOutstandingTransfers",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "initMarginRatio",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "maintMarginRatio",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "accountDepositLimit",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "lpDepositLimit",
            type: {
              defined: "WrappedI80F48",
            },
          },
          {
            name: "reservedSpace",
            type: {
              array: ["u128", 31],
            },
          },
        ],
      },
    },
    {
      name: "MangoOrderType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Limit",
          },
          {
            name: "ImmediateOrCancel",
          },
          {
            name: "PostOnly",
          },
          {
            name: "Market",
          },
          {
            name: "PostOnlySlide",
          },
        ],
      },
    },
    {
      name: "MangoSide",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Bid",
          },
          {
            name: "Ask",
          },
        ],
      },
    },
    {
      name: "MangoExpiryType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Absolute",
          },
          {
            name: "Relative",
          },
        ],
      },
    },
    {
      name: "MarginRequirement",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Init",
          },
          {
            name: "PartialLiquidation",
          },
          {
            name: "Maint",
          },
        ],
      },
    },
    {
      name: "EquityType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "InitReqAdjusted",
          },
          {
            name: "Total",
          },
        ],
      },
    },
    {
      name: "BankVaultType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "LiquidityVault",
          },
          {
            name: "InsuranceVault",
          },
          {
            name: "ProtocolFeeVault",
          },
        ],
      },
    },
    {
      name: "InternalTransferType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "InsuranceFee",
          },
          {
            name: "ProtocolFee",
          },
        ],
      },
    },
    {
      name: "LendingSide",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Borrow",
          },
          {
            name: "Deposit",
          },
        ],
      },
    },
    {
      name: "OrderType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Limit",
          },
          {
            name: "ImmediateOrCancel",
          },
          {
            name: "PostOnly",
          },
          {
            name: "ReduceOnlyIoc",
          },
          {
            name: "ReduceOnlyLimit",
          },
          {
            name: "FillOrKill",
          },
        ],
      },
    },
  ],
  events: [
    {
      name: "UpdateInterestAccumulatorEvent",
      fields: [
        {
          name: "currentTimestamp",
          type: "i64",
          index: false,
        },
        {
          name: "deltaCompoundingPeriods",
          type: "u64",
          index: false,
        },
        {
          name: "feesCollected",
          type: {
            defined: "WrappedI80F48",
          },
          index: false,
        },
        {
          name: "utilizationRate",
          type: {
            defined: "WrappedI80F48",
          },
          index: false,
        },
        {
          name: "interestRate",
          type: {
            defined: "WrappedI80F48",
          },
          index: false,
        },
      ],
    },
    {
      name: "MarginRequirementCheck",
      fields: [
        {
          name: "init",
          type: "bool",
          index: false,
        },
        {
          name: "equity",
          type: {
            defined: "WrappedI80F48",
          },
          index: false,
        },
        {
          name: "marginRequirement",
          type: {
            defined: "WrappedI80F48",
          },
          index: false,
        },
      ],
    },
    {
      name: "UptObservationFreeCollateral",
      fields: [
        {
          name: "utpIndex",
          type: "u8",
          index: false,
        },
        {
          name: "value",
          type: {
            defined: "WrappedI80F48",
          },
          index: false,
        },
      ],
    },
    {
      name: "UptObservationNeedsRebalance",
      fields: [
        {
          name: "utpIndex",
          type: "u8",
          index: false,
        },
        {
          name: "netFreeCollateral",
          type: {
            defined: "WrappedI80F48",
          },
          index: false,
        },
      ],
    },
    {
      name: "RiskEnginePermissionlessAction",
      fields: [],
    },
    {
      name: "RiskEngineReduceOnly",
      fields: [],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "Unauthorized",
      msg: "Signer not authorized to perform this action",
    },
    {
      code: 6001,
      name: "EmptyLendingPool",
      msg: "Lending pool empty",
    },
    {
      code: 6002,
      name: "IllegalUtilizationRatio",
      msg: "Illegal utilization ratio",
    },
    {
      code: 6003,
      name: "MathError",
      msg: "very bad mafs",
    },
    {
      code: 6004,
      name: "InvalidTimestamp",
      msg: "Invalid timestamp",
    },
    {
      code: 6005,
      name: "MarginRequirementsNotMet",
      msg: "Initialization margin requirements not met",
    },
    {
      code: 6006,
      name: "OnlyReduceAllowed",
      msg: "Only reducing trades are allowed when under init margin requirements",
    },
    {
      code: 6007,
      name: "UtpInactive",
      msg: "Inactive UTP",
    },
    {
      code: 6008,
      name: "UtpAlreadyActive",
      msg: "Utp is already active",
    },
    {
      code: 6009,
      name: "InvalidAccountData",
      msg: "Invalid Account Data",
    },
    {
      code: 6010,
      name: "LiquidatorHasActiveUtps",
      msg: "Liquidator has active utps",
    },
    {
      code: 6011,
      name: "AccountHasActiveUtps",
      msg: "Account has active utps",
    },
    {
      code: 6012,
      name: "AccountNotLiquidatable",
      msg: "Marginfi account not liquidatable",
    },
    {
      code: 6013,
      name: "AccountNotBankrupt",
      msg: "Marginfi account not bankrupt",
    },
    {
      code: 6014,
      name: "IllegalUtpDeactivation",
      msg: "Utp account cannot be deactivated",
    },
    {
      code: 6015,
      name: "IllegalRebalance",
      msg: "Rebalance not legal",
    },
    {
      code: 6016,
      name: "BorrowNotAllowed",
      msg: "Borrow not allowed",
    },
    {
      code: 6017,
      name: "IllegalConfig",
      msg: "Config value not legal",
    },
    {
      code: 6018,
      name: "OperationsPaused",
      msg: "Operations paused",
    },
    {
      code: 6019,
      name: "InsufficientVaultBalance",
      msg: "Insufficient balance",
    },
    {
      code: 6020,
      name: "Forbidden",
      msg: "This operation is forbidden",
    },
    {
      code: 6021,
      name: "InvalidUTPAccount",
      msg: "Invalid account key",
    },
    {
      code: 6022,
      name: "AccountDepositLimit",
      msg: "Deposit exceeds account cap",
    },
    {
      code: 6023,
      name: "GroupDepositLimit",
      msg: "Deposit exceeds group cap",
    },
    {
      code: 6024,
      name: "InvalidObserveAccounts",
      msg: "Missing accounts for UTP observation",
    },
    {
      code: 6025,
      name: "MangoError",
      msg: "Mango error",
    },
  ],
};
