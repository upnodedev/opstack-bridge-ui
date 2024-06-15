import ButtonStyled from "@components/ButtonStyled";
import { useIsNetworkUnsupported } from "@hooks/useIsNetworkUnsupported";
import { useSwitchNetworkDirection } from "@hooks/useSwitchNetworkPair";
import { NetworkPair, NetworkType, Token } from "@utils/opType";
import styled from "styled-components";
import { Chain, parseEther } from "viem";
import { useAccount } from "wagmi";
import BridgeReviewDeposit from "./BridgeReviewDeposit";
import { Icon } from "@iconify/react/dist/iconify.js";
import BridgeReviewWithdraw from "./BridgeReviewWithdraw";

export type BridgeSubmitButtonProps = {
  action: "deposit" | "withdrawal";
  amount?: string;
  networkPair: NetworkPair;
  selectedTokenPair: [Token, Token];
  validationError?: string;
  onSubmit?: () => void;
};

function BridgeDepositReviewButton({
  action,
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

  if (action === "deposit" && networkPair.l1.id !== chain?.id) {
    return (
      <ButtonStyled onClick={() => switchToL1()}>
        Switch to {networkPair.l1.name}
      </ButtonStyled>
    );
  }

  if (action === "withdrawal" && networkPair.l2.id !== chain?.id) {
    return (
      <ButtonStyled onClick={() => switchToL2()}>
        Switch to {networkPair.l2.name}
      </ButtonStyled>
    );
  }

  if (action === "deposit")
    return (
      <div>
        <div className="my-2 flex w-full justify-center">
          <Icon
            icon={"iconamoon:arrow-down-2-bold"}
            className="mx-auto text-3xl text-gray-dark"
          />
        </div>
        <BridgeReviewDeposit
          l1={networkPair.l1 as Chain}
          l2={networkPair.l2 as Chain}
          amount={amount ?? "0"}
          disabled={shouldDisableReview}
          selectedTokenPair={selectedTokenPair}
          onSubmit={onSubmit}
        />
      </div>
    );

  return (
    <div>
      <div className="my-2 flex w-full justify-center">
        <Icon
          icon={"iconamoon:arrow-down-2-bold"}
          className="mx-auto text-3xl text-gray-dark"
        />
      </div>
      <BridgeReviewWithdraw
        l1={networkPair.l1 as Chain}
        l2={networkPair.l2 as Chain}
        amount={amount ?? "0"}
        disabled={shouldDisableReview}
        selectedTokenPair={selectedTokenPair}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default BridgeDepositReviewButton;
