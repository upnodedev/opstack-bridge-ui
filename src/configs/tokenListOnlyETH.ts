import { Token } from "@utils/opType";
import ENV from "./ENV";

export const tokenListOnlyETH: Token[] = [
  {
    chainId: ENV.L1_CHAIN_ID,
    address: "0x0000000000000000000000000000000000000000",
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
    logoURI: "https://ethereum-optimism.github.io/data/ETH/logo.svg",
    extensions: {
      optimismBridgeAddress: ENV.L1STANDARD_BRIDGE_PROXY_ADDRESS,
      opListId: "default",
      opTokenId: "ETH",
    },
  },
  {
    chainId: ENV.L2_CHAIN_ID,
    address: "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000",
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
    logoURI: "https://ethereum-optimism.github.io/data/ETH/logo.svg",
    extensions: {
      optimismBridgeAddress: ENV.L1STANDARD_BRIDGE_PROXY_ADDRESS,
      opListId: "default",
      opTokenId: "ETH",
    },
  },
];
