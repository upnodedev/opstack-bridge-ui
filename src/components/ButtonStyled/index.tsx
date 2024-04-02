import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const ButtonStyledWrapper = styled.div<{ theme: string; disabled: boolean }>`
  position: relative;

  overflow: hidden;
  transition: all 0.3s ease-in-out;
  * {
    color: white;
    text-align: center;
  }
  :hover {
    .overlay {
      ${({ theme }) => {
        return theme === "secondary"
          ? "transform: translateY(0);"
          : "transform: translateX(0);";
      }}
    }
  }
  button {
    width: 100%;
    padding: 1rem 0;
    position: relative;
    background-color: transparent;
    cursor: pointer;
  }
  .overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    transition: all 0.3s ease-in-out;
    top: 0;
    left: 0;
    transform: translateY(100%);
    ${({ theme, disabled }) => {
      return theme === "secondary"
        ? tw`bg-white bg-opacity-50`
        : tw`bg-white bg-opacity-50`;
    }}
    ${({ theme }) => {
      return theme === "secondary"
        ? "transform: translateY(101%);"
        : "transform: translateX(-101%);";
    }}
  }
`;

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  style?: React.CSSProperties;
  onClick?: (e: any) => any;
  children: React.ReactNode;
  disabled?: boolean;
  tone?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  loading?: any;
  color?: "primary" | "secondary" | string;
}

function ButtonStyled({
  className,
  disabled,
  onClick,
  style,
  color,
  children,
  type,
  loading,
  ...others
}: Props) {
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      console.log("enter press here! ");
    }
  };

  // console.log({ className });

  return (
    <ButtonStyledWrapper
      className={`relative w-full cursor-pointer overflow-hidden rounded-lg text-xl font-bold ${
        color ? `bg-${color}` : "bg-primary"
      }`}
      theme={color || "primary"}
      style={style}
      disabled={disabled || loading}
    >
      <button
        onClick={onClick}
        className={className || ""}
        disabled={disabled || loading}
        type={type}
        {...others}
      >
        {loading ? (
          <Icon
            icon={"mingcute:loading-fill"}
            className="mx-auto animate-spin"
          />
        ) : (
          children
        )}
        <div className="overlay"></div>
      </button>
    </ButtonStyledWrapper>
  );
}

export default ButtonStyled;
