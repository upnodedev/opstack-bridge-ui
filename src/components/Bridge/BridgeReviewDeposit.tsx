import { l1StandardBridgeABI, optimismPortalABI } from "@abi/constant";
import ButtonStyled from "@components/ButtonStyled";
import { ERC20_DEPOSIT_MIN_GAS_LIMIT } from "@configs/bridge";
// import { deploymentAddresses } from "@configs/deploymentAddresses";
import { useAppDispatch } from "@states/hooks";
import { ModalSlide } from "@states/modal/reducer";
import { NetworkType, Token } from "@utils/opType";
import { useMemo, useState } from "react";
import styled from "styled-components";
import {
  Address,
  Chain,
  Hash,
  encodeFunctionData,
  formatUnits,
  parseUnits,
} from "viem";
import {
  useAccount,
  useEstimateFeesPerGas,
  useEstimateGas,
  usePublicClient,
} from "wagmi";
import BrideDepositReviewModal from "./BrideDepositReviewModal";
import { useReadBalance } from "@hooks/useReadBalance";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useUsdtPrice } from "@hooks/useUsdtPrice";
import { formatNumberStringComma } from "@utils/utils";
import { useOPWagmiConfig } from "@hooks/useOPWagmiConfig";

export type ReviewDepositDialogProps = {
  l1: Chain;
  l2: Chain;
  amount: string;
  selectedTokenPair: [Token, Token];
  disabled?: boolean;
  onSubmit?: () => void;
};

export type ReviewDepositDialogContent = {
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
};

const BridgeReviewDepositWrapper = styled.div``;

function BridgeReviewDeposit({
  l1,
  l2,
  amount,
  disabled,
  selectedTokenPair,
  onSubmit,
}: ReviewDepositDialogProps) {
  const dispatch = useAppDispatch();
  const { address, chain } = useAccount();
  const estimateFeePerGas = useEstimateFeesPerGas({ chainId: chain?.id });

  const { opConfig } = useOPWagmiConfig();

  const l2Chains = opConfig?.l2chains;

  const txData = useMemo(() => {
    if (!l2Chains) {
      throw new Error("Cannot find l2Chains");
    }
    const addresses = l2Chains[l2.id].l1Addresses;
    if (!addresses) {
      throw new Error(`Cannont find OptimismPortalProxy for chain id ${l2.id}`);
    }

    let calldata: Hash;
    const [l1Token, l2Token] = selectedTokenPair;

    const isETH = l1Token.extensions.opTokenId.toLowerCase() === "eth";
    const parsedAmount = parseUnits(amount ?? "0", l1Token.decimals);

    if (isETH) {
      calldata = encodeFunctionData({
        abi: l1StandardBridgeABI,
        functionName: "depositETH",
        args: [ERC20_DEPOSIT_MIN_GAS_LIMIT, "0x"],
      });
    } else {
      calldata = encodeFunctionData({
        abi: l1StandardBridgeABI,
        functionName: "depositERC20To",
        args: [
          l1Token.address,
          l2Token.address,
          addresses.l1StandardBridge.address,
          parsedAmount,
          ERC20_DEPOSIT_MIN_GAS_LIMIT,
          "0x",
        ],
      });
    }

    return {
      to: addresses.l1StandardBridge.address,
      amount: parsedAmount,
      calldata: calldata,
      isETH,
    };
  }, [address, amount, l2.id, selectedTokenPair]);

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

  const reviewDeposit = () => {
    dispatch(
      ModalSlide.actions.openModal({
        component: (
          <BrideDepositReviewModal
            l1={l1}
            l2={l2}
            txData={txData}
            selectedTokenPair={selectedTokenPair}
            gasPrice={gasPrice}
            onSubmit={onSubmit}
          />
        ),
      }),
    );
  };

  const [l1Token, l2Token] = selectedTokenPair;

  const balance = useReadBalance({
    chain: l2,
    selectedToken: l2Token,
  });

  const usdtPriceFetch = useUsdtPrice(l2Token.symbol);
  const usdtPrice = usdtPriceFetch
    ? usdtPriceFetch * +formatUnits(txData.amount, l1Token.decimals)
    : 0;

  const usdtBalancePrice = usdtPriceFetch
    ? usdtPriceFetch * Number(balance.data.formatted)
    : 0;

  return (
    <BridgeReviewDepositWrapper>
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
            {formatUnits(txData.amount, l1Token.decimals)} {l1Token.symbol}{" "}
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
          onClick={reviewDeposit}
        >
          Review deposit
        </ButtonStyled>
      </div>

      {/* <div className="mt-6">
        <div className="flex w-full justify-between">
          <span>Gas fee to transfer</span>
          <b>0.001082991121245616 ETH ($3.95)</b>
        </div>

        <div className="mt-2 flex w-full justify-between">
          <span>Time to transfer</span>
          <b>~1 minute</b>
        </div>
      </div> */}
    </BridgeReviewDepositWrapper>
  );
}

export default BridgeReviewDeposit;
