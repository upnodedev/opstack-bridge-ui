import styled from "styled-components";
import { TransactionItemDeposit } from "./TransactionItemDeposit";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useOPNetwork } from "@hooks/useOPNetwork";
import { useUsdtPrice } from "@hooks/useUsdtPrice";
import { TransactionItemWithdrawal } from "./TransactionItemWithdrawal";
import { useAccount, useChainId } from "wagmi";
import { axiosInstance } from "@utils/api";
import { useEffect, useState } from "react";
import { depositEvent, withdrawalEvent } from "@types";

type Action = "deposit" | "withdrawal" | "all";

interface Props extends SimpleComponent {
  action?: Action;
}

const TransactionContainerWrapper = styled.div``;

function TransactionContainer({ action }: Props) {
  const { address } = useAccount();

  const { networkPair } = useOPNetwork();
  const { l1, l2 } = networkPair;

  const [withdrawLogs, setWithdrawLogs] = useState<withdrawalEvent[]>([]);
  const [withdrawLoading, setWithdrawLoading] = useState(true);

  const [depositLogs, setDepositLogs] = useState<depositEvent[]>([]);
  const [depositLoading, setDepositLoading] = useState(true);

  const usdtPriceFetch = useUsdtPrice(l1.nativeCurrency.symbol);

  const fetchDepositLogs = async () => {
    setDepositLoading(true);
    const result = await axiosInstance.get("/deposit", {
      params: {
        from: address,
        // to: address,
        limit: 100,
      },
    });
    setDepositLogs(result.data);
    setDepositLoading(false);
  };

  const fetchWithdrawalLogs = async () => {
    setWithdrawLoading(true);
    const result = await axiosInstance.get("/withdrawal", {
      params: {
        from: address,
        to: address,
        limit: 100,
      },
    });
    setWithdrawLogs(result.data);
    setWithdrawLoading(false);
  };

  useEffect(() => {
    fetchDepositLogs();
    fetchWithdrawalLogs();
  }, []);

  if (action === "deposit")
    return (
      <TransactionContainerWrapper>
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
    <TransactionContainerWrapper>
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
