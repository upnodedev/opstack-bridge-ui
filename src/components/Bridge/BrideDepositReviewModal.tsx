import ButtonStyled from "@components/ButtonStyled";
import { useAppDispatch } from "@states/hooks";
import { ModalSlide } from "@states/modal/reducer";
import { Modal } from "antd";
import { useState } from "react";

interface Props extends SimpleComponent {
  // value: string;
}

function BrideDepositReviewModal(props: Props) {
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOk = () => {
    closed();
  };

  const handleCancel = () => {
    closed();
  };

  const closed = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      dispatch(ModalSlide.actions.closeModal());
    }, 500);
  };

  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
    >
      <div className="flex flex-col gap-4">
        <b className="text-2xl">Deposit</b>

        <div className="">
          <span className="text-lg text-gray-dark">Routing</span>
          <div className="font-bold">Standard speed</div>
        </div>

        <div className="">
          <span className="text-lg text-gray-dark">Amount to deposit</span>
          <div className="flex w-full justify-between text-lg">
            <div className="font-bold">0.2 ETH</div>
            <div className="font-bold">$919.23</div>
          </div>
        </div>

        <div className="">
          <span className="text-lg text-gray-dark">Estimated time</span>
          <div className="font-bold">~ 10 minutes</div>
        </div>

        <div className="">
          <span className="text-lg text-gray-dark">Destination</span>
          <div className="font-bold">
            0x5FbDB2315678afecb367f032d93F642f64180aa3
          </div>
        </div>

        <div className="w-full">
              <ButtonStyled
                className="w-full"
                onClick={() => {}}
                disabled={false}
              >
                Confirm Deposit
              </ButtonStyled>
            </div>
      </div>
    </Modal>
  );
}

export default BrideDepositReviewModal;
