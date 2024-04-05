import BridgeDeposit from "@pages/BridgeDeposit";
import SelectChain from "@pages/SelectChain";
import { createRef } from "react";

const routes = [
  {
    path: "/",
    element: <SelectChain name="HomePage" />,
    nodeRef: createRef(),
  },
  {
    path: "/bridge/deposit",
    element: <BridgeDeposit name="bridge deposit" />,
    nodeRef: createRef(),
  },
];

export default routes;
