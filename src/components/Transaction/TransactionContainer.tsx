import styled from "styled-components";
import { TransactionItem } from "./TransactionItem";
import { useNetworkConfig } from "@hooks/useNetworkConfig";
import { useOPNetwork } from "@hooks/useOPNetwork";
import { useOPWagmiConfig } from "@hooks/useOPWagmiConfig";
import { decodeEventLog, parseAbi, parseAbiItem } from "viem";
import { useAccount } from "wagmi";
import { useL2PublicClient } from "@hooks/useL2PublicClient";
import { l1StandardBridgeABI, optimismPortalABI } from "@abi/constant";
import { useL1PublicClient } from "@hooks/useL1PublicClient";
import { useEffect } from "react";

interface Props extends SimpleComponent {
  status: string;
  type?: "deposit" | "withdraw";
}

const TransactionContainerWrapper = styled.div``;

function TransactionContainer({ status }: Props) {
  const { chainId, networkType } = useNetworkConfig();
  const { networkPair } = useOPNetwork({
    type: networkType,
    chainId: chainId,
  });
  const { opConfig } = useOPWagmiConfig({
    type: networkType,
    chainId: chainId,
  });
  const { address } = useAccount();
  const { l1PublicClient } = useL1PublicClient({
    type: networkType,
    chainId: networkPair.l1.id,
  });
  const { l2PublicClient } = useL2PublicClient({
    type: networkType,
    chainId: networkPair.l2.id,
  });

  const getLogs = async (currentBlock: bigint) => {
    // console.log({ currentBlock })
    const addressConfig = opConfig?.l2chains[networkPair.l2.id];
    if (!addressConfig) return [];

    console.log({ currentBlock ,add: addressConfig.l1Addresses.portal.address});

    // check length can be 100
    let time = 100;
    const diff = currentBlock - 1000000n;
    if (diff < 0n) {
      time = Number(currentBlock / 10000n) + 1;
    }

    // console.log({ time });
    const result = await Promise.all(
      Array.from({ length: time }, (_, i) => {
        // no duplicate from previous
        const fromBlock =
          currentBlock - BigInt(i + 1) * 10000n + 1n < 0n
            ? 0n
            : currentBlock - BigInt(i + 1) * 10000n + 1n;
        let toBlock = currentBlock - BigInt(i) * 10000n;

        if (i === time - 1 && diff < 0n) {
          toBlock = toBlock - 1n;
        }

        // console.log({ fromBlock, toBlock })
        return l1PublicClient.getLogs({
          address: addressConfig.l1Addresses.l1Portal2?.address,
          event: parseAbiItem(
            "event TransactionDeposited(address indexed from, address indexed to, uint256 indexed version, bytes opaqueData)",
          ),
          // events: parseAbi([
          //   "event ERC20BridgeFinalized(address indexed localToken, address indexed remoteToken, address indexed from, address to, uint256 amount, bytes extraData)",
          //   "event ERC20BridgeInitiated(address indexed localToken, address indexed remoteToken, address indexed from, address to, uint256 amount, bytes extraData)",
          //   "event ERC20DepositInitiated(address indexed l1Token, address indexed l2Token, address indexed from, address to, uint256 amount, bytes extraData)",
          //   // "event ERC20WithdrawalFinalized(address indexed l1Token, address indexed l2Token, address indexed from, address to, uint256 amount, bytes extraData)",
          //   // "event ETHBridgeFinalized(address indexed from, address indexed to, uint256 amount, bytes extraData)",
          //   // "event ETHBridgeInitiated(address indexed from, address indexed to, uint256 amount, bytes extraData)",
          //   // "event ETHDepositInitiated(address indexed from, address indexed to, uint256 amount, bytes extraData)",
          //   // "event ETHWithdrawalFinalized(address indexed from, address indexed to, uint256 amount, bytes extraData)",
          // ]),
          fromBlock: fromBlock,
          toBlock: toBlock,
          // args: {
          //   from: address,
          // },
        });
      }),
    );

    // map to one array
    // const alllogs = result.flat().map((log) => {
    //   const topics = decodeEventLog({
    //     abi: l1StandardBridgeABI,
    //     ...log,
    //   });

    //   return topics;
    // });

    const alllogs = result.flat();

    return alllogs;
  };

  const getAllLogs = async () => {
    const addressConfig = opConfig?.l2chains[networkPair.l2.id];
    if (!addressConfig) return [];
    const currentBlock = await l2PublicClient.getBlockNumber();
    // const currentBlock = 5000000n

    const allTime = currentBlock / (10000n * 100n) + 1n;

    const logsArrayAll: any[][] = [];

    console.log({ currentBlock, allTime });

    for (let i = 0; i < allTime; i++) {
      // console.log({ i })
      const logsArray = await getLogs(currentBlock - BigInt(i) * 10000n * 100n);
      // console.log({ logsArray })
      // sleep 0.2s
      logsArrayAll.push(logsArray);
      await new Promise((r) => setTimeout(r, 200));
      console.log(`${i} done ${logsArray.length}`);
    }

    const logs = logsArrayAll.flat();

    return logs;
  };

  // useEffect(() => {
  //   if (!address) return;
  //   // get RPC and current chain ID
  //   const addressConfig = opConfig?.l2chains[networkPair.l2.id];
  //   if (!addressConfig) return;

  //   getAllLogs().then((logs) => {
  //     console.log("logs");
  //     console.log({ logs });
  //   });
  // }, [address, opConfig, networkPair]);

  return (
    <TransactionContainerWrapper className="mt-4">
      <h2>Activity</h2>
      <div className="text-base text-[#4C4E64AD]">{status}</div>
      <div className="mt-2 flex flex-col gap-4">
        <TransactionItem />
        <div className="border-b border-[#D0D5DD]"></div>
        <TransactionItem />
      </div>
    </TransactionContainerWrapper>
  );
}

export default TransactionContainer;
