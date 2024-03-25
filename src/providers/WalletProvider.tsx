import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { WALLETCONNECT_PROJECT_ID, wagmiConfig } from "./config";

const queryClient = new QueryClient();

createWeb3Modal({
  wagmiConfig: wagmiConfig,
  projectId: WALLETCONNECT_PROJECT_ID,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  themeMode: "light",
  themeVariables: {
    // '--w3m-font-family'?: string;
    "--w3m-accent": "#fc841b",
    "--w3m-color-mix": "#FFBE98",
    "--w3m-color-mix-strength": 5,
    // '--w3m-font-size-master'?: string;
    // '--w3m-border-radius-master'?: string;
    "--w3m-z-index": 1005,
  },
});

export default function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
