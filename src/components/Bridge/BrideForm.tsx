import { useState } from "react";
import styled from "styled-components";
import CryptoSelect from "./CryptoSelect";
import { TokenItemType, tokenList } from "@configs/tokenList";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Props extends SimpleComponent {
  value: TokenItemType;
  onChange: (token: TokenItemType) => void;
}

const BrideFormWrapper = styled.div``;

function BrideForm(props: Props) {
  return (
    <BrideFormWrapper>
      <div className="w-full p-4 rounded-xl border-[1px] border-gray-dark focus:bg-gray-light hover:bg-gray-light transition-all">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2">
            <Icon icon={"gg:arrow-up-o"} className="text-2xl" />
            <b className="text-lg">From</b>
          </div>

          <div className="text-gray-dark">Bal : 11.21</div>
        </div>
        {/*  */}

        <div className="mt-2 flex w-full justify-between">
          <CryptoSelect
            value={props.value}
            onChange={props.onChange}
            small={true}
          />
          <div className="flex items-center">
            <span className="text-gray-dark text-sm mr-2">$300</span>
            <input
              value={1000}
              type="text"
              placeholder="0.0"
              className="text-black w-[180px] rounded-xl border-0 py-1 text-right text-2xl font-bold outline-none"
            />
            <b className="ml-2">{props.value.name}</b>
          </div>
        </div>
      </div>
    </BrideFormWrapper>
  );
}

export default BrideForm;
