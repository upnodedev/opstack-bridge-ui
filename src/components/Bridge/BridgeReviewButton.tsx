import ButtonStyled from "@components/ButtonStyled";
import { useIsNetworkUnsupported } from "@hooks/useIsNetworkUnsupported";
import { useSwitchNetworkDirection } from "@hooks/useSwitchNetworkPair";
import { NetworkPair, NetworkType, Token } from "@utils/opType";
import styled from "styled-components";
import { Chain, parseEther } from "viem";
import { useAccount } from "wagmi";
import BridgeReviewDeposit from "./BridgeReviewDeposit";

export type BridgeSubmitButtonProps = {
  // action: 'deposit' | 'withdrawal'
  amount?: string;
  networkPair: NetworkPair;
  selectedTokenPair: [Token, Token];
  validationError?: string;
  onSubmit?: () => void;
  networkType?: NetworkType;
};

function BridgeDepositReviewButton({
  // action,
  amount,
  networkPair,
  selectedTokenPair,
  validationError,
  onSubmit,
}: BridgeSubmitButtonProps) {
  const { chain } = useAccount();
  const { isUnsupported } = useIsNetworkUnsupported();
  const { switchNetworkPair: switchToL1 } = useSwitchNetworkDirection({
    networkPair,
    direction: "l1",
  });
  const { switchNetworkPair: switchToL2 } = useSwitchNetworkDirection({
    networkPair,
    direction: "l2",
  });

  const shouldDisableReview =
    parseEther(amount ?? "0") <= 0 || !!validationError;

  if (isUnsupported) {
    return (
      <ButtonStyled color="red" disabled>
        Unsupported Network
      </ButtonStyled>
    );
  }

  if (!chain) {
    return <ButtonStyled disabled={true}>Connect Wallet</ButtonStyled>;
  }

  if (networkPair.l1.id !== chain?.id) {
    return (
      <ButtonStyled onClick={() => switchToL1()}>
        Switch to {networkPair.l1.name}
      </ButtonStyled>
    );
  }

  // if (action === "withdrawal" && networkPair.l2.id !== chain?.id) {
  //   return (
  //     <Button onClick={() => switchToL2()}>
  //       Switch to {networkPair.l2.name}
  //     </Button>
  //   );
  // }

  return (
    <BridgeReviewDeposit
      l1={networkPair.l1 as Chain}
      l2={networkPair.l2 as Chain}
      amount={amount ?? "0"}
      disabled={shouldDisableReview}
      selectedTokenPair={selectedTokenPair}
      onSubmit={onSubmit}
    />
  );
}

export default BridgeDepositReviewButton;
