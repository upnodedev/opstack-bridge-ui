export const UniversalResolver = [
  {
    type: 'constructor',
    inputs: [
      { name: '_registry', type: 'address', internalType: 'address' },
      { name: '_urls', type: 'string[]', internalType: 'string[]' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: '_resolveSingle',
    inputs: [
      { name: 'name', type: 'bytes', internalType: 'bytes' },
      { name: 'data', type: 'bytes', internalType: 'bytes' },
      { name: 'gateways', type: 'string[]', internalType: 'string[]' },
      {
        name: 'callbackFunction',
        type: 'bytes4',
        internalType: 'bytes4',
      },
      { name: 'metaData', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [
      { name: '', type: 'bytes', internalType: 'bytes' },
      { name: '', type: 'address', internalType: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'batchGatewayURLs',
    inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'findResolver',
    inputs: [{ name: 'name', type: 'bytes', internalType: 'bytes' }],
    outputs: [
      { name: '', type: 'address', internalType: 'contract Resolver' },
      { name: '', type: 'bytes32', internalType: 'bytes32' },
      { name: '', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'registry',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract ENSReadOnly',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'resolve',
    inputs: [
      { name: 'name', type: 'bytes', internalType: 'bytes' },
      { name: 'data', type: 'bytes', internalType: 'bytes' },
      { name: 'gateways', type: 'string[]', internalType: 'string[]' },
    ],
    outputs: [
      { name: '', type: 'bytes', internalType: 'bytes' },
      { name: '', type: 'address', internalType: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'resolve',
    inputs: [
      { name: 'name', type: 'bytes', internalType: 'bytes' },
      { name: 'data', type: 'bytes[]', internalType: 'bytes[]' },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple[]',
        internalType: 'struct Result[]',
        components: [
          { name: 'success', type: 'bool', internalType: 'bool' },
          { name: 'returnData', type: 'bytes', internalType: 'bytes' },
        ],
      },
      { name: '', type: 'address', internalType: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'resolve',
    inputs: [
      { name: 'name', type: 'bytes', internalType: 'bytes' },
      { name: 'data', type: 'bytes[]', internalType: 'bytes[]' },
      { name: 'gateways', type: 'string[]', internalType: 'string[]' },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple[]',
        internalType: 'struct Result[]',
        components: [
          { name: 'success', type: 'bool', internalType: 'bool' },
          { name: 'returnData', type: 'bytes', internalType: 'bytes' },
        ],
      },
      { name: '', type: 'address', internalType: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'resolve',
    inputs: [
      { name: 'name', type: 'bytes', internalType: 'bytes' },
      { name: 'data', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [
      { name: '', type: 'bytes', internalType: 'bytes' },
      { name: '', type: 'address', internalType: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'resolveCallback',
    inputs: [
      { name: 'response', type: 'bytes', internalType: 'bytes' },
      { name: 'extraData', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple[]',
        internalType: 'struct Result[]',
        components: [
          { name: 'success', type: 'bool', internalType: 'bool' },
          { name: 'returnData', type: 'bytes', internalType: 'bytes' },
        ],
      },
      { name: '', type: 'address', internalType: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'resolveSingleCallback',
    inputs: [
      { name: 'response', type: 'bytes', internalType: 'bytes' },
      { name: 'extraData', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [
      { name: '', type: 'bytes', internalType: 'bytes' },
      { name: '', type: 'address', internalType: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'reverse',
    inputs: [
      { name: 'reverseName', type: 'bytes', internalType: 'bytes' },
      { name: 'gateways', type: 'string[]', internalType: 'string[]' },
    ],
    outputs: [
      { name: '', type: 'string', internalType: 'string' },
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'address', internalType: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'reverse',
    inputs: [{ name: 'reverseName', type: 'bytes', internalType: 'bytes' }],
    outputs: [
      { name: '', type: 'string', internalType: 'string' },
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'address', internalType: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'reverseCallback',
    inputs: [
      { name: 'response', type: 'bytes', internalType: 'bytes' },
      { name: 'extraData', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [
      { name: '', type: 'string', internalType: 'string' },
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'address', internalType: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'setGatewayURLs',
    inputs: [{ name: '_urls', type: 'string[]', internalType: 'string[]' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'supportsInterface',
    inputs: [{ name: 'interfaceId', type: 'bytes4', internalType: 'bytes4' }],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [{ name: 'newOwner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'previousOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'OffchainLookup',
    inputs: [
      { name: 'sender', type: 'address', internalType: 'address' },
      { name: 'urls', type: 'string[]', internalType: 'string[]' },
      { name: 'callData', type: 'bytes', internalType: 'bytes' },
      {
        name: 'callbackFunction',
        type: 'bytes4',
        internalType: 'bytes4',
      },
      { name: 'extraData', type: 'bytes', internalType: 'bytes' },
    ],
  },
  {
    type: 'error',
    name: 'ResolverError',
    inputs: [{ name: 'returnData', type: 'bytes', internalType: 'bytes' }],
  },
  { type: 'error', name: 'ResolverNotContract', inputs: [] },
  { type: 'error', name: 'ResolverNotFound', inputs: [] },
  { type: 'error', name: 'ResolverWildcardNotSupported', inputs: [] },
] as const;
