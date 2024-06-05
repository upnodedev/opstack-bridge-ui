import { StatusChain } from "@components/Chain/StatusChain";
import TokenImg from "@components/TokenImg";
import { useL1PublicClient } from "@hooks/useL1PublicClient";
import { useNetworkConfig } from "@hooks/useNetworkConfig";
import { useOPNetwork } from "@hooks/useOPNetwork";
import { Icon } from "@iconify/react";
import { AddressType, depositEvent } from "@types";
import { addressCut } from "@utils/utils";
import { Flex } from "antd";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { TransactionReceipt, formatUnits } from "viem";
import {
  extractTransactionDepositedLogs,
  getL2TransactionHash,
} from "viem/op-stack";

interface TransactionItemDepositProps {
  data: depositEvent;
  txId: string;
  key: React.Key;
  price: number;
}

export const TransactionItemDeposit = ({
  txId,
  data,
  price,
}: TransactionItemDepositProps) => {
  const { networkType, chainId } = useNetworkConfig();

  const { networkPair } = useOPNetwork({
    type: networkType,
    chainId: chainId,
  });
  const { l1, l2 } = networkPair;

  const L1NetworkExplorerUrl = l1.blockExplorers?.default.url;
  const L2NetworkExplorerUrl = l2.blockExplorers?.default.url;

  const { l1PublicClient } = useL1PublicClient({
    type: networkType,
    chainId: networkPair.l1.id,
  });

  const [receipt, setReceipt] = useState<TransactionReceipt>();
  const [status, setStatus] = useState("pending");
  const [timeLocal, setTimeLocal] = useState("");
  const [amount, setAmount] = useState("0");
  const [l2Tx, setL2Tx] = useState("");

  const getAmount = (value: string) => {
    return formatUnits(BigInt(value), l1.nativeCurrency.decimals);
  };

  const getAmountUsdt = () => (+amount * price).toFixed(2);

  const getReceipt = async () => {
    if (data.transactionHash) {
      const receipt = await l1PublicClient.getTransactionReceipt({
        hash: data.transactionHash as AddressType,
      });

      // get Timestamp
      const block = await l1PublicClient.getBlock({
        blockNumber: BigInt(data.blockNumber),
      });
      // console.log({block})
      const timestamp = block.timestamp * 1000n;

      // get l2 tx
      const [log] = extractTransactionDepositedLogs(receipt);
      const l2Hash = getL2TransactionHash({ log });
      setL2Tx(l2Hash);

      setStatus(!receipt.transactionIndex ? "pending" : receipt.status);
      setTimeLocal(new Date(Number(timestamp)).toLocaleString());
      setAmount(getAmount(data.amount));
      setReceipt(receipt);
    }
  };

  useEffect(() => {
    getReceipt();
  }, []);

  const LinkTxComponent =
    L1NetworkExplorerUrl && L2NetworkExplorerUrl ? (
      <div className="flex gap-2 text-xs text-[#101828] no-underline">
        <div className="flex items-center gap-1">
          <div className="text-base">Deposit</div>
        </div>
        <div className="border-l border-[#D0D5DD]"></div>
        <Link
          to={`${L1NetworkExplorerUrl}/tx/${data.transactionHash}`}
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center gap-1 text-[#101828] no-underline hover:text-primary"
        >
          <div>L1</div>
          <Icon icon="lucide:external-link" />
        </Link>
        <Link
          to={`${L2NetworkExplorerUrl}/tx/${l2Tx}`}
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center gap-1 text-[#101828] no-underline hover:text-primary"
        >
          <div>L2</div>
          <Icon icon="lucide:external-link" />
        </Link>
      </div>
    ) : (
      <div className="flex gap-2 text-xs text-[#101828] no-underline hover:text-primary">
        <div className="flex items-center gap-1">
          <div className="text-base">Deposit</div>
        </div>
        <div className="border-l border-[#D0D5DD]"></div>
        <div className="flex items-center gap-1">
          <div>L1</div>
          <Icon icon="lucide:external-link" />
        </div>
        <div className="flex items-center gap-1">
          <div>L2</div>
          <Icon icon="lucide:external-link" />
        </div>
      </div>
    );

  return (
    <div
      key={`deposit-${txId}`}
      className="grid w-full grid-cols-4 bg-white py-2"
    >
      <div className="col-span-2 gap-4">
        <div className="flex items-start gap-4">
          <img src="/icon/arrow-circle-broken-up.svg" alt="" />
          <div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2"> {LinkTxComponent}</div>
              <StatusChain status={status as any} />
            </div>
            <div className="mt-2 text-xs text-gray-500">{timeLocal}</div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <p className="m-0 text-xs text-gray-medium">Address : </p>
          <b className="m-0 text-xs">{addressCut(data.from)}</b>
        </div>
        <div className="flex items-center gap-2">
          <p className="m-0 text-xs text-gray-medium">Token : </p>
          <TokenImg name={l1.nativeCurrency.symbol} />
          <b className="m-0 text-xs">{amount}</b>
        </div>
        <div className="flex items-center gap-2">
          <p className="m-0 text-xs text-gray-medium">Chain : </p>
          <TokenImg name={data.isEth ? "ETH" : data.localToken} />
          <div className="text-xs">{l1.name}</div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <p className="m-0 text-xs text-gray-medium">Address : </p>
          <b className="m-0 text-xs">{addressCut(data.to)}</b>
        </div>
        <div className="flex items-center gap-2">
          <p className="m-0 text-xs text-gray-medium">Token : </p>
          <TokenImg name={l2.nativeCurrency.symbol} />
          <b className="m-0 text-xs">{amount}</b>
        </div>
        <div className="flex items-center gap-2">
          <p className="m-0 text-xs text-gray-medium">Chain : </p>
          <TokenImg name={data.isEth ? "ETH" : data.localToken} />
          <div className="text-xs">{l2.name}</div>
        </div>
      </div>
    </div>
  );
};
