import { TokenItemType, tokenList } from "@configs/tokenList";
import { useState } from "react";
import styled from "styled-components";
import CryptoSelect from "./CryptoSelect";

interface Props extends SimpleComponent {}

const BrideFormWrapper = styled.div``;

function BrideForm(props: Props) {
  const [token, setToken] = useState(tokenList[0]);

  const handleTokenChange = (value: TokenItemType) => {
    setToken(value);
  };

  return (
    <BrideFormWrapper className="flex w-full items-center justify-between">
      <div>
        <b className="text-2xl">Select destination chain</b>
        <h5 className=" font text-[#475467]">
          Native bridging contracts from OP Stack
        </h5>
      </div>
      <CryptoSelect value={token} onChange={handleTokenChange} />
    </BrideFormWrapper>
  );
}

export default BrideForm;
