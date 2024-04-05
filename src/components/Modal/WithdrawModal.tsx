import { useAppDispatch } from "@states/hooks";
import { ModalSlide } from "@states/modal/reducer";
import { Button, Modal } from "antd";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface Props extends SimpleComponent {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function WithdrawModal({ children, isOpen, setIsOpen }: Props) {
  const dispatch = useAppDispatch();

  const handleOk = () => {
    closed();
  };

  const handleCancel = () => {
    closed();
  };

  const closed = () => {
    setIsOpen(false);
    setTimeout(() => {
      dispatch(ModalSlide.actions.closeModal());
    }, 500);
  };

  return (
    <Modal
      className="font-['Inter']"
      title={
        <>
          <div>Withdraw</div>
          <div className="text-sm font-normal">
            This usually takes{" "}
            <span className="font-bold text-[#FF0420]">7 days</span> Bridge any
            token to Ethereum Mainnet
          </div>
        </>
      }
      open={isOpen}
      footer={[
        <div className="flex gap-3">
          <Button key="back" onClick={handleCancel} className="px-3.5">
            Other bridge
          </Button>
          <Button
            onClick={handleCancel}
            className="w-full border border-primary bg-primary px-3.5"
          >
            Initiate withdrawal
          </Button>
        </div>,
      ]}
    >
      {children}
    </Modal>
  );
}

export default WithdrawModal;
