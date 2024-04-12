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
    element: <BridgeDeposit action="deposit" />,
    nodeRef: createRef(),
  },
  {
    path: "/bridge/withdraw",
    element: <BridgeDeposit action="withdrawal" />,
    nodeRef: createRef(),
  },
];

export default routes;
