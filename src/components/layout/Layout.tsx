import { AppProps } from "antd";
import Navbar from "../header/Navbar";

import { useEffect } from "react";
import { useReconnect } from "wagmi";
import { useLocation } from "react-router-dom";

export default function Layout({ children }: AppProps) {
  // const { reconnect } = useReconnect();
  const route = useLocation();

  useEffect(() => {
    scrollTo(0, 0);
  }, [route]);

  // useEffect(() => {
  //   reconnect();
  // }, []);
  return (
    <div className="relative min-h-screen">
      <Navbar></Navbar>

      <div className="mx-auto max-w-6xl w-full pt-24">{children}</div>
    </div>
  );
}
