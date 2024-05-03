import { l2StandardBridgeABI, optimismPortalABI } from "@abi/constant";
import { useMutation } from "@tanstack/react-query";
import { OpConfig } from "@utils/opType";
import {
  validateL2Chain,
  validateL2StandardBridgeContract,
  validatePortalContract,
} from "@utils/validateChains";
import { resolveAddress } from "ethers";
import { Chain } from "viem";
import { simulateContract } from "viem/actions";
import { useConfig } from "wagmi";
import { getWalletClient } from "wagmi/actions";

export type useWriteWithdrawtETHNewParameter = {
  config: OpConfig | undefined;
  args?: any;
};

export type WriteWithdrawETHParameters = {
  l2ChainId: number;
  args: any;
};

export type WithdrawETHMutationParameters = {
  l1ChainId: number;
  l2ChainId: number;
  l2Chain: Chain;
  args: any;
};

export const ABI = l2StandardBridgeABI;
export const FUNCTION = "withdrawTo";
export const OVM_ETH = "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000";

export function useWriteWithdrawETH({
  config,
  args,
}: useWriteWithdrawtETHNewParameter) {
  const configs = useConfig(args);

  const mutation = {
    mutationFn({ l2ChainId, args, ...rest }: WriteWithdrawETHParameters) {
      const { l2Chain, l1ChainId } = validateL2Chain(configs, l2ChainId);

      return writeMutation(config!, {
        args,
        l1ChainId,
        l2ChainId: l2ChainId,
        l2Chain,
        ...rest,
      });
    },
    mutationKey: ["writeContract"],
  };

  const { mutate, mutateAsync, ...result } = useMutation(mutation);

  return {
    ...result,
    writeWithdrawETH: mutate,
    writeWithdrawETHAsync: mutateAsync,
  };
}

export async function writeMutation(
  config: OpConfig,
  {
    l1ChainId,
    l2ChainId,
    l2Chain,
    args,
    ...rest
  }: WithdrawETHMutationParameters,
) {
  const walletClient = await getWalletClient(config, { chainId: l2ChainId });
  // const l2PublicClient = await getPublicClient(config, { chainId: l2ChainId })!;

  const L2StandardBridge = validateL2StandardBridgeContract(l2Chain).address;

  // const payload = {
  //   chainId: l1ChainId,
  //   address: L2StandardBridge,
  //   abi: ABI,
  //   functionName: FUNCTION,
  //   args: [
  //     OVM_ETH,
  //     args.to,
  //     args.amount,
  //     args.minGasLimit ?? 0,
  //     args.extraData ?? "0x",
  //   ],
  //   value: args.amount,
  //   account: walletClient.account.address,
  //   ...rest,
  // };

  await simulateContract(walletClient, {
    address: resolveAddress(L2StandardBridge),
    abi: ABI,
    functionName: FUNCTION,
    args: [
      OVM_ETH,
      args.to,
      args.amount,
      args.minGasLimit ?? 0,
      args.extraData ?? "0x",
    ],
    value: args.amount,
    account: walletClient.account.address,
    ...(rest as any),
  });

  return walletClient.writeContract({
    address: resolveAddress(L2StandardBridge),
    abi: ABI,
    functionName: FUNCTION,
    args: [
      OVM_ETH,
      args.to,
      args.amount,
      args.minGasLimit ?? 0,
      args.extraData ?? "0x",
    ],
    value: args.amount,
    account: walletClient.account.address,
    ...(rest as any),
  });
}
