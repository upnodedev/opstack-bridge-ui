import { useState } from "react";
import styled from "styled-components";
import CryptoSelect from "./CryptoSelect";
import { TokenItemType, tokenList } from "@configs/tokenList";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useChainId } from "@hooks/useChainId";

interface Props extends SimpleComponent {
  value: TokenItemType;
  onChange: (token: TokenItemType) => void;
}

const BrideToWrapper = styled.div``;

function BrideTo(props: Props) {
  return (
    <BrideToWrapper>
      <div className="bg-gray-dark w-full rounded-xl p-4 transition-all">
        <div className="flex items-center">
          <span>To</span>
          <img className="w-6 h-6 mx-2" src="/img/op-logo.png"/>
          <span>OP Mainnet</span>
        </div>
        <p className="mt-2 my-0">You will recieve: 0 ETH</p>
      </div>
    </BrideToWrapper>
  );
}

export default BrideTo;
