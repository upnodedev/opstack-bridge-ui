import BrideForm from "@components/Bridge/BrideForm";
import { Icon } from "@iconify/react";
import styled from "styled-components";

interface Props extends SimpleComponent {}

const BridgeWrapper = styled.div``;

function Bridge(props: Props) {
  return (
    <BridgeWrapper className="grid w-full grid-cols-5 py-8">
      <div className="col-span-3">
        <div className="text-md flex gap-2">
          <Icon icon={"akar-icons:arrow-left"} />
          Start Over
        </div>
        <div className="mt-6">
          <BrideForm />
        </div>
      </div>
      <div className="col-span-2">sdf</div>
    </BridgeWrapper>
  );
}

export default Bridge;
