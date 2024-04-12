import { l2StandardBridgeABI, predeploys } from "@abi/constant";
import ButtonStyled from "@components/ButtonStyled";
import { useAppDispatch } from "@states/hooks";
import { ModalSlide } from "@states/modal/reducer";
import { NetworkType, Token } from "@utils/opType";
import { useMemo } from "react";
import styled from "styled-components";
import {
  Address,
  Chain,
  Hash,
  encodeFunctionData,
  formatUnits,
  parseEther,
  parseUnits,
} from "viem";
import { useAccount, useEstimateFeesPerGas, useEstimateGas } from "wagmi";
import BrideWithdrawReviewModal from "./BridgeWithdrawReviewModal";
import { useUsdtPrice } from "@hooks/useUsdtPrice";
import { formatNumberStringComma } from "@utils/utils";
import { useReadBalance } from "@hooks/useReadBalance";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ReviewWithdrawDialogProps extends SimpleComponent {
  l1: Chain;
  l2: Chain;
  amount: string;
  selectedTokenPair: [Token, Token];
  disabled?: boolean;
  onSubmit?: () => void;
  networkType: NetworkType;
}

const BridgeReviewWithdrawWrapper = styled.div``;

function BridgeReviewWithdraw({
  l1,
  l2,
  amount,
  disabled,
  selectedTokenPair,
  onSubmit,
  networkType,
}: ReviewWithdrawDialogProps) {
  const dispatch = useAppDispatch();
  const { chain, address } = useAccount();
  const estimateFeePerGas = useEstimateFeesPerGas({ chainId: chain?.id });

  const [_, l2Token] = selectedTokenPair;

  const txData = useMemo(() => {
    const isETH = l2Token.extensions.opTokenId.toLowerCase() === "eth";
    const parsedAmount = isETH
      ? parseEther(amount ?? "0")
      : parseUnits(amount ?? "0", l2Token.decimals);

    let calldata: Hash;

    if (isETH) {
      calldata = encodeFunctionData({
        abi: l2StandardBridgeABI,
        functionName: "withdraw",
        args: [
          predeploys.LegacyERC20ETH.address as Address,
          parsedAmount,
          0,
          "0x",
        ],
      });
    } else {
      calldata = encodeFunctionData({
        abi: l2StandardBridgeABI,
        functionName: "withdrawTo",
        args: [
          l2Token.address,
          predeploys.L2StandardBridge.address as Address,
          parsedAmount,
          0,
          "0x",
        ],
      });
    }

    return {
      to: predeploys.L2StandardBridge.address as Address,
      amount: parsedAmount,
      calldata: calldata,
      isETH,
    };
  }, [amount, l2Token]);

  const gasEstimate = useEstimateGas({
    chainId: chain?.id,
    data: txData.calldata,
    to: txData.to,
    value: txData.amount,
  });


  const gasPrice = useMemo(() => {
    if (!gasEstimate.data || !estimateFeePerGas.data?.maxFeePerGas) {
      return 0n;
    }
    return estimateFeePerGas.data.maxFeePerGas * gasEstimate.data;
  }, [estimateFeePerGas.data?.maxFeePerGas, gasEstimate.data]);

  const reviewWithdraw = () => {
    dispatch(
      ModalSlide.actions.openModal({
        component: (
          <BrideWithdrawReviewModal
            l1={l1}
            l2={l2}
            txData={txData}
            selectedTokenPair={selectedTokenPair}
            gasPrice={gasPrice}
            onSubmit={onSubmit}
            networkType={networkType}
          />
        ),
      }),
    );
  };

  const balance = useReadBalance({
    chain: l1,
    selectedToken: l2Token,
  });

  const usdtPriceFetch = useUsdtPrice(l2Token.symbol);
  const usdtPrice = usdtPriceFetch
    ? usdtPriceFetch * +formatUnits(txData.amount, l2Token.decimals)
    : 0;

  const usdtBalancePrice = usdtPriceFetch
    ? usdtPriceFetch * Number(balance.data.formatted)
    : 0;

  return (
    <BridgeReviewWithdrawWrapper>
      <div className="flex w-full flex-col gap-2 rounded-md border-2 border-primary bg-gray-light p-4">
        <div className="flex w-full justify-between">
          <span>To</span>
          <div>
            <img src={l2.nativeCurrency.name} alt="" />
            <b>{l2.name}</b>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <span>You will recieve</span>
          <b>
            {formatUnits(txData.amount, l2Token.decimals)} {l2Token.symbol}{" "}
            {+usdtPrice
              ? `(${formatNumberStringComma(+usdtPrice.toFixed(2))} $)`
              : ""}
          </b>
        </div>

        <div className="flex w-full justify-between">
          <span>Balance</span>
          <b className="flex items-center">
            {!address || balance.isPending ? (
              <Icon icon={"line-md:loading-loop"} />
            ) : (
              (+balance.data.formatted).toFixed(4)
            )}{" "}
            {l2Token.symbol}{" "}
            {+usdtBalancePrice
              ? `(${formatNumberStringComma(+usdtBalancePrice.toFixed(2))} $)`
              : ""}
          </b>
        </div>
      </div>

      <div className="mt-4 w-full">
        <ButtonStyled
          className="w-full"
          disabled={disabled}
          onClick={reviewWithdraw}
        >
          Review deposit
        </ButtonStyled>
      </div>
    </BridgeReviewWithdrawWrapper>
  );
}

export default BridgeReviewWithdraw;
