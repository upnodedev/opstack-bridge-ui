import BridgeDeposit from "@pages/BridgeDeposit";
import SelectChain from "@pages/SelectChain";
import TransactionPage from "@pages/TransactionPage";
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
  {
    path: "/bridge/transactions",
    element: <TransactionPage />,
    nodeRef: createRef(),
  },
];

export default routes;
