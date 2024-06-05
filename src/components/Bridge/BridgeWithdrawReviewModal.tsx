import ButtonStyled from "@components/ButtonStyled";
import { useWriteWithdrawETH } from "@hooks/Wallet/L2/useWriteWithdrawETH";
import { useOPWagmiConfig } from "@hooks/useOPWagmiConfig";
import { useUsdtPrice } from "@hooks/useUsdtPrice";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppDispatch } from "@states/hooks";
import { ModalSlide } from "@states/modal/reducer";
import { NetworkType, Token } from "@utils/opType";
import { Modal } from "antd";
import { useCallback, useState } from "react";
import { Address, Chain, Hash, formatEther, formatUnits } from "viem";
import { useAccount, usePublicClient } from "wagmi";

export type ReviewWithdrawalDialogContent = {
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
  networkType: NetworkType;
};
// BrideWithdrawReviewModal
const BrideWithdrawReviewModal = ({
  l2,
  txData,
  selectedTokenPair,
  gasPrice,
  onSubmit,
  networkType,
}: ReviewWithdrawalDialogContent) => {
  const { address, chain } = useAccount();

  const { opConfig } = useOPWagmiConfig({
    type: networkType,
    chainId: chain?.id,
  });

  const l2PublicClient = usePublicClient({ chainId: l2.id });

  const { data: l2TxHash, writeWithdrawETHAsync } = useWriteWithdrawETH({
    config: opConfig,
  });

  // const { data: l2ERC20TxHash, writeWithdrawERC20Async } =
  //   useWriteWithdrawERC20({ config: opConfig });

  // const { allowance, approve } = useERC20Allowance({
  //   token: selectedTokenPair[1],
  //   amount: MAX_ALLOWANCE,
  //   owner: address as Address,
  //   spender: txData.to,
  // });

  // const txHash = txData.isETH ? l2TxHash : l2ERC20TxHash;
  const txHash = l2TxHash;
  const [_, l2Token] = selectedTokenPair;

  const onSubmitWithdrawal = useCallback(async () => {
    if (!l2PublicClient) return;
    // if (txData.isETH) {
    await writeWithdrawETHAsync({
      args: {
        to: address,
        amount: txData.amount,
        extraData: txData.calldata,
      },
      l2ChainId: l2.id,
    });
    // } else {
    //   const shouldApprove =
    //     !txData.isETH && (allowance.data ?? 0n) < txData.amount;
    //   if (shouldApprove) {
    //     const approvalTxHash = await approve();
    //     await l2PublicClient.waitForTransactionReceipt({
    //       hash: approvalTxHash,
    //     });
    //   }

    //   await writeWithdrawERC20Async({
    //     args: {
    //       to: txData.to,
    //       l2Token: l2Token.address,
    //       amount: txData.amount,
    //     },
    //     chainId: l2.id,
    //   });
    // }

    onSubmit?.();
  }, [
    // writeWithdrawETHAsync,
    // writeWithdrawERC20Async,
    // onSubmit,
    // txData,
    // l2,
    // l2Token,
    l2PublicClient,
  ]);

  const usdtPriceFetch = useUsdtPrice(l2Token.symbol);
  const usdtPriceGas = usdtPriceFetch
    ? usdtPriceFetch * +formatUnits(gasPrice, l2.nativeCurrency.decimals)
    : 0;
  const usdtAmount = usdtPriceFetch
    ? usdtPriceFetch * +formatUnits(txData.amount, l2Token.decimals)
    : 0;

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

  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
    >
      <div className="flex flex-col gap-4">
        <b className="text-2xl">Withdraw</b>

        <div className="">
          <span className="text-lg text-gray-dark">Routing</span>
          <div className="font-bold">Standard speed</div>
        </div>

        <div className="">
          <span className="text-lg text-gray-dark">Amount to deposit</span>
          <div className="flex w-full justify-between text-lg">
            <div className="font-bold">
              {" "}
              {formatUnits(txData.amount, l2Token.decimals)} {l2Token.symbol}
            </div>
            <div className="font-bold">
              {usdtAmount ? (
                `$${usdtAmount.toFixed(4)}`
              ) : (
                <Icon icon={"line-md:loading-loop"} />
              )}
            </div>
          </div>
        </div>

        <div className="">
          <span className="text-lg text-gray-dark">Gas fee to transfer</span>
          <div className="flex w-full justify-between text-lg">
            <div className="font-bold">
              ~ {formatEther(gasPrice)} {l2.nativeCurrency.symbol}
            </div>
            <div className="font-bold">
              {usdtPriceFetch ? (
                `$${usdtPriceGas.toFixed(4)}`
              ) : (
                <Icon icon={"line-md:loading-loop"} />
              )}
            </div>
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

        {txHash ? (
          <div>
            View Transaction:{" "}
            <a
              className="cursor-pointer underline"
              href={`${l2.blockExplorers?.default.url}/tx/${l2TxHash}`}
            >
              link
            </a>
          </div>
        ) : (
          <div className="w-full">
            <ButtonStyled
              className="w-full"
              onClick={onSubmitWithdrawal}
              disabled={!!txHash}
            >
              Confirm Withdrawal
            </ButtonStyled>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default BrideWithdrawReviewModal;
