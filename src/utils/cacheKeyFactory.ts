import { useChainId } from '@hooks/useChainId';
import { useAccount } from 'wagmi';

export const useQueryKeys = () => {
  const { address } = useAccount();
  const chainId = useChainId();

  const globalKeys = [chainId, address];

  return {
    validate: (input: string) => [...globalKeys, input, 'validate'],
    basicName: (normalisedName: string, skipGraph: boolean) => [
      ...globalKeys,
      'batch',
      'getOwner',
      'getExpiry',
      normalisedName,
      skipGraph,
      'basicName',
    ],
  };
};
