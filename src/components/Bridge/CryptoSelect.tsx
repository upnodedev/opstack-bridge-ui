import { TokenItemType, tokenList } from "@configs/tokenList";
import { Icon } from "@iconify/react";
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
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const toggle = () => {
    setOpen(!open);
  };

  const ItemOption = (
    token: TokenItemType,
    index: number,
    onClick: (token: TokenItemType) => void,
  ) => {
    return (
      <li
        key={token.name}
        onClick={() => {
          onClick(token);
          toggle();
        }}
        className={`bg-gray-300 text-black hover:bg-primary fade-in flex 
        cursor-pointer items-center justify-center rounded-full px-4 py-2 
        ${props.small ? 'text-md' : 'text-lg'}
        font-bold transition-all`}
      >
        <div className={`bg-white mr-4 flex ${props.small ? 'h-6 w-6' : 'h-8 w-8'} items-center justify-center rounded-full p-1`}>
          <img
            src={`${token.image}`}
            alt={token.name}
            className="h-full w-full object-contain"
          />
        </div>
        <span>{token.fullName.toUpperCase()}</span>
      </li>
    );
  };

  return (
    <CryptoSelectWrapper className="relative flex justify-center">
      <button
        onClick={toggle}
        className={`bg-primary text-black flex cursor-pointer items-center justify-center rounded-full px-4 py-2 font-bold transition-all hover:opacity-80 
        ${props.small ? 'text-md' : 'text-lg'}`}
      >
        <div className={`bg-white flex ${props.small ? 'h-6 w-6' : 'h-8 w-8'} items-center justify-center rounded-full p-1`}>
          <img
            src={`${props.value.image}`}
            alt="btc"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="bg-white mx-2 h-6 w-[1.5px]"></div>
        <span>{props.value.fullName.toUpperCase()}</span>
        <Icon icon={"akar-icons:chevron-down"} className="ml-2" />
      </button>
      <CSSTransition in={open} timeout={300} classNames="fade" unmountOnExit>
        <ul className="absolute z-10 top-full mt-2 grid gap-2">
          {tokenList.map((token, index) => {
            return ItemOption(token, index, props.onChange);
          })}
        </ul>
      </CSSTransition>
    </CryptoSelectWrapper>
  );
}

export default CryptoSelect;
