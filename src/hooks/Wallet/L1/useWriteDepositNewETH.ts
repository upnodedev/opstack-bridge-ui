import { optimismPortalABI } from "@abi/constant";
import { useMutation } from "@tanstack/react-query";
import { OpConfig } from "@utils/opType";
import { validateL2Chain, validatePortalContract } from "@utils/validateChains";
import { resolveAddress } from "ethers";
import { Chain } from "viem";
import { simulateContract } from "viem/actions";
import { useConfig } from "wagmi";
import { getPublicClient, getWalletClient } from "wagmi/actions";

export const ABI = optimismPortalABI;
export const FUNCTION = "depositTransaction";

export type useWriteDepositETHNewParameter = {
  config: OpConfig | undefined;
  args?: any;
};

export type WriteDepositETHParameters = {
  l2ChainId: number;
  args: any;
};

export type DepositETHMutationParameters = {
  l1ChainId: number;
  l2ChainId: number;
  l2Chain: Chain;
  args: any;
};

export function useWriteDepositETHNew({
  config,
  args,
}: useWriteDepositETHNewParameter) {
  const configs = useConfig(args);

  const mutation = {
    mutationFn({ l2ChainId, args, ...rest }: WriteDepositETHParameters) {
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
    writeDepositETH: mutate,
    writeDepositETHAsync: mutateAsync,
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
  }: DepositETHMutationParameters,
) {
  const walletClient = await getWalletClient(config, { chainId: l1ChainId });
  const l1PublicClient = await getPublicClient(config, { chainId: l1ChainId })!;
  const l2PublicClient = await getPublicClient(config, { chainId: l2ChainId })!;

  const portal = validatePortalContract(l1ChainId, l2Chain).address;

  const l2GasLimit =
    args.gasLimit ??
    Number(
      await l2PublicClient.estimateGas({
        account: walletClient.account.address,
        to: args.to,
        value: args.amount,
        data: args.data,
      }),
    );

  const payload = {
    to: args.to,
    value: args.amount ? args.amount : 0n,
    gasLimit: BigInt(l2GasLimit),
    data: "0x",
    isCreation: args.isCreation ? args.isCreation : false,
    mint: args.amount ? args.amount : 0n,
  };

  await simulateContract(walletClient, {
    address: resolveAddress(portal),
    abi: ABI,
    functionName: FUNCTION,
    args: [
      payload.to,
      payload.value,
      payload.gasLimit,
      payload.isCreation,
      payload.data,
    ],
    value: payload.mint,
    ...(rest as any),
  });

  return walletClient.writeContract({
    address: resolveAddress(portal),
    abi: ABI,
    functionName: FUNCTION,
    args: [
      payload.to,
      payload.value,
      payload.gasLimit,
      payload.isCreation,
      payload.data,
    ],
    value: payload.mint,
    ...(rest as any),
  });
}
