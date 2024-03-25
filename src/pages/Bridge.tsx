import TransactionContainer from "@components/Transaction/TransactionContainer";
import styled from "styled-components";

interface Props extends SimpleComponent {}

const BridgeWrapper = styled.div``;

function Bridge(props: Props) {
  return (
    <BridgeWrapper>
      <div className="">
        {/* <SearchBox /> */}
        {/* <NetworkSelectBox logo="/img/op-logo.png" chain="Optimism" /> */}
        <TransactionContainer />
      </div>
    </BridgeWrapper>
  );
}

export default Bridge;
