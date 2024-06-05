import BrideForm from "@components/Bridge/BrideForm";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";
import TransactionContainer from "@components/Transaction/TransactionContainer";
import { useConfig } from "wagmi";
import { useOPNetwork } from "@hooks/useOPNetwork";
import { useOPTokens } from "@hooks/useOPTokens";
import BridgeReviewButton from "@components/Bridge/BridgeReviewButton";
import { useNetworkConfig } from "@hooks/useNetworkConfig";
import { Token } from "@utils/opType";

const BridgeWrapper = styled.div``;

interface Props extends SimpleComponent {
  action: "deposit" | "withdrawal";
}

function BridgeDeposit({ action }: Props) {
  const { networkType, chainId } = useNetworkConfig();
  const [amount, setAmount] = useState<string | undefined>(undefined);
  const [validationError, setValidationError] = useState<string | undefined>(
    undefined,
  );

  const onSubmit = useCallback(() => {
    setAmount(undefined);
    setValidationError(undefined);
  }, [setAmount, setValidationError]);

  // new bie
  const config = useConfig();

  const { networkPair } = useOPNetwork({
    type: networkType,
    chainId: chainId ?? config.chains[0].id,
  });
  const { l1, l2 } = networkPair;

  const { ethToken: l1EthToken } = useOPTokens({ chainId: networkPair.l1.id });
  const { ethToken: l2EthToken } = useOPTokens({ chainId: networkPair.l2.id });
  const [selectedTokenPair, setSelectedTokenPair] = useState<[Token, Token]>([
    l1EthToken,
    l2EthToken,
  ]);

  const [l1Token, l2Token] = selectedTokenPair;

  const onTokenChange = useCallback(
    (l1Token: Token, l2Token: Token) => {
      setSelectedTokenPair([l1Token, l2Token]);
    },
    [setSelectedTokenPair],
  );

  return (
    <BridgeWrapper className="flex justify-center w-full py-8">
      <div className="w-[40rem]">
        <div className="text-md flex gap-2">
          <Icon icon={"akar-icons:arrow-left"} />
          Start Over
        </div>
        <div className="mt-6">
          <div className="mb-6 flex w-full items-center justify-between">
            <b className="text-2xl">{action.toUpperCase()}</b>
          </div>
          <div className="rounded-xl border-[1px] border-gray-dark bg-white p-4">
            <BrideForm
              l1={l1}
              l2={l2}
              action={action}
              amount={amount}
              selectedToken={action === "deposit" ? l1Token : l2Token}
              // selectedToken={l1Token}
              onTokenChange={onTokenChange}
              onAmountChange={(amount) => setAmount(amount)}
              onValidationError={(validationError) =>
                setValidationError(validationError)
              }
            />
            {/* <BrideTo {...propsList} /> */}
            <BridgeReviewButton
              action={action}
              amount={amount}
              networkPair={networkPair}
              selectedTokenPair={selectedTokenPair}
              validationError={validationError}
              onSubmit={onSubmit}
              networkType={networkType}
            />
          </div>
        </div>
      </div>
      {/* <div className="col-span-2 px-6">
        <TransactionContainer status="Completed" />
      </div> */}
    </BridgeWrapper>
  );
}

export default BridgeDeposit;
