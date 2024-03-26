import BrideForm from "@components/Bridge/BrideForm";
import CryptoSelect from "@components/Bridge/CryptoSelect";
import { useEffect, useState } from "react";
import { TokenItemType, tokenList } from "@configs/tokenList";
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";
import TransactionContainer from "@components/Transaction/TransactionContainer";
import BrideTo from "@components/Bridge/BridgeTo";
import ButtonStyled from "@components/ButtonStyled";
import { useModal } from "@states/modal/hooks";
import { useAppDispatch } from "@states/hooks";
import { ModalSlide } from "@states/modal/reducer";
import BrideDepositReviewModal from "@components/Bridge/BrideDepositReviewModal";

interface Props extends SimpleComponent {}

const BridgeWrapper = styled.div``;

function Bridge(props: Props) {
  const [token, setToken] = useState(tokenList[0]);
  const [fromToken, setFromToken] = useState(tokenList[0]);
  const [toToken, setToToken] = useState(tokenList[1]);
  const dispatch = useAppDispatch();

  const handleTokenChange = (value: TokenItemType) => {
    setToken(value);
  };

  const handleFromTokenChange = (value: TokenItemType) => {
    setFromToken(value);
  };

  const handleToTokenChange = (value: TokenItemType) => {
    setToToken(value);
  };

  const reviewDeposit = () => {
    dispatch(
      ModalSlide.actions.openModal({ component: <BrideDepositReviewModal /> }),
    );
  };

  return (
    <BridgeWrapper className="grid w-full grid-cols-5 gap-4 py-8">
      <div className="col-span-3">
        <div className="text-md flex gap-2">
          <Icon icon={"akar-icons:arrow-left"} />
          Start Over
        </div>
        <div className="mt-6">
          <div className="mb-6 flex w-full items-center justify-between">
            <b className="text-2xl">Select Token</b>
            <CryptoSelect value={token} onChange={handleTokenChange} />
          </div>
          <div className="rounded-xl border-[1px] border-gray-dark bg-white p-4">
            <BrideForm value={fromToken} onChange={handleFromTokenChange} />
            <div className="my-2 flex w-full justify-center">
              <Icon
                icon={"iconamoon:arrow-down-2-bold"}
                className="mx-auto text-3xl text-gray-dark"
              />
            </div>
            <BrideTo value={fromToken} onChange={handleFromTokenChange} />
            <div className="mt-4 w-full">
              <ButtonStyled
                className="w-full"
                onClick={reviewDeposit}
                disabled={false}
              >
                Review deposit
              </ButtonStyled>
            </div>

            <div className="mt-6">
              <div className="flex w-full justify-between">
                <span>Gas fee to transfer</span>
                <b>0.001082991121245616 ETH ($3.95)</b>
              </div>

              <div className="mt-2 flex w-full justify-between">
                <span>Time to transfer</span>
                <b>~1 minute</b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 px-6">
        <h2>Activity</h2>
        <TransactionContainer status="Pending" />
        <TransactionContainer status="Completed" />
      </div>
    </BridgeWrapper>
  );
}

export default Bridge;
