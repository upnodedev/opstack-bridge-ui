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
import { useNetworkConfig } from "@hooks/useNetworkConfig";
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
import { useAccount } from "wagmi";
import { ReadContractErrorType, getWalletClient } from "wagmi/actions";

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
  const { networkType, chainId } = useNetworkConfig();
  const { address } = useAccount();

  const { networkPair } = useOPNetwork({
    type: networkType,
    chainId: chainId,
  });
  const { l1, l2 } = networkPair;

  const L1NetworkExplorerUrl = l1.blockExplorers?.default.url;
  const L2NetworkExplorerUrl = l2.blockExplorers?.default.url;

  const { l2PublicClient } = useL2PublicClient({
    type: networkType,
    chainId: networkPair.l1.id,
  });

  const { l1PublicClient } = useL1PublicClient({
    type: networkType,
    chainId: networkPair.l1.id,
  });

  const [receipt, setReceipt] = useState<TransactionReceipt>();
  const [status, setStatus] = useState("pending");
  const [timeLocal, setTimeLocal] = useState("");
  const [amount, setAmount] = useState("0");

  const getAmount = (value: string) => {
    return formatUnits(BigInt(value), l2.nativeCurrency.decimals);
  };

  const getAmountUsdt = () => (+amount * price).toFixed(2);

  const getReceipt = async () => {
    if (data.transactionHash) {
      const receipt = await l2PublicClient.getTransactionReceipt({
        hash: data.transactionHash as AddressType,
      });
      // get Timestamp
      const block = await l2PublicClient.getBlock({
        blockNumber: BigInt(data.blockNumber),
      });
      // console.log({block})
      const timestamp = block.timestamp * 1000n;

      console.log(l1PublicClient.chain);
      console.log(l2PublicClient.chain);

      const l2OutputOracleAddress =
        l2PublicClient.chain.contracts.l2OutputOracle[l1.id].address;

      const portalAddress =
        l2PublicClient.chain.contracts.portal[l1.id].address;

      const disputeGameFactory =
        l2PublicClient.chain.contracts.disputeGameFactory[l1.id].address;

      const withdrawalStatus = await getStatus(
        l1PublicClient,
        l2PublicClient,
        receipt,
        address as AddressType,
      );

      // const withdrawalStatus = await l1PublicClient.getWithdrawalStatus({
      //   receipt,
      //   targetChain: l2PublicClient.chain,
      //   chain: l1PublicClient.chain,
      // });

      // console.log({ withdrawalStatus });

      setStatus(!receipt.transactionIndex ? "pending" : receipt.status);
      setTimeLocal(new Date(Number(timestamp)).toLocaleString());
      setAmount(getAmount(data.amount));
      setReceipt(receipt);
    }
  };

  useEffect(() => {
    console.log({ data });
    getReceipt();
  }, []);

  // const prove = async () => {
  //   if (!opConfig) return;
  //   const L1walletClient = (
  //     await getWalletClient(opConfig, {
  //       chainId: l1PublicClient.chain.id,
  //     })
  //   ).extend(walletActionsL1());
  //   const { output, withdrawal } = await l1PublicClient.waitToProve({
  //     receipt: data.receipt,
  //     targetChain: l2PublicClient.chain,
  //     chain: undefined,
  //   });

  //   // 2. Build parameters to prove the withdrawal on the L2.
  //   const args = await l2PublicClient.buildProveWithdrawal({
  //     output,
  //     withdrawal,
  //     chain: l2PublicClient.chain,
  //   });

  //   // 3. Prove the withdrawal on the L1.
  //   const hash = await L1walletClient.proveWithdrawal(args);

  //   // 4. Wait until the prove withdrawal is processed.
  //   const receipt = await l1PublicClient.waitForTransactionReceipt({
  //     hash,
  //   });

  //   console.log({ receipt });
  // };

  // const finalize = async () => {
  //   if (!opConfig) return;
  //   const L1walletClient = (
  //     await getWalletClient(opConfig, {
  //       chainId: l1PublicClient.chain.id,
  //     })
  //   ).extend(walletActionsL1());

  //   // (Shortcut) Get withdrawals from receipt in Step 3.
  //   const [withdrawal] = getWithdrawals(data.receipt);

  //   // 1. Wait until the withdrawal is ready to finalize.
  //   await l1PublicClient.waitToFinalize({
  //     targetChain: l2PublicClient.chain,
  //     withdrawalHash: withdrawal.withdrawalHash,
  //     chain: undefined,
  //   });

  //   // 2. Finalize the withdrawal.
  //   const hash = await L1walletClient.finalizeWithdrawal({
  //     targetChain: l2PublicClient.chain,
  //     withdrawal,
  //   });

  //   // 3. Wait until the finalize withdrawal is processed.
  //   const receipt = await l1PublicClient.waitForTransactionReceipt({
  //     hash,
  //   });

  //   console.log({ receipt });
  // };

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
          <TokenImg name={"ETH"} />
          <b className="m-0 text-xs">{amount}</b>
        </div>
        <div className="flex items-center gap-2">
          <p className="m-0 text-xs text-gray-medium">Chain : </p>
          <TokenImg name={"ETH"} />
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
