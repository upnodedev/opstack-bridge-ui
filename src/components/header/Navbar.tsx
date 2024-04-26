// import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { Avatar, Dropdown, MenuProps, Space } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

import MainLogo from "@components/Logo/MainLogo";
import ConnectWalletButton from "@components/Button/ConnectWalletButton";

export default function Navbar() {
  const items: MenuProps["items"] = [
    {
      label: "Profile",
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: "Settings",
      key: "1",
    },
    // {
    //   label: <a href="https://www.aliyun.com">3rd menu item</a>,
    //   key: "2",
    // },
  ];

  return (
    <div className="bg-white px-3 md:px-4 py-2 sm:py-3 md:py-4 border-b border-b-[#EAECF0] bg-base-white w-screen left-0 top-0 fixed z-10">
        <div className="container mx-auto flex justify-between">
          <div className="flex">
            <MainLogo />
            <div className="grid grid-cols-4 mt-2 ml-10">
              {/* <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <span>Home</span>
              </Link> */}
              <Link
                to="/bridge/deposit"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>Deposit</span>
              </Link>
              <Link
                to="/bridge/withdraw"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>Withdraw</span>
              </Link>
              <Link
                to="/bridge/transactions"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>Transaction</span>
              </Link>
            </div>
          </div>
          <div>
            <ConnectWalletButton />
            {/* <CustomConnectButton /> */}
          </div>
        </div>
      </div>
  );
}
