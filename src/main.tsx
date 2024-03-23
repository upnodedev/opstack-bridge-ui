import { createRoot } from "react-dom/client";
import "./polyfills.ts";

import "@rainbow-me/rainbowkit/styles.css";
import "react-circular-progressbar/dist/styles.css";
import "./styles/index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import routes from "./routes/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routes.map((route) => {
      return {
        index: route.path === "/",
        path: route.path === "/" ? undefined : route.path,
        element: route.element as JSX.Element,
      };
    }),
  },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(<RouterProvider router={router} />);
