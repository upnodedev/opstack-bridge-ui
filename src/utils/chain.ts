import ENV from "@configs/ENV";
import type { Chain } from "viem/chains";
// import { sepolia, optimismSepolia,base } from "viem/chains";

// clone of mainnet and edit the chainId
export const l1ChainConfig: Chain = {
  name: ENV.L1_CHAIN_NAME,
  id: ENV.L1_CHAIN_ID,
  rpcUrls: {
    default: {
      http: [ENV.L1_RPC_QUICKNODE_URL],
    },
  },
  nativeCurrency: {
    decimals: ENV.L1_NATIVE_CURRENCY_DECIMALS,
    name: ENV.L1_NATIVE_CURRENCY_NAME,
    symbol: ENV.L1_NATIVE_CURRENCY_SYMBOL,
  },
  blockExplorers: {
    default: {
      name: ENV.L1_BLOCK_EXPLORER_NAME,
      url: ENV.L1_BLOCK_EXPLORER_URL,
      apiUrl: ENV.L1_BLOCK_EXPLORER_API,
    },
  },
  contracts: {
    multicall3: {
      address: ENV.L1_ENS_REGISTRY_ADDRESS,
      blockCreated: ENV.L1_ENS_UNIVERSAL_RESOLVER_BLOCK_CREATED,
    },
    ensRegistry: { address: ENV.L1_ENS_REGISTRY_ADDRESS },
    ensUniversalResolver: {
      address: ENV.L1_ENS_UNIVERSAL_RESOLVER_ADDRESS,
      blockCreated: ENV.L1_ENS_UNIVERSAL_RESOLVER_BLOCK_CREATED,
    },
  },
};

export const l2ChainConfig: Chain = {
  name: ENV.L2_CHAIN_NAME,
  id: ENV.L2_CHAIN_ID,
  rpcUrls: {
    default: {
      http: [ENV.L2_RPC_QUICKNODE_URL],
    },
  },
  nativeCurrency: {
    decimals: ENV.L2_NATIVE_CURRENCY_DECIMALS,
    name: ENV.L2_NATIVE_CURRENCY_NAME,
    symbol: ENV.L2_NATIVE_CURRENCY_SYMBOL,
  },
  blockExplorers: {
    default: {
      name: ENV.L2_BLOCK_EXPLORER_NAME,
      url: ENV.L2_BLOCK_EXPLORER_URL,
      apiUrl: ENV.L2_BLOCK_EXPLORER_API,
    },
  },
  contracts: {
    multicall3: {
      address: ENV.L2_MULTI_CALL3_ADDRESS,
      blockCreated: ENV.L2_MULTI_CALL3_BLOCK_CREATED,
    },
    disputeGameFactory: {
      [l1ChainConfig.id]: {
        address: ENV.DISPUTE_GAME_FACTORY_PROXY,
      },
    },
    l2OutputOracle: {
      [l1ChainConfig.id]: {
        address: ENV.L2OUTPUT_ORACLE_PROXY_ADDRESS,
      },
    },
    portal: {
      [l1ChainConfig.id]: {
        address: ENV.PORTAL_PROXY_ADDRESS,
      },
    },
    l1StandardBridge: {
      [l1ChainConfig.id]: {
        address: ENV.L1STANDARD_BRIDGE_PROXY_ADDRESS,
      },
    },
  },
  sourceId: l1ChainConfig.id,
};
