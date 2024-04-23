/* eslint-disable react-hooks/exhaustive-deps */
import { optimismPortalABI } from "@abi/constant";
import { useL1PublicClient } from "@hooks/useL1PublicClient";
import { useL2PublicClient } from "@hooks/useL2PublicClient";
import { useNetworkConfig } from "@hooks/useNetworkConfig";
import { useOPNetwork } from "@hooks/useOPNetwork";
import { useOPWagmiConfig } from "@hooks/useOPWagmiConfig";
import { validatePortalContract } from "@utils/validateChains";
import { useEffect, useState } from "react";
import { decodeEventLog, parseAbiItem } from "viem";
import { useAccount } from "wagmi";

export type TransactionDepositTopicType = {
  from: string;
  to: string;
  version: string;
  opaqueData: string;
};

export type TransactionDepositType = {
  address: string;
  blockNumber: number;
  transactionHash: string;
  topics: {
    eventName: string;
    args: TransactionDepositTopicType;
  };
  value?: bigint;
  time: Date;
  timestamp?: any;
  status?: "success" | "reverted" | "pending";
};

export default function useTransactionDepositETH() {
  const [logs, setLogs] = useState<TransactionDepositType[]>([]);
  const [loading, setLoading] = useState(true);
  const { chainId, networkType } = useNetworkConfig();
  const { opConfig } = useOPWagmiConfig({
    type: networkType,
    chainId: chainId,
  });

  const { networkPair } = useOPNetwork({
    type: networkType,
    chainId: chainId,
  });

  const { address } = useAccount();
  const { l1PublicClient } = useL1PublicClient({
    type: networkType,
    chainId: networkPair.l1.id,
  });
  // const { l2PublicClient } = useL2PublicClient({
  //   type: networkType,
  //   chainId: networkPair.l2.id,
  // });
  const l1ChainId = networkPair.l1.id;
  const l2Chain = networkPair.l2;

  const getLogs = async (currentBlock: bigint) => {
    // console.log({ currentBlock })
    const addressConfig = opConfig?.l2chains[networkPair.l2.id];
    if (!addressConfig) return [];

    const portal = validatePortalContract(l1ChainId, l2Chain).address;

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
          address: portal,
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
          args: {
            from: address,
          },
        });
      }),
    );

    // console.log({result})

    const alllogs = result.flat().map((log) => {
      const topics = decodeEventLog({
        abi: optimismPortalABI,
        ...log,
      });

      return {
        topics,
        blockNumber: log.blockNumber,
        transactionHash: log.transactionHash,
        address: log.address,
        ...logs,
      };
    });

    return alllogs;
  };

  const getAllLogs = async () => {
    const addressConfig = opConfig?.l2chains[networkPair.l2.id];
    if (!addressConfig) return [];
    const currentBlock = await l1PublicClient.getBlockNumber();
    // const currentBlock = 5000000n

    const allTime = currentBlock / (10000n * 100n) + 1n;

    const logsArrayAll: any[][] = [];

    // console.log({ currentBlock, allTime });

    for (let i = 0; i < allTime; i++) {
      // console.log({ i })
      const logsArray = await getLogs(currentBlock - BigInt(i) * 10000n * 100n);
      // console.log({ logsArray })
      // sleep 0.2s
      logsArrayAll.push(logsArray);
      await new Promise((r) => setTimeout(r, 200));
      // console.log(`${i} done ${logsArray.length}`);
      // if (logsArray.length > 0) break;
    }

    const logs = logsArrayAll.flat();

    // get Transaction Info
    for (let i = 0; i < logs.length; i++) {
      const log = logs[i];
      const tx = await l1PublicClient.getTransaction({
        hash: log.transactionHash,
      });

      const receipt = await l1PublicClient.getTransactionReceipt({
        hash: log.transactionHash,
      });

      // get Timestamp
      const block = await l1PublicClient.getBlock({
        blockNumber: log.blockNumber,
      });
      // console.log({block})
      const timestamp = block.timestamp * 1000n;

      logs[i] = {
        ...log,
        value: tx.value,
        time: new Date(+timestamp.toString()),
        timestamp,
        status: !tx.transactionIndex ? "pending" : receipt.status,
      };
    }
    return logs;
  };

  useEffect(() => {
    if (!address) return;
    // get RPC and current chain ID
    const addressConfig = opConfig?.l2chains[networkPair.l2.id];
    if (!addressConfig) return;

    getAllLogs().then((logs) => {
      setLogs(logs);
      setLoading(false);
    });
  }, [address]);

  return {
    depositLogs: logs,
    loading,
  };
}