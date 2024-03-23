import Bridge from "@pages/Bridge";
import { createRef } from "react";

const routes = [
  { path: "/", element: <Bridge name="HomePage" />, nodeRef: createRef() },
  { path: "/toast", element: <Bridge />, nodeRef: createRef() },
];

export default routes;
