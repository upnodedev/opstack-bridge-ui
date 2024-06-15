import { l2StandardBridgeABI, portal2Abi } from "@abi/constant";
import {
  l1PublicClientType,
  useL1PublicClient,
} from "@hooks/useL1PublicClient";
import {
  l2PublicClientType,
  useL2PublicClient,
} from "@hooks/useL2PublicClient";
import { useOPNetwork } from "@hooks/useOPNetwork";
import { useOPWagmiConfig } from "@hooks/useOPWagmiConfig";
import { AddressType } from "@types";
import {
  validateL2Chain,
  validateL2StandardBridgeContract,
} from "@utils/validateChains";
import { useEffect, useState } from "react";
import {
  ChainContract,
  ContractFunctionRevertedError,
  ReadContractErrorType,
  TransactionReceipt,
  decodeEventLog,
  parseAbiItem,
} from "viem";
import { GetGameErrorType, getWithdrawals } from "viem/op-stack";
import { useAccount, useChainId } from "wagmi";

export type TransactionWithdrawalTopicType = {
  amount: bigint;
  extraData: string;
  l1Token: AddressType;
  l2Token: AddressType;
  to: AddressType;
};

export type TransactionWithdrawalType = {
  address: string;
  blockNumber: number;
  transactionHash: string;
  topics: {
    eventName: string;
    args: TransactionWithdrawalTopicType;
  };
  value?: bigint;
  time: Date;
  timestamp?: any;
  withdrawStatus?:
    | "waiting-to-prove"
    | "ready-to-prove"
    | "waiting-to-finalize"
    | "ready-to-finalize"
    | "finalized"
    | "unknown";
  status?: "success" | "reverted" | "pending";
  receipt: TransactionReceipt;
};

