import TransactionContainer from "@components/Transaction/TransactionContainer";
import { useState } from "react";
import styled from "styled-components";
import { useAccount } from "wagmi";

interface Props extends SimpleComponent {}

const TransactionPageWrapper = styled.div``;

type Action = "deposit" | "withdrawal";

function TransactionPage(props: Props) {
  const { address } = useAccount();
  const [action, setAction] = useState<Action>("withdrawal");

  const onClickAction = (action: Action) => () => {
    setAction(action);
  };
  return (
    <TransactionPageWrapper>
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border-[1.5px] border-primary bg-white py-4">
          <div className="w-full rounded-xl p-6">
            <i className="text-xl">Account</i>
            <div className="text-lg">{address}</div>
          </div>

          {/* selection action */}
          <div className="mt-2 w-full">
            <div className="grid grid-cols-2 items-center text-center text-xl">
              <div
                className={`cursor-pointer border-y-2 border-primary py-2 transition-all ${
                  action === "deposit" ? "bg-primary" : "bg-transparent"
                }`}
                onClick={onClickAction("deposit")}
              >
                Deposit
              </div>

              <div
                className={`cursor-pointer border-y-2 border-primary py-2 transition-all ${
                  action === "withdrawal" ? "bg-primary" : "bg-transparent"
                }`}
                onClick={onClickAction("withdrawal")}
              >
                Withdrawal
              </div>
            </div>
          </div>
          {/* end of actions */}

          <TransactionContainer action={action}/>
        </div>
      </div>
    </TransactionPageWrapper>
  );
}

export default TransactionPage;
