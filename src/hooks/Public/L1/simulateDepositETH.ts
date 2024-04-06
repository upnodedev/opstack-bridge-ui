import {
  RawOrContractAddress,
  resolveAddress,
} from "@hooks/types/op-viem-type/addresses";
import {
  ABI,
  DepositETHParameters,
  FUNCTION,
} from "@hooks/types/op-viem-type/depositETH";
import type {
  Chain,
  PublicClient,
  SimulateContractParameters,
  SimulateContractReturnType,
  Transport,
} from "viem";
import { simulateContract } from "viem/actions";

export type SimulateDepositETHParameters = {
  args: DepositETHParameters;
  portal: `0x${string}`;
};


/**
 * Simulates a deposit of ETH to L2
 * @param parameters - {@link SimulateDepositETHParameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function simulateDepositETH<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  {
    args: { to, gasLimit, data = "0x", amount },
    portal,
    ...rest
  }: SimulateDepositETHParameters,
) {
  return client.simulateContract({
    address: resolveAddress(portal),
    abi: ABI,
    functionName: FUNCTION,
    args: [to, amount, gasLimit, false, data],
    value: amount,
    ...(rest as any),
  });
}
