import ButtonStyled from "@components/ButtonStyled";
import { useOPWagmiConfig } from "@hooks/useOPWagmiConfig";
import { useAppDispatch } from "@states/hooks";
import { ModalSlide } from "@states/modal/reducer";
import { Token } from "@utils/opType";
import { Modal } from "antd";
import { useCallback, useState } from "react";
import { Address, Chain, Hash, formatUnits } from "viem";
import { useAccount, usePublicClient } from "wagmi";

interface Props extends SimpleComponent {
  l1: Chain;
  l2: Chain;
  txData: {
    to: Address;
    amount: bigint;
    calldata: Hash;
    isETH: boolean;
    l2Token?: Token;
  };
  selectedTokenPair: [Token, Token];
  gasPrice: bigint;
  onSubmit?: () => void;
}

export default function BrideDepositReviewModal({
  l1,
  l2,
  txData,
  selectedTokenPair,
  gasPrice,
  onSubmit,
}: Props) {
  const dispatch = useAppDispatch();

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

  const { address, chain } = useAccount();
  // const { opConfig } = useOPWagmiConfig({
  //   type: NETWORK_TYPE,
  //   chainId: chain?.id,
  // });

  // const l1PublicClient = usePublicClient({ chainId: l1.id });

  // const { data: l1TxHash, writeDepositETHAsync } = useWriteDepositETH({
  //   config: opConfig,
  // });
  // const { data: l1ERC20TxHash, writeDepositERC20Async } = writeDepositERC20Async({
  //   config: opConfig,
  // });
  // const { allowance, approve } = useERC20Allowance({
  //   token: selectedTokenPair[0],
  //   amount: MAX_ALLOWANCE,
  //   owner: address as Address,
  //   spender: txData.to,
  // });

  // const txHash = txData.isETH ? l1TxHash : l1ERC20TxHash;
  const [l1Token, l2Token] = selectedTokenPair;

  // const onSubmitDeposit = useCallback(async () => {
  //   if (txData.isETH) {
  //     await writeDepositETHAsync({
  //       args: {
  //         to: txData.to,
  //         amount: txData.amount,
  //       },
  //       l2ChainId: l2.id,
  //     });
  //   } else {
  //     const shouldApprove =
  //       !txData.isETH && (allowance.data ?? 0n) < txData.amount;
  //     if (shouldApprove) {
  //       const approvalTxHash = await approve();
  //       await l1PublicClient.waitForTransactionReceipt({
  //         hash: approvalTxHash,
  //       });
  //     }

  //     await writeDepositERC20Async({
  //       args: {
  //         l1Token: l1Token.address as Address,
  //         l2Token: l2Token.address as Address,
  //         to: txData.to,
  //         amount: txData.amount,
  //       },
  //       l2ChainId: l2.id,
  //     });
  //   }
  //   onSubmit?.();
  // }, [
  //   approve,
  //   writeDepositETHAsync,
  //   writeDepositERC20Async,
  //   onSubmit,
  //   txData,
  //   l2,
  //   l1PublicClient,
  //   l1Token,
  //   l2Token,
  // ]);

  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
    >
      <div className="flex flex-col gap-4">
        <b className="text-2xl">Deposit</b>

        <div className="">
          <span className="text-lg text-gray-dark">Routing</span>
          <div className="font-bold">Standard speed</div>
        </div>

        <div className="">
          <span className="text-lg text-gray-dark">Amount to deposit</span>
          <div className="flex w-full justify-between text-lg">
            <div className="font-bold">
              {" "}
              {formatUnits(txData.amount, l1Token.decimals)} {l1Token.symbol}
            </div>
            <div className="font-bold">$919.23</div>
          </div>
        </div>

        <div className="">
          <span className="text-lg text-gray-dark">Estimated time</span>
          <div className="font-bold">~ 1 minute</div>
        </div>

        <div className="">
          <span className="text-lg text-gray-dark">Destination</span>
          <div className="font-bold">{address}</div>
        </div>

        <div className="w-full">
          <ButtonStyled className="w-full" onClick={() => {}} disabled={false}>
            Confirm Deposit
          </ButtonStyled>
        </div>
      </div>
    </Modal>
  );
}
