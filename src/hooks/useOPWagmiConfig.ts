import { useMemo } from "react";
import { useConfig } from "wagmi";

// import { deploymentAddresses } from "../configs/deploymentAddresses";
import { useOPNetwork } from "./useOPNetwork";
import { NetworkType, OpConfig } from "@utils/opType";
// import { predeploys } from "@abi/constant";
import ENV from "@configs/ENV";

export type UseOPWagmiConfigArgs = {
  type: NetworkType;
  chainId?: number;
};

export const useOPWagmiConfig = ({ type, chainId }: UseOPWagmiConfigArgs) => {
  const config = useConfig();
  const { networkPair } = useOPNetwork({ type, chainId });

  const opConfig = useMemo<OpConfig | undefined>(() => {
    if (!networkPair) {
      return;
    }

    const { l1, l2 } = networkPair;
    // const deploymentAddress = deploymentAddresses[l2.id];

    return {
      ...config,
      l2chains: {
        [l2.id]: {
          chainId: l2.id,
          l1ChainId: l1.id,
          l1Addresses: {
            portal: {
              address: ENV.PORTAL_PROXY_ADDRESS,
              chainId: l1.id,
            },
            l2OutputOracle: {
              address: ENV.L2OUTPUT_ORACLE_PROXY_ADDRESS,
              chainId: l1.id,
            },
            l1StandardBridge: {
              address: ENV.L1STANDARD_BRIDGE_PROXY_ADDRESS,
              chainId: l1.id,
            },
            l1CrossDomainMessenger: {
              address: ENV.L1CROSS_DOMAIN_MESSENGER,
              chainId: l1.id,
            },
            l1Erc721Bridge: {
              address: ENV.L1ERC721_BRIDGE_ADDRESS,
              chainId: l1.id,
            },
            disputeGameFactory: {
              address: ENV.DISPUTE_GAME_FACTORY_PROXY,
              chainId: l1.id,
            },
          },
          l2Addresses: {
            l2L1MessagePasserAddress: {
              address: ENV.L2L1_MESSAGE_PASSER_ADDRESS,
              chainId: l2.id,
            },
            l2StandardBridge: {
              address: ENV.L2STANDARD_BRIDGE_PROXY_ADDRESS,
              chainId: l2.id,
            },
          },
        },
      },
    } as OpConfig;
  }, [config, networkPair]);

  return { opConfig };
};

export type UseOPWagmiConfigReturnType = ReturnType<typeof useOPWagmiConfig>;
