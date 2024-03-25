import BrideForm from "@components/Bridge/BrideForm";
import CryptoSelect from "@components/Bridge/CryptoSelect";
import { useState } from "react";
import { TokenItemType, tokenList } from "@configs/tokenList";
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Props extends SimpleComponent {}

const BridgeWrapper = styled.div``;

function Bridge(props: Props) {
  const [token, setToken] = useState(tokenList[0]);
  const [fromToken, setFromToken] = useState(tokenList[0]);
  const [toToken, setToToken] = useState(tokenList[1]);

  const handleTokenChange = (value: TokenItemType) => {
    setToken(value);
  };

  const handleFromTokenChange = (value: TokenItemType) => {
    setFromToken(value);
  };

  const handleToTokenChange = (value: TokenItemType) => {
    setToToken(value);
  };
  return (
    <BridgeWrapper className="grid w-full grid-cols-5 py-8">
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
          <div className="bg-white border-gray-dark rounded-xl border-[1px] p-4">
            <BrideForm value={fromToken} onChange={handleFromTokenChange} />
            <div className="my-2 flex w-full justify-center">
              <Icon
                icon={"iconamoon:arrow-down-2-bold"}
                className="mx-auto text-3xl"
              />
            </div>
            <BrideForm value={fromToken} onChange={handleFromTokenChange} />
          </div>
        </div>
      </div>
      <div className="col-span-2">sdf</div>
    </BridgeWrapper>
  );
}

export default Bridge;
