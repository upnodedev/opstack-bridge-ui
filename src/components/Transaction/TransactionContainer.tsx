import styled from "styled-components";

interface Props extends SimpleComponent {}

const TransactionContainerWrapper = styled.div``;

function TransactionContainer(props: Props) {
  return (
    <TransactionContainerWrapper className="px-6">
      <h2>Activity</h2>
    </TransactionContainerWrapper>
  );
}

export default TransactionContainer;
