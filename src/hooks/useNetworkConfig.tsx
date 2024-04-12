import { NETWORKCONFIG } from "@providers/config";
import { NetworkType } from "@utils/networkPairs";
import { useCallback, useState } from "react";
import { useConfig } from "wagmi";

export const useNetworkConfig = () => {
  const [networkType, setNetworkType] = useState<NetworkType>(NETWORKCONFIG);

  const config = useConfig();
  const [chainId, setChainId] = useState<number | undefined>();

  const onNetworkTypeChange = useCallback(
    (type: NetworkType) => {
      setNetworkType(type);
      localStorage.clear();
    },
    [setNetworkType],
  );

  const onChangeNetwork = useCallback(
    (networkType: NetworkType) => {
      setChainId(undefined);
      onNetworkTypeChange(networkType);
    },
    [setChainId, onNetworkTypeChange],
  );


  
  return {
    networkType,
    chainId : chainId ?? config.chains[0].id,
    onChangeNetwork,
  };
};
