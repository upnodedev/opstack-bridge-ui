import styled from "styled-components";
import { TransactionItemDeposit } from "./TransactionItemDeposit";
import useTransactionDepositETH from "@hooks/Wallet/L1/useTransactionDepositETH";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useOPNetwork } from "@hooks/useOPNetwork";
import { useNetworkConfig } from "@hooks/useNetworkConfig";
import { useUsdtPrice } from "@hooks/useUsdtPrice";
import { formatUnits } from "viem";
import useTransactionWithdrawETH from "@hooks/Wallet/L2/useTransactionWithdrawETH";
import { TransactionItemWithdrawal } from "./TransactionItemWithdrawal";

type Action = "deposit" | "withdrawal";

interface Props extends SimpleComponent {
  action?: Action;
}

const TransactionContainerWrapper = styled.div``;

function TransactionContainer({ action }: Props) {
  const { networkType, chainId } = useNetworkConfig();

  const { networkPair } = useOPNetwork({
    type: networkType,
    chainId: chainId,
  });
  const { l1, l2 } = networkPair;

  const { depositLogs, loading: depositLoading } = useTransactionDepositETH();
  // const { depositLogs, loading: depositLoading } = {
  //   loading: false,
  //   depositLogs: [] as any[]
  // };
  const { withdrawLogs, loading: withdrawLoading } =
    useTransactionWithdrawETH();
  console.log({ withdrawLogs, depositLogs });

  const usdtPriceFetch = useUsdtPrice(l1.nativeCurrency.symbol);

  if (action === "deposit")
    return (
      <TransactionContainerWrapper className="mt-4 px-6 py-2">
        {/* <h2>Activity</h2> */}
        {/* <div className="text-base text-[#4C4E64AD]">{status}</div> */}

        {depositLoading ? (
          <div className="flex justify-center">
            <Icon
              className="mt-2"
              icon="line-md:downloading-loop"
              width="40"
              height="40"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-[0.5px] bg-gray-dark">
            {depositLogs.map((log) => (
              <TransactionItemDeposit
                txId={log.transactionHash}
                data={log}
                key={log.transactionHash}
                price={usdtPriceFetch || 0}
              />
            ))}
          </div>
        )}
      </TransactionContainerWrapper>
    );

  return (
    <TransactionContainerWrapper className="mt-4 px-6 py-2">
      {/* <h2>Activity</h2> */}
      {/* <div className="text-base text-[#4C4E64AD]">{status}</div> */}

      {withdrawLoading ? (
        <div className="flex justify-center">
          <Icon
            className="mt-2"
            icon="line-md:downloading-loop"
            width="40"
            height="40"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-[0.5px] bg-gray-dark">
          {withdrawLogs.map((log) => (
            <TransactionItemWithdrawal
              txId={log.transactionHash}
              data={log}
              key={log.transactionHash}
              price={usdtPriceFetch || 0}
            />
          ))}
        </div>
      )}
    </TransactionContainerWrapper>
  );
}

export default TransactionContainer;
