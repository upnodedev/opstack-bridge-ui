import { optimismPortalABI } from "@abi/constant";
import {
  RawOrContractAddress,
  resolveAddress,
} from "@hooks/types/op-viem-type/addresses";
import type {
  Account,
  Address,
  Chain,
  Hash,
  Hex,
  PublicClient,
  Transport,
  WalletClient,
} from "viem";
import {
  getConnectorClient,
  sendTransaction,
  simulateContract,
  writeContract,
} from "wagmi/actions";
export const ABI = optimismPortalABI;
export const FUNCTION = "depositTransaction";

export type DepositTransactionParameters = {
  to: Address;
  gasLimit: bigint;
  value?: bigint;
  isCreation?: boolean;
  data?: Hex;
  mint?: bigint;
};

export type WriteDepositTransactionParameters<
  TChain extends Chain | undefined = Chain,
  _chainId = TChain extends Chain ? TChain["id"] : number,
> = {
  args: DepositTransactionParameters;
  portal: RawOrContractAddress<_chainId>;
};

/**
 * Calls depositTransaction on the OptimismPortal contract.
 *
 * Unlike writeSendMessage, does not offer replayability on L2 incase the L2 tx fails.
 * But has the advantage that, if the caller is an EOA, msg.sender of the L2 tx
 * will be the caller address. Allowing users to fully tranasact on L2 from L1, which
 * is a critical security property.
 *
 * If the caller is not an EOA, e.g. if the caller is a smart contract wallet,
 * msg.sender on L2 will be alias of the caller address
 * https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol#L407
 *
 * @param parameters - {@link WriteDepositTransactionParameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function writeDepositTransaction<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    args: {
      to,
      value = 0n,
      gasLimit,
      isCreation = false,
      data = "0x",
      mint = 0n,
    },
    portal,
    ...rest
  }: WriteDepositTransactionParameters,
): Promise<Hash> {
  return client.writeContract({
    address: resolveAddress(portal),
    abi: ABI,
    functionName: FUNCTION,
    args: [to, value, gasLimit, isCreation, data],
    value: mint,
    ...(rest as any),
  });
}
