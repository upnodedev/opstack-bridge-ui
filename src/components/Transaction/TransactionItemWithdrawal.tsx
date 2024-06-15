import { portal2Abi } from "@abi/constant";
import ButtonStyled from "@components/ButtonStyled";
import { StatusChain } from "@components/Chain/StatusChain";
import TokenImg from "@components/TokenImg";
import {
  TransactionWithdrawalType,
  getStatus,
} from "@hooks/Wallet/L2/useTransactionWithdrawETH";
import { useL1PublicClient } from "@hooks/useL1PublicClient";
import { useL2PublicClient } from "@hooks/useL2PublicClient";
import { useOPNetwork } from "@hooks/useOPNetwork";
import { useOPWagmiConfig } from "@hooks/useOPWagmiConfig";
import { Icon } from "@iconify/react";
import { AddressType, withdrawalEvent } from "@types";
import { l2ChainConfig } from "@utils/chain";
import { addressCut } from "@utils/utils";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ContractFunctionRevertedError,
  TransactionReceipt,
  formatUnits,
} from "viem";
import {
  GetGameErrorType,
  getWithdrawals,
  walletActionsL1,
} from "viem/op-stack";
import { useAccount, useChainId } from "wagmi";
import { ReadContractErrorType, getWalletClient } from "wagmi/actions";
import { TransactionWithdrawModal } from "./TransactionWithdrawModal";
import { useAppDispatch } from "@states/hooks";
import { ModalSlide } from "@states/modal/reducer";

interface TransactionItemWithdrawalProps {
  data: withdrawalEvent;
  txId: string;
  key: React.Key;
  price: number;
}

export const TransactionItemWithdrawal = ({
  txId,
  data,
  price,
}: TransactionItemWithdrawalProps) => {
  const dispatch = useAppDispatch();
  const { networkPair } = useOPNetwork();
  const { l1, l2 } = networkPair;

  const L1NetworkExplorerUrl = l1.blockExplorers?.default.url;
  const L2NetworkExplorerUrl = l2.blockExplorers?.default.url;

  const { l2PublicClient } = useL2PublicClient();
  const { l1PublicClient } = useL1PublicClient();

  const [receipt, setReceipt] = useState<TransactionReceipt>();
  const [status, setStatus] = useState("pending");
  const [timeLocal, setTimeLocal] = useState("");
  const [amount, setAmount] = useState("0");

  const getAmount = (value: string) => {
    return formatUnits(BigInt(value), l2.nativeCurrency.decimals);
  };

  const getAmountUsdt = () => (+amount * price).toFixed(2);

  const getReceipt = async () => {
    if (!data.transactionHash) return;
    setAmount(getAmount(data.amount));
    const receipt = await l2PublicClient
      .getTransactionReceipt({
        hash: data.transactionHash as AddressType,
      })
      .catch((error) => {
        setStatus("reverted");
      });
    if (receipt) {
      // get Timestamp
      const block = await l2PublicClient.getBlock({
        blockNumber: BigInt(data.blockNumber),
      });
      // console.log({block})
      const timestamp = block.timestamp * 1000n;

      try {
        const withdrawalStatus = await l1PublicClient.getWithdrawalStatus({
          receipt,
          targetChain: l2PublicClient.chain,
          chain: l1PublicClient.chain,
        });
        setStatus(!receipt.transactionIndex ? "reverted" : withdrawalStatus);
      } catch (error) {
        setStatus("reverted");
      }

      setTimeLocal(new Date(Number(timestamp)).toLocaleString());

      setReceipt(receipt);
    }
  };

  useEffect(() => {
    getReceipt();
  }, []);

  const openAction = () => {
    dispatch(
      ModalSlide.actions.openModal({
        component: (
          <TransactionWithdrawModal data={data} txId={txId} price={price} />
        ),
      }),
    );
  };

  const LinkTxComponent =
    L1NetworkExplorerUrl && L2NetworkExplorerUrl ? (
      <div className="flex gap-2 text-xs text-[#101828] no-underline">
        <div className="flex items-center gap-1">
          <div className="text-base">Withdrawal</div>
        </div>
        <div className="border-l border-[#D0D5DD]"></div>
        <Link
          to={`${L2NetworkExplorerUrl}/tx/${data.transactionHash}`}
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
          <div className="text-base">Withdrawal</div>
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
      onClick={openAction}
      key={`deposit-${txId}`}
      className="grid w-full cursor-pointer grid-cols-4 bg-white px-2 py-2 transition-all duration-200 ease-in-out hover:bg-gray-50"
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
          <TokenImg name={"ETH"} />
          <b className="m-0 text-xs">{amount}</b>
        </div>
        <div className="flex items-center gap-2">
          <p className="m-0 text-xs text-gray-medium">Chain : </p>
          <TokenImg name={l2.nativeCurrency.symbol} />
          <div className="text-xs">{l2.name}</div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <p className="m-0 text-xs text-gray-medium">Address : </p>
          <b className="m-0 text-xs">{addressCut(data.to)}</b>
        </div>
        <div className="flex items-center gap-2">
          <p className="m-0 text-xs text-gray-medium">Token : </p>
          <TokenImg name={"ETH"} />
          <b className="m-0 text-xs">{amount}</b>
        </div>
        <div className="flex items-center gap-2">
          <p className="m-0 text-xs text-gray-medium">Chain : </p>
          <TokenImg name={l1.nativeCurrency.symbol} />
          <div className="text-xs">{l1.name}</div>
        </div>
      </div>
    </div>
  );
};
