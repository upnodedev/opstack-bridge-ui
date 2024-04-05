import BrideForm from "@components/Bridge/BrideForm";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";
import TransactionContainer from "@components/Transaction/TransactionContainer";
import { useAppDispatch } from "@states/hooks";
import { Connector, useAccount, useConfig, useConnect } from "wagmi";
import { useOPNetwork } from "@hooks/useOPNetwork";
import { NETWORKCONFIG } from "@providers/config";
import { useIsNetworkUnsupported } from "@hooks/useIsNetworkUnsupported";
import { useL1PublicClient } from "@hooks/useL1PublicClient";
import { useL2PublicClient } from "@hooks/useL2PublicClient";
import { NetworkType, Token } from "@utils/opType";
import { useOPTokens } from "@hooks/useOPTokens";
import BridgeReviewButton from "@components/Bridge/BridgeReviewButton";

interface Props extends SimpleComponent {}

const BridgeWrapper = styled.div``;

function BridgeDeposit(props: Props) {
  const [networkType, setNetworkType] = useState<NetworkType>(NETWORKCONFIG);
  const [amount, setAmount] = useState<string | undefined>(undefined);
  const dispatch = useAppDispatch();
  const [validationError, setValidationError] = useState<string | undefined>(
    undefined,
  );

  const onSubmit = useCallback(() => {
    setAmount(undefined)
    setValidationError(undefined)
  }, [setAmount, setValidationError])

  // new bie
  const config = useConfig();
  const [chainId, setChainId] = useState<number | undefined>();
  const [l1Balance, setL1Balance] = useState<bigint | undefined>(undefined);
  const [l2Balance, setL2Balance] = useState<bigint | undefined>(undefined);

  const { address } = useAccount();
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

  const { isUnsupported } = useIsNetworkUnsupported();
  const { connect, connectors } = useConnect();

  const { l1PublicClient } = useL1PublicClient({
    type: networkType,
    chainId: networkPair.l1.id,
  });
  const { l2PublicClient } = useL2PublicClient({
    type: networkType,
    chainId: networkPair.l2.id,
  });

  const onConnectWallet = useCallback(
    (connector: Connector) => {
      connect({ connector });
    },
    [connect],
  );

  const onNetworkTypeChange = useCallback(
    (type: NetworkType) => {
      setNetworkType(type);
      localStorage.clear();
    },
    [setNetworkType],
  );

  const onChangeNetwork = useCallback(
    (networkType: NetworkType) => {
      setChainId(undefined);
      onNetworkTypeChange(networkType);
    },
    [setChainId, onNetworkTypeChange],
  );

  useEffect(() => {
    if (!address) {
      return;
    }
    if (!l1PublicClient || !l2PublicClient) {
      return;
    }
    (async () => {
      console.log("l1PublicClient", l1PublicClient.chain);
      console.log("l2PublicClient", l2PublicClient.chain);
      const l1Balance = await l1PublicClient.getBalance({ address });
      const l2Balance = await l2PublicClient.getBalance({ address });
      setL1Balance(l1Balance);
      setL2Balance(l2Balance);
    })();
  }, [address, l1PublicClient, l2PublicClient, setL1Balance, setL2Balance]);

  const onTokenChange = useCallback(
    (l1Token: Token, l2Token: Token) => {
      setSelectedTokenPair([l1Token, l2Token]);
    },
    [setSelectedTokenPair],
  );

  return (
    <BridgeWrapper className="grid w-full grid-cols-5 gap-4 py-8">
      <div className="col-span-3">
        <div className="text-md flex gap-2">
          <Icon icon={"akar-icons:arrow-left"} />
          Start Over
        </div>
        <div className="mt-6">
          <div className="mb-6 flex w-full items-center justify-between">
            <b className="text-2xl">DEPOSIT</b>
          </div>
          <div className="rounded-xl border-[1px] border-gray-dark bg-white p-4">
            <BrideForm
              l1={l1}
              l2={l2}
              // action={action}
              amount={amount}
              // selectedToken={action === "deposit" ? l1Token : l2Token}
              selectedToken={l1Token}
              onTokenChange={onTokenChange}
              onAmountChange={(amount) => setAmount(amount)}
              onValidationError={(validationError) =>
                setValidationError(validationError)
              }
            />
            <div className="my-2 flex w-full justify-center">
              <Icon
                icon={"iconamoon:arrow-down-2-bold"}
                className="mx-auto text-3xl text-gray-dark"
              />
            </div>
            {/* <BrideTo {...propsList} /> */}
            <BridgeReviewButton
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
      <div className="col-span-2 px-6">
        <TransactionContainer status="Completed" />
      </div>
    </BridgeWrapper>
  );
}

export default BridgeDeposit;
