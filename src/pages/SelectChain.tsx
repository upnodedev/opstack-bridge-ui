import { WithdrawModal } from "@components/Modal/WithdrawModal";
import NetworkSelectBox from "@components/NetworkSelect/NetworkSelectBox";
import SearchBox from "@components/SearchBox";
import TransactionContainer from "@components/Transaction/TransactionContainer";
import { useState } from "react";
import styled from "styled-components";

interface Props extends SimpleComponent {}

const SelectChainWrapper = styled.div``;

function SelectChain(props: Props) {
  const [selectedTab, setSelectedTab] = useState("Mainnet");
  return (
    <SelectChainWrapper className="grid w-full grid-cols-5 py-8">
      {/* <WithdrawModal /> */}
      <div className="col-span-3 flex flex-col gap-6">
        <div>
          <b className="text-2xl">Select destination chain</b>
          <h5 className=" font mt-1 text-[#475467]">
            Native bridging contracts from OP Stack
          </h5>
        </div>
        <div className="flex">
          <div
            className={`w-full rounded-l-lg border border-[#D0D5DD] px-4 py-2 text-center ${selectedTab === "Mainnet" && "cursor-pointer bg-primary"}`}
            onClick={() => {
              setSelectedTab("Mainnet");
            }}
          >
            Mainnet
          </div>
          <div
            className={`w-full rounded-r-lg border border-l-0 border-[#D0D5DD] px-4 py-2 text-center ${selectedTab === "Testnet" && "bg-primary"} cursor-pointer`}
            onClick={() => {
              setSelectedTab("Testnet");
            }}
          >
            Testnet
          </div>
        </div>
        <SearchBox />
        <div className="grid grid-cols-3 gap-6">
          <NetworkSelectBox chain="Optimism" logo="/img/op-logo.png" />
          <NetworkSelectBox chain="Optimism" logo="/img/op-logo.png" />
          <NetworkSelectBox chain="Optimism" logo="/img/op-logo.png" />
          <NetworkSelectBox chain="Optimism" logo="/img/op-logo.png" />
          <NetworkSelectBox chain="Optimism" logo="/img/op-logo.png" />
          <NetworkSelectBox chain="Optimism" logo="/img/op-logo.png" />
        </div>
      </div>
      <div className="col-span-2 px-6">
        {/* <TransactionContainer status="Pending" /> */}
      </div>
    </SelectChainWrapper>
  );
}

export default SelectChain;
