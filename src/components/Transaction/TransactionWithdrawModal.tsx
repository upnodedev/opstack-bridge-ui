import { TimelineStep } from "@components/Timeline";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import BridgeModal from "../Modal/Modal";
import { useAppDispatch } from "@states/hooks";
import { ModalSlide } from "@states/modal/reducer";
import { Button, Flex, Modal } from "antd";
import { AddressType, withdrawalEvent } from "@types";
import { TransactionReceipt, formatUnits } from "viem";
import { useOPNetwork } from "@hooks/useOPNetwork";
import TokenImg from "@components/TokenImg";
import { useL2PublicClient } from "@hooks/useL2PublicClient";
import { useL1PublicClient } from "@hooks/useL1PublicClient";
import { useOPWagmiConfig } from "@hooks/useOPWagmiConfig";
import { getWalletClient } from "wagmi/actions";
import { walletActionsL1 } from "viem/op-stack";

interface TransactionItemWithdrawalProps {
  data: withdrawalEvent;
  txId: string;
  price: number;
}

export const TransactionWithdrawModal = ({
  txId,
  data,
  price,
}: TransactionItemWithdrawalProps) => {
  const dispatch = useAppDispatch();
  const { networkPair } = useOPNetwork();
  const { l1, l2 } = networkPair;

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOk = () => {
    closed();
  };

  const handleCancel = () => {
    closed();
  };

  const closed = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      dispatch(ModalSlide.actions.closeModal());
    }, 500);
  };

  const [receipt, setReceipt] = useState<TransactionReceipt>();
  const [status, setStatus] = useState("pending");
  const [timeLocal, setTimeLocal] = useState("");
  const [amount, setAmount] = useState("0");

  const L1NetworkExplorerUrl = l1.blockExplorers?.default.url;
  const L2NetworkExplorerUrl = l2.blockExplorers?.default.url;

  const { opConfig } = useOPWagmiConfig();

  const { l2PublicClient } = useL2PublicClient();
  const { l1PublicClient } = useL1PublicClient();

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

      const withdrawalStatus = await l1PublicClient.getWithdrawalStatus({
        receipt,
        targetChain: l2PublicClient.chain,
        chain: l1PublicClient.chain,
      });

      // setStatus(withdrawalStatus);
      setStatus(!receipt.transactionIndex ? "reverted" : withdrawalStatus);
      setTimeLocal(new Date(Number(timestamp)).toLocaleString());
      setAmount(getAmount(data.amount));
      setReceipt(receipt);
    }
  };

  useEffect(() => {
    getReceipt();
  }, []);

  const prove = async () => {
    if (!opConfig) return;
    if (!receipt) return;
    const L1walletClient = (
      await getWalletClient(opConfig, {
        chainId: l1PublicClient.chain.id,
      })
    ).extend(walletActionsL1());
    const { output, withdrawal } = await l1PublicClient.waitToProve({
      receipt: receipt,
      targetChain: l2PublicClient.chain,
      chain: undefined,
    });

    // 2. Build parameters to prove the withdrawal on the L2.
    const args = await l2PublicClient.buildProveWithdrawal({
      output,
      withdrawal,
      chain: l2PublicClient.chain,
    });

    // 3. Prove the withdrawal on the L1.
    const hash = await L1walletClient.proveWithdrawal(args);

    // 4. Wait until the prove withdrawal is processed.
    const receiptProve = await l1PublicClient.waitForTransactionReceipt({
      hash,
    });

    console.log({ receiptProve });
  };

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

  return (
    <Modal
      className="font-['Inter']"
      title={
        <>
          <div>Withdraw</div>
          <div className="text-sm font-normal">
            This usually takes{" "}
            <span className="font-bold text-[#FF0420]">7 days</span> Bridge any
            token to Ethereum Mainnet
          </div>
        </>
      }
      style={{ top: 50 }}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[]}
    >
      <div className="my-4 rounded-2xl border p-3">
        <div className="mb-1">
          <Flex align="center" gap={2}>
            <Flex align="center" gap={2}>
              <TokenImg name={l2.nativeCurrency.symbol} />
              <div className="text-xs">{l2.name}</div>
            </Flex>
            <Icon icon="lucide:chevron-right" />
            <Flex align="center" gap={2}>
              <TokenImg name={l1.nativeCurrency.symbol} />
              <div className="text-xs">{l1.name}</div>
            </Flex>
          </Flex>
          <div className="mt-1 flex items-center gap-2">
            <div className="text-lg font-semibold">{amount} ETH</div>
            <div className="text-xs font-medium text-[#4C4E64AD]">
              (${getAmountUsdt()})
            </div>
          </div>
        </div>
      </div>
      <TimelineStep
        step={
          <Icon icon="lucide:send" width={24} height={24} color="#FC925B" />
        }
        title={<div className="text-[#101828]">Initiate withdrawal</div>}
        description={<div className="text-[#344054]">Fee est: $0.00</div>}
      />
      <TimelineStep
        step={
          <Icon icon="lucide:timer" width={24} height={24} color="#98A2B3" />
        }
        title={<div className="text-[#667085]">Initiate withdrawal</div>}
        description={
          <a
            href="https://blog.oplabs.co/two-step-withdrawals/"
            className="flex items-center gap-1 text-[#475467]"
          >
            <div>Learn more</div>
            <Icon icon="lucide:external-link" />
          </a>
        }
      />
      <TimelineStep
        step={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 26 26"
            fill="none"
          >
            <path
              d="M13 1C14.5759 1 16.1363 1.31039 17.5922 1.91345C19.0481 2.5165 20.371 3.40042 21.4853 4.51472C22.5996 5.62902 23.4835 6.95189 24.0866 8.4078C24.6896 9.86371 25 11.4241 25 13C25 14.5759 24.6896 16.1363 24.0866 17.5922C23.4835 19.0481 22.5996 20.371 21.4853 21.4853C20.371 22.5996 19.0481 23.4835 17.5922 24.0866C16.1363 24.6896 14.5759 25 13 25C11.4241 25 9.8637 24.6896 8.40779 24.0866C6.95189 23.4835 5.62902 22.5996 4.51472 21.4853C3.40041 20.371 2.5165 19.0481 1.91344 17.5922C1.31039 16.1363 0.999999 14.5759 1 13C1 11.4241 1.31039 9.8637 1.91345 8.40779C2.51651 6.95189 3.40042 5.62902 4.51472 4.51471C5.62903 3.40041 6.9519 2.5165 8.40781 1.91344C9.86371 1.31039 11.4241 0.999999 13 1L13 1Z"
              stroke="#4E4E4E"
              stroke-opacity="0.2"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13 1C15.5342 1 18.0033 1.80226 20.0534 3.2918C22.1036 4.78133 23.6296 6.88168 24.4127 9.2918C25.1958 11.7019 25.1958 14.2981 24.4127 16.7082C23.6296 19.1183 22.1036 21.2187 20.0534 22.7082"
              stroke="#FF5E00"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        }
        title={<div className="text-[#101828]">Prove withdrawal</div>}
        description={<div className="text-[#344054]">Fee est: $15.18</div>}
      />
      <TimelineStep
        step={
          <Icon icon="lucide:calendar" width={24} height={24} color="#079455" />
        }
        title={<div className="text-[#079455]">Wait 7 days</div>}
        description={
          <div className="text-[#344054]">
            You can view it on the{" "}
            <a
              className="text-[#FC925B]"
              href="https://optimistic.etherscan.io/tx/0x187b7ba89e89b9e953c214106e5bdf268ea51f55e8c03daa729469398929cd3b"
            >
              transaction explorer
            </a>{" "}
            page
          </div>
        }
      />
      <TimelineStep
        step={
          <Icon icon="lucide:stars" width={24} height={24} color="#FC925B" />
        }
        title={<div className="text-[#667085]">Claim withdrawal</div>}
        description={<div className="text-[#475467]">Fee est: $9.61</div>}
        isLast
      />
      <div className="my-4 border-b-2 border-dashed border-[#D0D5DD]" />
      <div className="flex items-start gap-2">
        <input type="checkbox" />
        <div>
          I understand it will take a few minutes until my funds are claimable
          on [Sepolia].
        </div>
      </div>
      <div className="flex items-start gap-2 pb-6">
        <input type="checkbox" />
        <div>
          I understand it will take a few minutes until my funds are claimable
          on [Sepolia].
        </div>
      </div>

      <div className="flex gap-3">
        {/* <Button key="back" onClick={handleCancel} className="px-3.5">
          Other bridge
        </Button> */}
        {status === "ready-to-prove" && (
          <Button
            onClick={prove}
            className="w-full border border-primary bg-primary px-3.5"
          >
            Prove
          </Button>
        )}
      </div>
    </Modal>
  );
};
