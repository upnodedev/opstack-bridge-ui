import { CRYPTO_CHAINS, ChainKey } from "@types";

interface ChainChipProps {
  chainKey: ChainKey;
}

export const ChainChip = ({ chainKey }: ChainChipProps) => {
  const chain = CRYPTO_CHAINS[chainKey]; // Access the specific chain's data
  return (
    <div className="flex items-center gap-2">
      <img src={chain.iconUrl} alt="" className="h-4 w-4" />
      <div className="text-xs">{chain.name}</div>
    </div>
  );
};
