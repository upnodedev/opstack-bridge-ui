import {
  type UsePublicClientReturnType as UsePublicClientReturnTypeImport,
  usePublicClient,
} from "wagmi";

import { useOPNetwork } from "./useOPNetwork";
import { NetworkType } from "@utils/opType";
import { publicActionsL2, PublicActionsL2 } from "viem/op-stack";
import { Chain, ChainContract, createPublicClient, http } from "viem";

export type l2PublicClientType = Exclude<
  UsePublicClientReturnTypeL2,
  undefined
>;

export type UsePublicClientReturnType = UsePublicClientReturnTypeImport & {
  chain: {
    contracts: {
      portal: { [x: number]: ChainContract };
      disputeGameFactory: { [x: number]: ChainContract };
      l2OutputOracle: { [x: number]: ChainContract };
    };
  };
};

export type UsePublicClientReturnTypeL2 = UsePublicClientReturnType &
  PublicActionsL2;

export type UseL2PublicClientReturnType = {
  l2PublicClient: l2PublicClientType;
};

export const useL2PublicClient = (): UseL2PublicClientReturnType => {
  const { networkPair } = useOPNetwork();
  // const l2PublicClient = usePublicClient({
  //   chainId: networkPair?.l2.id,
  // })!.extend(publicActionsL2()) as any;
  // return { l2PublicClient };

  const l2PublicClient = createPublicClient({
    chain: networkPair.l2,
    transport: http(),
  }).extend(publicActionsL2()) as any;
  return { l2PublicClient };
};
