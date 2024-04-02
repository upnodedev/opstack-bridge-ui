import ButtonStyled from "@components/ButtonStyled";
import { useIsNetworkUnsupported } from "@hooks/useIsNetworkUnsupported";
import { useSwitchNetworkDirection } from "@hooks/useSwitchNetworkPair";
import { NetworkPair, Token } from "@utils/opType";
import styled from "styled-components";
import { parseEther } from "viem";
import { useAccount } from "wagmi";

export type BridgeSubmitButtonProps = {
  // action: 'deposit' | 'withdrawal'
  amount?: string;
  networkPair: NetworkPair;
  selectedTokenPair: [Token, Token];
  validationError?: string;
  onSubmit?: () => void;
};

const BridgeDepositReviewButtonWrapper = styled.div``;

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
    <BridgeDepositReviewButtonWrapper>
      <div className="mt-4 w-full">
        <ButtonStyled className="w-full" disabled={false}>
          Review deposit
        </ButtonStyled>
      </div>

      <div className="mt-6">
        <div className="flex w-full justify-between">
          <span>Gas fee to transfer</span>
          <b>0.001082991121245616 ETH ($3.95)</b>
        </div>

        <div className="mt-2 flex w-full justify-between">
          <span>Time to transfer</span>
          <b>~1 minute</b>
        </div>
      </div>
    </BridgeDepositReviewButtonWrapper>
  );
}

export default BridgeDepositReviewButton;
