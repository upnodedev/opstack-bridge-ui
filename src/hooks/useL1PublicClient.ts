import { usePublicClient } from "wagmi";

import { useOPNetwork } from "./useOPNetwork";
import { NetworkType } from "@utils/opType";
import { type UsePublicClientReturnType } from "wagmi";
import { PublicActionsL1, publicActionsL1 } from 'viem/op-stack'
import { Account, Chain } from "viem";

export type UseL1PublicClientArgs = {
  chainId?: number;
  type: NetworkType;
};

export type l1PublicClientType = Exclude<UsePublicClientReturnTypeL1, undefined>

export type UsePublicClientReturnTypeL1 = UsePublicClientReturnType & PublicActionsL1;

export type UseL1PublicClientReturnType = (args: UseL1PublicClientArgs) => {
  l1PublicClient: l1PublicClientType;
};

export const useL1PublicClient: UseL1PublicClientReturnType = ({
  type,
  chainId,
}: UseL1PublicClientArgs) => {
  const { networkPair } = useOPNetwork({ type, chainId });
  const l1PublicClient = usePublicClient({ chainId: networkPair?.l1.id })!.extend(publicActionsL1());


  return { l1PublicClient };
};
