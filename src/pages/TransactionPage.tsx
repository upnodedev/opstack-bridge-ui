import TransactionContainer from "@components/Transaction/TransactionContainer";
import { capitalizeFirstLetter } from "@utils/utils";
import { useState } from "react";
import styled from "styled-components";
import { useAccount } from "wagmi";

interface Props extends SimpleComponent {}

const TransactionPageWrapper = styled.div``;

type Action = "deposit" | "withdrawal" | "all";

function TransactionPage(props: Props) {
  const [action, setAction] = useState<Action>("withdrawal");

  const onClickAction = (action: Action) => () => {
    setAction(action);
  };

  const actionList: Action[] = ["all", "deposit", "withdrawal"];

  return (
    <TransactionPageWrapper>
      <div className="mx-auto max-w-3xl">
        <div className="py-4">
          <div className="mb-4 w-full">
            <b className="text-xl">Transactions</b>
          </div>

          {/* selection action */}
          <div className="mt-2 w-full">
            <div className="grid grid-cols-3 items-center gap-4 text-center text-xl">
              {actionList.map((item, index) => (
                <div
                  key={`action-${index}`}
                  className={`cursor-pointer rounded py-2 transition-all hover:bg-primary hover:text-black ${
                    action === item
                      ? "bg-primary bg-opacity-80"
                      : "bg-transparent text-gray-medium"
                  }`}
                  onClick={onClickAction(item)}
                >
                  {capitalizeFirstLetter(item)}
                </div>
              ))}
            </div>
          </div>
          {/* end of actions */}
          <div className="mt-4 w-full rounded-md bg-white p-4 border-gray-light border-[1px]">
            <div className="w-full grid grid-cols-4 py-4 border-b-[1px] border-b-gray-dark">
              <div className="col-span-2">
                Transaction Status
              </div>
              <div>
                From
              </div>
              <div>
                To
              </div>
            </div>
            <TransactionContainer action={action} />
          </div>
        </div>
      </div>
    </TransactionPageWrapper>
  );
}

export default TransactionPage;
