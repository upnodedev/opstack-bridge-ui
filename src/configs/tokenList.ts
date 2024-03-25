export interface TokenItemType {
  name: string;
  fullName: string;
  address: string;
  decimals: number;
  image: string;
}

export const tokenList: TokenItemType[] = [
  {
    name: "ETH",
    fullName: "Ethereum",
    address: "0xabcdef1234567890abcdef1234567890abcdef12",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  },
  {
    name: "OP",
    fullName: "Optimism",
    address: "0xabcdef1234567890abcdef1234567890abcdef12",
    decimals: 18,
    image:
      "https://assets.coingecko.com/coins/images/25244/standard/Optimism.png?1696524385",
  },
  {
    name: "BTC",
    fullName: "Bitcoin",
    address: "0x1234567890abcdef1234567890abcdef12345678",
    decimals: 8,
    image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
  },
  {
    name: "USDT",
    fullName: "USD Tether",
    address: "0xabcdef1234567890abcdef1234567890abcdef12",
    decimals: 6,
    image:
      "https://assets.coingecko.com/coins/images/325/small/Tether-logo.png",
  },
  {
    name: "USDC",
    fullName: "USD Coin",
    address: "0xabcdef1234567890abcdef1234567890abcdef12",
    decimals: 6,
    image:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
  },
];
