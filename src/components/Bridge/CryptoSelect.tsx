import SearchBox from "@components/SearchBox";
import { TokenItemType, tokenList } from "@configs/tokenList";
import { Icon } from "@iconify/react";
import { useAppDispatch } from "@states/hooks";
import { ModalSlide } from "@states/modal/reducer";
import { Modal } from "antd";
import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

interface Props extends SimpleComponent {
  value: TokenItemType;
  onChange: (token: TokenItemType) => void;
  small?: boolean;
}

const CryptoSelectWrapper = styled.div``;

function CryptoSelect(props: Props) {
  const ref = useRef(null);
  const dispatch = useAppDispatch();

  const openCryptoModal = () => {
    dispatch(
      ModalSlide.actions.openModal({
        component: <CryptoSelectModal {...props} />,
      }),
    );
  };

  return (
    <CryptoSelectWrapper className="relative flex justify-center">
      <button
        onClick={openCryptoModal}
        className={`flex cursor-pointer items-center justify-center rounded-full bg-primary px-4 py-2 font-bold text-black transition-all hover:opacity-80 
        ${props.small ? "text-md" : "text-lg"}`}
      >
        <div
          className={`flex bg-white ${props.small ? "h-6 w-6" : "h-8 w-8"} items-center justify-center rounded-full p-1`}
        >
          <img
            src={`${props.value.image}`}
            alt="btc"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="mx-2 h-6 w-[1.5px] bg-white"></div>
        <span>{props.value.fullName.toUpperCase()}</span>
        <Icon icon={"akar-icons:chevron-down"} className="ml-2" />
      </button>
    </CryptoSelectWrapper>
  );
}

function CryptoSelectModal(props: Props) {
  const [search, setSearch] = useState("");
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

  const ItemOption = (
    token: TokenItemType,
    index: number,
    onClick: (token: TokenItemType) => void,
  ) => {
    return (
      <div
        key={token.name}
        className={`flex w-full cursor-pointer items-center border-b-[1px] border-transparent
         px-2 py-2 text-black hover:border-b-gray-dark hover:bg-gray-light
        ${props.small ? "text-lg" : "text-lg"}
        justify-between font-bold transition-all`}
      >
        <div className="flex items-center">
          <div
            className={`mr-4 flex bg-white ${props.small ? "h-8 w-8" : "h-8 w-8"} items-center justify-center rounded-full p-1`}
          >
            <img
              src={`${token.image}`}
              alt={token.name}
              className="h-full w-full object-contain"
            />
          </div>
          <span>{token.fullName.toUpperCase()}</span>
        </div>

        <p className="text-md text-gray-dark">0.11</p>
      </div>
    );
  };

  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
    >
      <div className="flex flex-col gap-4">
        <b className="text-2xl">Select Token</b>
        <SearchBox />

        <div className="w-full gap-1">
          {tokenList.map((token, index) => {
            return ItemOption(token, index, props.onChange);
          })}
        </div>
      </div>
    </Modal>
  );
}

export default CryptoSelect;
