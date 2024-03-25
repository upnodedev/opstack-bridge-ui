export interface CryptoChain {
  name: string;
  symbol: string;
  iconUrl: string;
}

export const CRYPTO_CHAINS = {
  ETH: {
    name: "Ethereum",
    symbol: "ETH",
    iconUrl: "/img/ETH.png",
  },
  OP: {
    name: "Optimism",
    symbol: "OP",
    iconUrl: "/img/op.png",
  },
} as const;

export type ChainKey = keyof typeof CRYPTO_CHAINS;
