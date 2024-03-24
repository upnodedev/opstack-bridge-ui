// DO NOT MODIFY THIS FILE IS AUTOGENERATED
import { defineChain } from 'viem'
import { chainConfig } from 'viem/op-stack'
import type { Chain } from 'viem/chains'
import {
  sepolia,optimismSepolia
} from 'viem/chains'

export const orderlyNetwork = defineChain({
  ...chainConfig,
  id: 291,
  name: 'Orderly Network',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.orderly.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://explorer.orderly.network',
    },
  },
  sourceId: 1,
})

export const lyra = defineChain({
  ...chainConfig,
  id: 957,
  name: 'Lyra',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.lyra.finance'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://explorer.lyra.finance',
    },
  },
  sourceId: 1,
})

export const mode = defineChain({
  ...chainConfig,
  id: 34443,
  name: 'Mode',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.mode.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://explorer.mode.network',
    },
  },
  sourceId: 1,
})


// clone of mainnet and edit the chainId
export const quicknodeETHSepolia: Chain = {
  ...sepolia,
  name: 'quicknodeETHSepolia',
  rpcUrls: {
    default: {
      http: [
        'https://omniscient-sparkling-model.ethereum-sepolia.quiknode.pro/0650b5f675a2d17b00c8aa2a29dadc3e46f7fdbb/',
      ],
    },
  },
}
export const quicknodeoptimismSepolia: Chain = {
  ...optimismSepolia,
  name: 'quicknodeoptimismSepolia',
  rpcUrls: {
    default: {
      http: [
        'https://dimensional-purple-mountain.optimism-sepolia.quiknode.pro/44f0d61844a6b6e40d2c2408aef2a4dd4df22f83/',
      ],
    },
  },
}