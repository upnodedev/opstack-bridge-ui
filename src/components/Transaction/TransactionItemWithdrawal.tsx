import { StatusChain } from "@components/Chain/StatusChain";
import TokenImg from "@components/TokenImg";
import { TransactionWithdrawalType } from "@hooks/Wallet/L2/useTransactionWithdrawETH";
import { useNetworkConfig } from "@hooks/useNetworkConfig";
import { useOPNetwork } from "@hooks/useOPNetwork";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { formatUnits } from "viem";

interface TransactionItemWithdrawalProps {
  data: TransactionWithdrawalType;
  txId: string;
  key: React.Key;
  price: number;
}

export const TransactionItemWithdrawal = ({
  txId,
  data,
  price,
}: TransactionItemWithdrawalProps) => {
  const { networkType, chainId } = useNetworkConfig();

  const { networkPair } = useOPNetwork({
    type: networkType,
    chainId: chainId,
  });
  const { l1, l2 } = networkPair;

  const L2NetworkExplorerUrl = l2.blockExplorers?.default.url;

  console.log({ data });

  const getAmount = () => {
    const amount = data.value;

    if (!amount) return "0";

    const parsedAmount = formatUnits(amount, l1.nativeCurrency.decimals);
    return parsedAmount;
  };

  const getAmountUsdt = () => (+getAmount() * price).toFixed(2);

  const getTimeString = () => {
    return data.time.toLocaleString();
  };

  const LinkTxComponent = L2NetworkExplorerUrl ? (
    <Link
      to={`${L2NetworkExplorerUrl}/tx/${txId}`}
      target="_blank"
      rel="noreferrer noopener"
      className="flex gap-2 text-xs text-[#101828] no-underline hover:text-primary"
    >
      <div className="flex items-center gap-1">
        <div>Withdrawal</div>
      </div>
      <div className="border-l border-[#D0D5DD]"></div>
      <div className="flex items-center gap-1">
        <div>L2</div>
        <Icon icon="lucide:external-link" />
      </div>
    </Link>
  ) : (
    <div className="flex gap-2 text-xs text-[#101828] no-underline hover:text-primary">
      <div className="flex items-center gap-1">
        <div>Withdrawal</div>
      </div>
      <div className="border-l border-[#D0D5DD]"></div>
      <div className="flex items-center gap-1">
        <div>L1</div>
        <Icon icon="lucide:external-link" />
      </div>
    </div>
  );

  return (
    <div
      key={`Withdrawal-${txId}`}
      className="flex items-start gap-3 bg-white py-2"
    >
      <img src="/icon/arrow-circle-broken-up.svg" alt="" />
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full justify-between gap-3">
          <div>
            Withdrawal{" "}
            <span className="text-xs text-gray-500">{getTimeString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <h2 className="m-0">{getAmount()}</h2>
            <TokenImg name={l1.nativeCurrency.symbol} />
          </div>
        </div>
        <div className="flex w-full justify-between gap-3">
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <TokenImg name={l2.nativeCurrency.symbol} />

              <div className="text-xs">{l2.name}</div>
            </div>
            <Icon icon="lucide:chevron-right" />
            <div className="flex items-center gap-2">
              <TokenImg name={l1.nativeCurrency.symbol} />

              <div className="text-xs">{l1.name}</div>
            </div>
          </div>
          <div className="text-xs text-[#4C4E64AD]">${getAmountUsdt()}</div>
        </div>
        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex gap-2">
            <StatusChain status={data.status} />
            <StatusChain status={data.withdrawStatus} />
          </div>
          {LinkTxComponent}
        </div>
      </div>
    </div>
  );
};
