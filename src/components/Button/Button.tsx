import { Button, ButtonProps } from "antd";
import { ReactNode } from "react";
import styled from "styled-components";

interface Props extends ButtonProps {
  text: string | ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  color?: string;
  icon?: boolean;
  iconImage?: React.ReactNode;
  loading?: boolean;
}
const StyledButton = styled(Button)`
  background-color: ${(props) => props.color ?? "#2b3366"};
`;

function IsIcon(isIcon: boolean = false, iconImage: ReactNode) {
  if (isIcon) {
    return <span className="flex justify-center mr-2">{iconImage}</span>;
  }
}
function StyledAntDButton(props: Props) {
  return (
    <StyledButton
      type={props.type}
      onClick={props.onClick}
      className={props.className}
      color={props.color}
      style={props.style}
      disabled={props.disabled}
    >
      {/* <IconFont type={props.icon as string} /> */}
      <div className="flex justify-between">
        {IsIcon(props.icon, props.iconImage)}
        <span>{props.text}</span>
      </div>
    </StyledButton>
  );
}

export default StyledAntDButton;