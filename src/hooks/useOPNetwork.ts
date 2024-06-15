import { l1ChainConfig, l2ChainConfig } from "@utils/chain";

export const useOPNetwork = () => {
  const networkPair = { l1: l1ChainConfig, l2: l2ChainConfig };

  return { networkPair };
};
