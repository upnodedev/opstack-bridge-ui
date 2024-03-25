import styled from "styled-components";

interface Props extends SimpleComponent {}

const BridgeToWrapper = styled.div``;

function BridgeTo(props: Props) {
  return (
    <BridgeToWrapper>
      <div className=""></div>
    </BridgeToWrapper>
  );
}

export default BridgeTo;
