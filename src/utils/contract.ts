import { L2ReverseRegistrar } from '@abi/L2ReverseRegistrar';
import { MerkleForest } from '@abi/MerkleForest';
import { ModularENSRegistry } from '@abi/ModularENSRegistry';
import { OpDomains } from '@abi/OpDomains';
import { UniversalResolver } from '@abi/UniversalResolver';
import { AddressType } from '@types';

export const CONTRACTS = {
  MerkleForest: {
    address: '0xD26845b03E151F08E10d3c37429c19a1572A9B39' as AddressType,
    abi: MerkleForest,
  },
  ModularENSRegistry: {
    address: '0xC5B3862e5C63b50a511256dDd0151D2473302CEd' as AddressType,
    abi: ModularENSRegistry,
  },
  OpDomains: {
    address: '0x37de11Ad312b1Abd9761032a12bC4c494772D3c5' as AddressType,
    abi: OpDomains,
  },
  L2ReverseRegistrar: {
    address: '0x6eE51AB6f1dA30D8B833aD234E406Fffc49D6813' as AddressType,
    abi: L2ReverseRegistrar,
  },
  UniversalResolver: {
    address: '0x300B7B7aeb46DA9F3009f4AC6d9CAED713035c6d' as AddressType,
    abi: UniversalResolver,
  },
};
