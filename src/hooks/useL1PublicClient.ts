import { usePublicClient } from "wagmi";

import { useOPNetwork } from "./useOPNetwork";
import { NetworkType } from "@utils/opType";
import { type UsePublicClientReturnType } from "wagmi";

export type UseL1PublicClientArgs = {
  chainId?: number;
  type: NetworkType;
};

export type UseL1PublicClientReturnType = (args: UseL1PublicClientArgs) => {
  l1PublicClient: Exclude<UsePublicClientReturnType, undefined>;
};

export const useL1PublicClient: UseL1PublicClientReturnType = ({
  type,
  chainId,
}: UseL1PublicClientArgs) => {
  const { networkPair } = useOPNetwork({ type, chainId });
  const l1PublicClient = usePublicClient({ chainId: networkPair?.l1.id })!;
  return { l1PublicClient };
};
