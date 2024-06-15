import { QueryClient } from "@tanstack/react-query";
import { l1ChainConfig, l2ChainConfig } from "@utils/chain";
import { configureOpChains } from "@utils/configureOpChains";
import { Transport } from "viem";
import { createConfig, http } from "wagmi";
import { injected, walletConnect } from "wagmi/connectors";

export const WALLETCONNECT_PROJECT_ID = "dd2a5d8744a5d72247899ef644bf8e1e";
// export const NETWORKCONFIG = "main";
// const opChains = configureOpChains({ type: NETWORKCONFIG });

export const metadata = {
  name: "Opti.domains",
  description: "Opti.domains",
  url: "https://opti.domains", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const wagmiConfig = createConfig({
  chains: [l1ChainConfig, l2ChainConfig],
  transports: {
    [l1ChainConfig.id]: http(),
    [l2ChainConfig.id]: http(),
  },
  connectors: [
    injected(),
    walletConnect({
      projectId: WALLETCONNECT_PROJECT_ID,
      metadata,
      showQrModal: false,
    }),
  ],
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
