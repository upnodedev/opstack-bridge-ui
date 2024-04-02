import { useState } from "react";
import styled from "styled-components";
import CryptoSelect from "./CryptoSelect";
import { TokenItemType, tokenList } from "@configs/tokenList";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useChainId } from "@hooks/useChainId";

interface Props extends SimpleComponent {
  value: number;
  token: TokenItemType;
  onChange: (value: number) => void;
  onTokenChange: (token: TokenItemType) => void;
  l2Balance: bigint | undefined;
  l1Balance: bigint | undefined;
}

const BrideToWrapper = styled.div``;

function BrideTo(props: Props) {
  return (
    <BrideToWrapper>
      <div className="w-full rounded-xl bg-gray-dark p-4 transition-all">
        <div className="flex items-center">
          <span>To</span>
          <img className="mx-2 h-6 w-6" src="/img/op-logo.png" />
          <span>OP Mainnet</span>
        </div>
        <p className="my-0 mt-2">You will recieve: 0 ETH</p>
      </div>
    </BrideToWrapper>
  );
}

export default BrideTo;
