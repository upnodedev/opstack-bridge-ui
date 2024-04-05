import styled from "styled-components";

interface Props extends SimpleComponent {
  logo: string;
  chain: string;
}

const NetworkSelectBoxWrapper = styled.div``;

function NetworkSelectBox({ logo, chain }: Props) {
  return (
    <NetworkSelectBoxWrapper className="bg-white rounded-[20px] border border-[#D0D5DD] bg-base-white p-3 shadow-sm">
      <div className="flex">
        <div className="rounded-full border border-[#FFBE98] bg-[#FFF3EC] px-2 py-0.5 text-[#FC925B]">
          L1 ETH
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <img src={logo} className="h-12 w-12 rounded-full" alt="" />
        <div className="text-xl">{chain}</div>
      </div>
    </NetworkSelectBoxWrapper>
  );
}

export default NetworkSelectBox;
