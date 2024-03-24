import styled from "styled-components";
import CryptoSelect from "./CryptoSelect";
import { useState } from "react";
import { TokenItemType, tokenList } from "@configs/tokenList";

interface Props extends SimpleComponent {}

const BrideFormWrapper = styled.div``;

function BrideForm(props: Props) {
  const [token, setToken] = useState(tokenList[0]);

  const handleTokenChange = (value: TokenItemType) => {
    setToken(value);
  };

  return (
    <BrideFormWrapper className="flex w-full items-center justify-between">
      <b className="text-2xl">Select Token</b>
      <CryptoSelect value={token} onChange={handleTokenChange} />
    </BrideFormWrapper>
  );
}

export default BrideForm;
