import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import CryptoSelect from "./CryptoSelect";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Token } from "@utils/opType";
import { Chain, parseEther } from "viem";
import { useAccount } from "wagmi";
import { useReadBalance } from "@hooks/useReadBalance";

interface Props extends SimpleComponent {
  l1: Chain;
  l2: Chain;
  // action: "deposit" | "withdrawal";
  amount?: string;
  selectedToken: Token;
  onTokenChange: (l1Token: Token, l2Token: Token) => void;
  onAmountChange: (amount: string) => void;
  onValidationError: (validationError: string) => void;
}

const BrideFormWrapper = styled.div``;

function BrideForm({
  l1,
  l2,
  amount,
  selectedToken,
  onTokenChange,
  onAmountChange,
  onValidationError,
}: Props) {
  const { address, isConnected } = useAccount();

  const balance = useReadBalance({
    // chain: action === "deposit" ? l1 : l2,
    chain: l1,
    selectedToken,
  });

  const validationError = useMemo<string>(() => {
    if (typeof amount === "undefined") {
      return "";
    }

    const bigAmount = parseEther(amount);
    if (balance && bigAmount > balance.data.value) {
      return "Insufficent Balance";
    }

    return "";
  }, [balance, amount]);

  useEffect(() => {
    onValidationError(validationError);
  }, [validationError, onValidationError]);

  return (
    <BrideFormWrapper>
      <div className="w-full rounded-xl bg-gray-light p-4 transition-all">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2">
            <Icon icon={"gg:arrow-up-o"} className="text-2xl" />
            <b className="text-lg">From</b>
          </div>

          {isConnected && (
            <div className="text-gray-medium">
              Bal :{" "}
              {!address || balance.isPending ? (
                <Icon icon={"line-md:loading-loop"} />
              ) : (
                balance.data.formatted
              )}
            </div>
          )}
        </div>
        {/*  */}

        <div className="mt-2 flex w-full justify-between">
          <CryptoSelect
            l1={l1}
            l2={l2}
            selectedToken={selectedToken}
            onTokenChange={onTokenChange}
          />
          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-dark">$300</span>
            <input
              className={`${validationError ? "outline-solid outline-red-500" : ""} 
              w-[180px] rounded-xl border-0 py-1 text-right text-2xl font-bold text-black outline-none`}
              placeholder="0.0"
              type="number"
              autoFocus={true}
              maxLength={80}
              min={0}
              onChange={(e) => onAmountChange(e.target.value)}
            />
            <b className="ml-2">{selectedToken.symbol}</b>
          </div>
        </div>
        <div className="mt-2 h-4 text-right text-red-500">
          {validationError}
        </div>
      </div>
    </BrideFormWrapper>
  );
}

export default BrideForm;
