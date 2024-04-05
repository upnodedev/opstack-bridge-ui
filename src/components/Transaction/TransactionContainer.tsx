import styled from "styled-components";
import { TransactionItem } from "./TransactionItem";

interface Props extends SimpleComponent {
  status: string;
}

const TransactionContainerWrapper = styled.div``;

function TransactionContainer({ status }: Props) {
  return (
    <TransactionContainerWrapper className="mt-4">
      <h2>Activity</h2>
      <div className="text-base text-[#4C4E64AD]">{status}</div>
      <div className="mt-2 flex flex-col gap-4">
        <TransactionItem />
        <div className="border-b border-[#D0D5DD]"></div>
        <TransactionItem />
      </div>
    </TransactionContainerWrapper>
  );
}

export default TransactionContainer;
