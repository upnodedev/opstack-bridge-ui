import type {
  Account,
  Chain,
  Transport,
  WalletClient,
  WriteContractReturnType,
} from "viem";
import {
  writeDepositTransaction,
  type WriteDepositTransactionParameters,
} from "./writeDepositTransaction.js";
import {
  RawOrContractAddress,
  resolveAddress,
} from "@hooks/types/op-viem-type/addresses.js";
import { DepositETHParameters } from "@hooks/types/op-viem-type/depositETH.js";
import { type GetChainIdReturnType } from "@wagmi/core";

export type WriteDepositETHParameters<
  TChain extends Chain | undefined = Chain,
  _chainId = TChain extends Chain ? TChain["id"] : number,
> = {
  args: DepositETHParameters;
  portal: RawOrContractAddress<_chainId>;
};

/**
 * Deposits ETH to L2 using the OptimismPortal contract
 * @param parameters - {@link WriteDepositETHParameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function writeDepositETH<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    args: { to, gasLimit, data, amount },
    portal,
    ...rest
  }: WriteDepositETHParameters<TChain>,
): Promise<WriteContractReturnType> {
  return writeDepositTransaction(client, {
    args: { to, value: amount, gasLimit: BigInt(gasLimit), data },
    portal: resolveAddress(portal),
    value: amount,
    ...rest,
  } as unknown as WriteDepositTransactionParameters<TChain>);
}
