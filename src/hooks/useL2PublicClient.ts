import { UsePublicClientReturnType, usePublicClient } from "wagmi";

import { useOPNetwork } from "./useOPNetwork";
import { NetworkType } from "@utils/opType";

export type UseL2PublicClientArgs = {
  chainId?: number;
  type: NetworkType;
};

export type UseL2PublicClientReturnType = (args: UseL2PublicClientArgs) => {
  l2PublicClient: UsePublicClientReturnType;
};

export const useL2PublicClient: UseL2PublicClientReturnType = ({
  chainId,
  type,
}: UseL2PublicClientArgs) => {
  const { networkPair } = useOPNetwork({ type, chainId });
  const l2PublicClient = usePublicClient({ chainId: networkPair?.l2.id });
  return { l2PublicClient };
};
