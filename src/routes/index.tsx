import Bridge from "@pages/Bridge";
import SelectChain from "@pages/SelectChain";
import { createRef } from "react";

const routes = [
  { path: "/", element: <Bridge name="HomePage" />, nodeRef: createRef() },
  {
    path: "/select-chain",
    element: <SelectChain name="HomePage" />,
    nodeRef: createRef(),
  },
  { path: "/toast", element: <Bridge />, nodeRef: createRef() },
];

export default routes;
