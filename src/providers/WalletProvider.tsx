import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { WALLETCONNECT_PROJECT_ID, config } from './config';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

createWeb3Modal({
  wagmiConfig: config,
  projectId: WALLETCONNECT_PROJECT_ID,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  themeMode: 'light',
  themeVariables: {
    // '--w3m-font-family'?: string;
    '--w3m-accent': '#1c2250ff',
    '--w3m-color-mix': '#ffffff',
    '--w3m-color-mix-strength': 5,
    // '--w3m-font-size-master'?: string;
    // '--w3m-border-radius-master'?: string;
    '--w3m-z-index': 1005,
  },
});

export default function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
