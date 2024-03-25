import { ChainChip } from "@components/Chain/ChainChip";
import { StatusChain } from "@components/Chain/StatusChain";
import { Icon } from "@iconify/react";
import { CRYPTO_CHAINS } from "@types";

interface TransactionItemProps {}
export const TransactionItem = (props: TransactionItemProps) => {
  const chain = CRYPTO_CHAINS["ETH"]; // Access the specific chain's data
  return (
    <div className="flex items-start gap-3">
      <img src="/icon/arrow-circle-broken-up.svg" alt="" />
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full justify-between gap-3">
          <div>Withdraw</div>
          <div className="flex items-center gap-2">
            <h2 className="m-0">11.21</h2>
            <img src={chain.iconUrl} alt="" className="h-6 w-6" />
          </div>
        </div>
        <div className="flex w-full justify-between gap-3">
          <div className="flex gap-2">
            <ChainChip chainKey="ETH" />
            <Icon icon="lucide:chevron-right" />
            <ChainChip chainKey="OP" />
          </div>
          <div className="text-xs text-[#4C4E64AD]">$28.71</div>
        </div>
        <div className="flex w-full items-center justify-between gap-3">
          <StatusChain status="finalize" />
          <div className="flex gap-2 text-xs text-[#101828]">
            <div className="flex items-center gap-1">
              <div>Deposit</div>
              <Icon icon="lucide:external-link" />
            </div>
            <div className="border-l border-[#D0D5DD]"></div>
            <div className="flex items-center gap-1">
              <div>L2</div>
              <Icon icon="lucide:external-link" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