export default function useTransactionWithdrawETH() {
  const [logs, setLogs] = useState<TransactionWithdrawalType[]>([]);
  const [loading, setLoading] = useState(true);
  const chainId = useChainId();
  const { opConfig } = useOPWagmiConfig();

  const { networkPair } = useOPNetwork();

  const { address } = useAccount();
  const { l1PublicClient } = useL1PublicClient();
  const { l2PublicClient } = useL2PublicClient();
  const l1ChainId = networkPair.l1.id;
  const l2Chain = networkPair.l2;

  const getLogs = async (currentBlock: bigint) => {
    // console.log({ currentBlock })
    const addressConfig = opConfig?.l2chains[networkPair.l2.id];
    if (!addressConfig) return [];

    const L2StandardBridge = validateL2StandardBridgeContract(l2Chain).address;
    // console.log({ L2StandardBridge });

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
        return l2PublicClient.getLogs({
          address: L2StandardBridge,
          event: parseAbiItem(
            "event WithdrawalInitiated(address indexed l1Token, address indexed l2Token, address indexed from, address to, uint256 amount, bytes extraData)",
          ),
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
        abi: l2StandardBridgeABI,
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
    const currentBlock = await l2PublicClient.getBlockNumber();
    // const currentBlock = 5000000n

    const allTime = currentBlock / (10000n * 100n) + 1n;

    const logsArrayAll: any[][] = [];

    console.log({ currentBlock, allTime });

    for (let i = 0; i < allTime; i++) {
      // console.log({ i })
      const logsArray = await getLogs(currentBlock - BigInt(i) * 10000n * 100n);
      // console.log({ logsArray });
      // sleep 0.2s
      logsArrayAll.push(logsArray);
      await new Promise((r) => setTimeout(r, 200));
      console.log(`${i} done ${logsArray.length}`);
      // if (logsArray.length > 0) break;
    }

    const logs = logsArrayAll.flat();

    // get Transaction Info
    for (let i = 0; i < logs.length; i++) {
      const log = logs[i];
      const tx = await l2PublicClient.getTransaction({
        hash: log.transactionHash,
      });

      // get Timestamp
      const block = await l2PublicClient.getBlock({
        blockNumber: log.blockNumber,
      });
      // console.log({block})
      const timestamp = block.timestamp * 1000n;

      // get status
      const receipt = await l2PublicClient.getTransactionReceipt({
        hash: log.transactionHash,
      });

      const getStatus = async () => {
        if (!opConfig) return;
        const portalAddress =
          l2PublicClient.chain.contracts.portal[l1PublicClient.chain.id]
            .address;

        const [withdrawal] = getWithdrawals(receipt);

        const disputeGameResult = await l1PublicClient
          .getGame({
            l2BlockNumber: receipt.blockNumber,
            targetChain: l2PublicClient.chain,
            chain: undefined,
          })
          .catch((err) => {
            const error = err.reason as GetGameErrorType;
            if (error.name === "GameNotFoundError") return "waiting-to-prove";
            return "rejected";
          });

        const checkWithdrawalResult = await l1PublicClient
          .readContract({
            abi: portal2Abi,
            address: portalAddress,
            functionName: "checkWithdrawal",
            args: [receipt.transactionHash, address as `0x${string}`],
          })
          .catch((err) => {
            const error = err as ReadContractErrorType;
            if (error.cause instanceof ContractFunctionRevertedError) {
              const errorMessage = error.cause.data?.args?.[0];
              if (
                errorMessage ===
                  "OptimismPortal: withdrawal has not been proven yet" ||
                errorMessage ===
                  "OptimismPortal: withdrawal has not been proven by proof submitter address yet"
              ) {
                return "ready-to-prove";
              }
              if (
                errorMessage ===
                  "OptimismPortal: proven withdrawal has not matured yet" ||
                errorMessage ===
                  "OptimismPortal: output proposal has not been finalized yet" ||
                errorMessage === "OptimismPortal: output proposal in air-gap"
              ) {
                return "waiting-to-finalize";
              }

              return "rejected";
            }
          });

        const finalizedResult = await l1PublicClient
          .readContract({
            abi: portal2Abi,
            address: portalAddress,
            functionName: "finalizedWithdrawals",
            args: [withdrawal.withdrawalHash],
          })
          .catch(() => {
            return "rejected";
          });

        // finalizedResult
        if (finalizedResult || finalizedResult === "fulfilled") {
          return "finalized";
        }

        // disputeGameResult
        if (disputeGameResult === "waiting-to-prove") {
          return "waiting-to-prove";
        }
        if (disputeGameResult === "rejected") {
          return "unknown";
        }

        // checkWithdrawalResult
        if (
          checkWithdrawalResult === "ready-to-prove" ||
          checkWithdrawalResult === "waiting-to-finalize"
        ) {
          return checkWithdrawalResult;
        }
        if (checkWithdrawalResult === "rejected") {
          return "unknown";
        }

        if (finalizedResult === "rejected") {
          return "unknown";
        }

        return "ready-to-finalize";
      };

      logs[i] = {
        ...log,
        value: tx.value,
        time: new Date(+timestamp.toString()),
        timestamp,
        status: !tx.transactionIndex ? "pending" : receipt.status,
        withdrawStatus: await getStatus(),
        receipt,
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
    withdrawLogs: logs,
    loading,
  };
}

export const getStatus = async (
  l1PublicClient: l1PublicClientType,
  l2PublicClient: l2PublicClientType,
  receipt: TransactionReceipt,
  address: AddressType,
) => {
  console.log({
    l1PublicClient,
    l2PublicClient,
  });
  console.log({ t: l1PublicClient.chain.id });
  const portalAddress =
    l2PublicClient.chain.contracts.portal[l1PublicClient.chain.id].address;

  console.log({ portalAddress });

  const [withdrawal] = getWithdrawals(receipt);

  try {
    const portalVersion = await l1PublicClient.readContract({
      abi: portal2Abi,
      address: portalAddress,
      functionName: "version",
    });
    console.log({ portalVersion });
  } catch (err) {
    console.log("errrrr", err);
  }

  // const disputeGameResult = await l1PublicClient
  //   .getGame({
  //     l2BlockNumber: receipt.blockNumber,
  //     targetChain: l2PublicClient.chain,
  //     chain: undefined,
  //   })
  //   .catch((err) => {
  //     const error = err.reason as GetGameErrorType;
  //     if (error.name === "GameNotFoundError") return "waiting-to-prove";
  //     return "rejected";
  //   });

  // const checkWithdrawalResult = await l1PublicClient
  //   .readContract({
  //     abi: portal2Abi,
  //     address: portalAddress,
  //     functionName: "checkWithdrawal",
  //     args: [receipt.transactionHash, address as `0x${string}`],
  //   })
  //   .catch((err) => {
  //     const error = err as ReadContractErrorType;
  //     if (error.cause instanceof ContractFunctionRevertedError) {
  //       const errorMessage = error.cause.data?.args?.[0];
  //       if (
  //         errorMessage ===
  //           "OptimismPortal: withdrawal has not been proven yet" ||
  //         errorMessage ===
  //           "OptimismPortal: withdrawal has not been proven by proof submitter address yet"
  //       ) {
  //         return "ready-to-prove";
  //       }
  //       if (
  //         errorMessage ===
  //           "OptimismPortal: proven withdrawal has not matured yet" ||
  //         errorMessage ===
  //           "OptimismPortal: output proposal has not been finalized yet" ||
  //         errorMessage === "OptimismPortal: output proposal in air-gap"
  //       ) {
  //         return "waiting-to-finalize";
  //       }

  //       return "rejected";
  //     }
  //   });

  // const finalizedResult = await l1PublicClient
  //   .readContract({
  //     abi: portal2Abi,
  //     address: portalAddress,
  //     functionName: "finalizedWithdrawals",
  //     args: [withdrawal.withdrawalHash],
  //   })
  //   .catch(() => {
  //     return "rejected";
  //   });

  // // finalizedResult
  // if (finalizedResult || finalizedResult === "fulfilled") {
  //   return "finalized";
  // }

  // // disputeGameResult
  // if (disputeGameResult === "waiting-to-prove") {
  //   return "waiting-to-prove";
  // }
  // if (disputeGameResult === "rejected") {
  //   return "unknown";
  // }

  // // checkWithdrawalResult
  // if (
  //   checkWithdrawalResult === "ready-to-prove" ||
  //   checkWithdrawalResult === "waiting-to-finalize"
  // ) {
  //   return checkWithdrawalResult;
  // }
  // if (checkWithdrawalResult === "rejected") {
  //   return "unknown";
  // }

  // if (finalizedResult === "rejected") {
  //   return "unknown";
  // }

  return "ready-to-finalize";
};
