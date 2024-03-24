export interface TokenItemType {
  name: string;
  address: string;
  decimals: number;
  image: string;
}

export const tokenList: TokenItemType[] = [
  {
    name: "ETH",
    address: "0xabcdef1234567890abcdef1234567890abcdef12",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  },
  {
    name: "BTC",
    address: "0x1234567890abcdef1234567890abcdef12345678",
    decimals: 8,
    image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
  },
  {
    name: "USDT",
    address: "0xabcdef1234567890abcdef1234567890abcdef12",
    decimals: 6,
    image:
      "https://assets.coingecko.com/coins/images/325/small/Tether-logo.png",
  },
  {
    name: "USDC",
    address: "0xabcdef1234567890abcdef1234567890abcdef12",
    decimals: 6,
    image:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
  },
];
