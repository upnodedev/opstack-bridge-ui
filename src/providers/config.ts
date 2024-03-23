import { createPublicClient } from 'viem';
import { mainnet, optimismSepolia, sepolia } from 'viem/chains';
import { createConfig, http } from 'wagmi';
import {
  coinbaseWallet,
  injected,
  metaMask,
  walletConnect,
} from 'wagmi/connectors';

export const WALLETCONNECT_PROJECT_ID = 'dd2a5d8744a5d72247899ef644bf8e1e';

// 2. Create wagmiConfig
export const metadata = {
  name: 'Opti.domains',
  description: 'Opti.domains',
  url: 'https://opti.domains', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

export const config = createConfig({
  chains: [optimismSepolia],
  transports: {
    [optimismSepolia.id]: http(),
  },
  connectors: [
    injected(),
    walletConnect({
      projectId: WALLETCONNECT_PROJECT_ID,
      metadata,
      showQrModal: false,
    }),
    // metaMask(),
    coinbaseWallet({ appName: 'Opti.domains' }),
  ],
});

export const publicClient = createConfig({
  chains: [optimismSepolia],
  transports: {
    [optimismSepolia.id]: http(),
  },
});
