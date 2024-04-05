import { ChainChip } from "@components/Chain/ChainChip";
import WithdrawModal from "@components/Modal/WithdrawModal";
import NetworkSelectBox from "@components/NetworkSelect/NetworkSelectBox";
import SearchBox from "@components/SearchBox";
import { TimelineStep } from "@components/Timeline";
import TransactionContainer from "@components/Transaction/TransactionContainer";
import { Icon } from "@iconify/react";
import { useState } from "react";
import styled from "styled-components";

interface Props extends SimpleComponent {}

const SelectChainWrapper = styled.div``;

function SelectChain(props: Props) {
  const [selectedTab, setSelectedTab] = useState("Mainnet");
  const [isOpen, setIsOpen] = useState(true);
  return (
    <SelectChainWrapper className="grid w-full grid-cols-5 py-8">
      <WithdrawModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="my-4 rounded-2xl border p-3">
          <div className="mb-1">
            <div className="flex gap-2">
              <ChainChip chainKey="OP" />
              <Icon icon="lucide:chevron-right" />
              <ChainChip chainKey="ETH" />
            </div>
            <div className="mt-1 flex items-center gap-2">
              <div className="text-lg font-semibold">0.1234 ETH</div>
              <div className="text-xs font-medium text-[#4C4E64AD]">
                ($11,221,333.22)
              </div>
            </div>
          </div>
        </div>
        <TimelineStep
          step={
            <Icon icon="lucide:send" width={24} height={24} color="#FC925B" />
          }
          title={<div className="text-[#101828]">Initiate withdrawal</div>}
          description={<div className="text-[#344054]">Fee est: $0.00</div>}
        />
        <TimelineStep
          step={
            <Icon icon="lucide:timer" width={24} height={24} color="#98A2B3" />
          }
          title={<div className="text-[#667085]">Initiate withdrawal</div>}
          description={
            <a
              href="https://blog.oplabs.co/two-step-withdrawals/"
              className="flex items-center gap-1 text-[#475467]"
            >
              <div>Learn more</div>
              <Icon icon="lucide:external-link" />
            </a>
          }
        />
        <TimelineStep
          step={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 26 26"
              fill="none"
            >
              <path
                d="M13 1C14.5759 1 16.1363 1.31039 17.5922 1.91345C19.0481 2.5165 20.371 3.40042 21.4853 4.51472C22.5996 5.62902 23.4835 6.95189 24.0866 8.4078C24.6896 9.86371 25 11.4241 25 13C25 14.5759 24.6896 16.1363 24.0866 17.5922C23.4835 19.0481 22.5996 20.371 21.4853 21.4853C20.371 22.5996 19.0481 23.4835 17.5922 24.0866C16.1363 24.6896 14.5759 25 13 25C11.4241 25 9.8637 24.6896 8.40779 24.0866C6.95189 23.4835 5.62902 22.5996 4.51472 21.4853C3.40041 20.371 2.5165 19.0481 1.91344 17.5922C1.31039 16.1363 0.999999 14.5759 1 13C1 11.4241 1.31039 9.8637 1.91345 8.40779C2.51651 6.95189 3.40042 5.62902 4.51472 4.51471C5.62903 3.40041 6.9519 2.5165 8.40781 1.91344C9.86371 1.31039 11.4241 0.999999 13 1L13 1Z"
                stroke="#4E4E4E"
                stroke-opacity="0.2"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13 1C15.5342 1 18.0033 1.80226 20.0534 3.2918C22.1036 4.78133 23.6296 6.88168 24.4127 9.2918C25.1958 11.7019 25.1958 14.2981 24.4127 16.7082C23.6296 19.1183 22.1036 21.2187 20.0534 22.7082"
                stroke="#FF5E00"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
          title={<div className="text-[#101828]">Prove withdrawal</div>}
          description={<div className="text-[#344054]">Fee est: $15.18</div>}
        />
        <TimelineStep
          step={
            <Icon
              icon="lucide:calendar"
              width={24}
              height={24}
              color="#079455"
            />
          }
          title={<div className="text-[#079455]">Wait 7 days</div>}
          description={
            <div className="text-[#344054]">
              You can view it on the{" "}
              <a
                className="text-[#FC925B]"
                href="https://optimistic.etherscan.io/tx/0x187b7ba89e89b9e953c214106e5bdf268ea51f55e8c03daa729469398929cd3b"
              >
                transaction explorer
              </a>{" "}
              page
            </div>
          }
        />
        <TimelineStep
          step={
            <Icon icon="lucide:stars" width={24} height={24} color="#FC925B" />
          }
          title={<div className="text-[#667085]">Claim withdrawal</div>}
          description={<div className="text-[#475467]">Fee est: $9.61</div>}
          isLast
        />
        <div className="my-4 border-b-2 border-dashed border-[#D0D5DD]" />
        <div className="flex items-start gap-2">
          <input type="checkbox" />
          <div>
            I understand it will take a few minutes until my funds are claimable
            on [Sepolia].
          </div>
        </div>
        <div className="flex items-start gap-2 pb-6">
          <input type="checkbox" />
          <div>
            I understand it will take a few minutes until my funds are claimable
            on [Sepolia].
          </div>
        </div>
      </WithdrawModal>
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
        <h2>Activity</h2>
        <TransactionContainer status="Pending" />
        <TransactionContainer status="Completed" />
      </div>
    </SelectChainWrapper>
  );
}

export default SelectChain;
