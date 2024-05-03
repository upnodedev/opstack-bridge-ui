import { portal2Abi } from "@abi/constant";
import ButtonStyled from "@components/ButtonStyled";
import { StatusChain } from "@components/Chain/StatusChain";
import TokenImg from "@components/TokenImg";
import { TransactionWithdrawalType } from "@hooks/Wallet/L2/useTransactionWithdrawETH";
import { useL1PublicClient } from "@hooks/useL1PublicClient";
import { useL2PublicClient } from "@hooks/useL2PublicClient";
import { useNetworkConfig } from "@hooks/useNetworkConfig";
import { useOPNetwork } from "@hooks/useOPNetwork";
import { useOPWagmiConfig } from "@hooks/useOPWagmiConfig";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContractFunctionRevertedError, formatUnits } from "viem";
import {
  GetGameErrorType,
  getWithdrawals,
  walletActionsL1,
} from "viem/op-stack";
import { useAccount } from "wagmi";
import { ReadContractErrorType, getWalletClient } from "wagmi/actions";

interface TransactionItemWithdrawalProps {
  data: TransactionWithdrawalType;
  txId: string;
  key: React.Key;
  price: number;
}

export const TransactionItemWithdrawal = ({
  txId,
  data,
  price,
}: TransactionItemWithdrawalProps) => {
  const { networkType, chainId } = useNetworkConfig();
  const { address } = useAccount();
  const { networkPair } = useOPNetwork({
    type: networkType,
    chainId: chainId,
  });
  const { l1, l2 } = networkPair;

  const L2NetworkExplorerUrl = l2.blockExplorers?.default.url;

  // console.log({ data });

  const getAmount = () => {
    const amount = data.value;

    if (!amount) return "0";

    const parsedAmount = formatUnits(amount, l1.nativeCurrency.decimals);
    return parsedAmount;
  };

  const getAmountUsdt = () => (+getAmount() * price).toFixed(2);

  const getTimeString = () => {
    return data.time.toLocaleString();
  };

  const { l1PublicClient } = useL1PublicClient({
    type: networkType,
    chainId: networkPair.l1.id,
  });
  const { l2PublicClient } = useL2PublicClient({
    type: networkType,
    chainId: networkPair.l2.id,
  });

  const { opConfig } = useOPWagmiConfig({
    type: networkType,
    chainId: chainId,
  });

  const prove = async () => {
    if (!opConfig) return;
    const L1walletClient = (
      await getWalletClient(opConfig, {
        chainId: l1PublicClient.chain.id,
      })
    ).extend(walletActionsL1());
    const { output, withdrawal } = await l1PublicClient.waitToProve({
      receipt: data.receipt,
      targetChain: l2PublicClient.chain,
      chain: undefined,
    });

    // 2. Build parameters to prove the withdrawal on the L2.
    const args = await l2PublicClient.buildProveWithdrawal({
      output,
      withdrawal,
      chain: l2PublicClient.chain,
    });

    // 3. Prove the withdrawal on the L1.
    const hash = await L1walletClient.proveWithdrawal(args);

    // 4. Wait until the prove withdrawal is processed.
    const receipt = await l1PublicClient.waitForTransactionReceipt({
      hash,
    });

    console.log({ receipt });
  };

  const finalize = async () => {
    if (!opConfig) return;
    const L1walletClient = (
      await getWalletClient(opConfig, {
        chainId: l1PublicClient.chain.id,
      })
    ).extend(walletActionsL1());

    // (Shortcut) Get withdrawals from receipt in Step 3.
    const [withdrawal] = getWithdrawals(data.receipt);

    // 1. Wait until the withdrawal is ready to finalize.
    await l1PublicClient.waitToFinalize({
      targetChain: l2PublicClient.chain,
      withdrawalHash: withdrawal.withdrawalHash,
      chain: undefined,
    });

    // 2. Finalize the withdrawal.
    const hash = await L1walletClient.finalizeWithdrawal({
      targetChain: l2PublicClient.chain,
      withdrawal,
    });

    // 3. Wait until the finalize withdrawal is processed.
    const receipt = await l1PublicClient.waitForTransactionReceipt({
      hash,
    });

    console.log({ receipt });
  };

  const LinkTxComponent = L2NetworkExplorerUrl ? (
    <Link
      to={`${L2NetworkExplorerUrl}/tx/${txId}`}
      target="_blank"
      rel="noreferrer noopener"
      className="flex gap-2 text-xs text-[#101828] no-underline hover:text-primary"
    >
      <div className="flex items-center gap-1">
        <div>Withdrawal</div>
      </div>
      <div className="border-l border-[#D0D5DD]"></div>
      <div className="flex items-center gap-1">
        <div>L2</div>
        <Icon icon="lucide:external-link" />
      </div>
    </Link>
  ) : (
    <div className="flex gap-2 text-xs text-[#101828] no-underline hover:text-primary">
      <div className="flex items-center gap-1">
        <div>Withdrawal</div>
      </div>
      <div className="border-l border-[#D0D5DD]"></div>
      <div className="flex items-center gap-1">
        <div>L1</div>
        <Icon icon="lucide:external-link" />
      </div>
    </div>
  );

  return (
    <div
      key={`Withdrawal-${txId}`}
      className="flex items-start gap-3 bg-white py-2"
    >
      <img src="/icon/arrow-circle-broken-up.svg" alt="" />
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full justify-between gap-3">
          <div>
            Withdrawal
            <span className="text-xs text-gray-500">{getTimeString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <h2 className="m-0">{getAmount()}</h2>
            <TokenImg name={l1.nativeCurrency.symbol} />
          </div>
        </div>
        <div className="flex w-full justify-between gap-3">
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <TokenImg name={l2.nativeCurrency.symbol} />

              <div className="text-xs">{l2.name}</div>
            </div>
            <Icon icon="lucide:chevron-right" />
            <div className="flex items-center gap-2">
              <TokenImg name={l1.nativeCurrency.symbol} />

              <div className="text-xs">{l1.name}</div>
            </div>
          </div>
          <div className="text-xs text-[#4C4E64AD]">${getAmountUsdt()}</div>
        </div>
        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex gap-2">
            <StatusChain status={data.status} />
            <StatusChain status={data.withdrawStatus} />
            {data.withdrawStatus === "ready-to-prove" && (
              <div
                onClick={prove}
                className="cursor pointer flex gap-2 rounded-full border border-yellow-600 bg-yellow-600 px-2 py-0.5 text-white"
              >
                Prove
              </div>
            )}

            {/* {data.withdrawStatus === "ready-to-finalize" && ( */}
            <div
              onClick={finalize}
              className="cursor pointer flex gap-2 rounded-full border border-yellow-600 bg-yellow-600 px-2 py-0.5 text-white"
            >
              Finalize
            </div>
            {/* )} */}
          </div>
          {LinkTxComponent}
        </div>
      </div>
    </div>
  );
};
