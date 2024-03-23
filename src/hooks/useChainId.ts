import { useAccount } from 'wagmi';

export const useChainId = (): number => {
  const { chain } = useAccount();
  if (chain) {
    return chain.id ?? null;
  }
  return 1;
};
