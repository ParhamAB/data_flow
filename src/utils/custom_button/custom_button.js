import React, { useRef } from "react";
import useRipple from "./use_ripple.tsx";
import Theme from "../../theme/theme.js";
import styled from "styled-components";

export default function CustomButton({
  width = "150px",
  label,
  onClick,
  icon,
}) {
  const ref = useRef(null);
  const ripples = useRipple(ref);

  return (
    <InputButton ref={ref} width={width} onClick={onClick}>
      {ripples}
      <Container>
        {icon}
        <Item>{label}</Item>
      </Container>
    </InputButton>
  );
}

const InputButton = styled.button`
  position: relative;
  width: ${(props) => props.width};
  height: 50px;
  border-radius: ${Theme.textFieldBorderRadius};
  background-color: ${Theme.purpleColorLight};
  color: ${Theme.fontColor};
  font-size: ${Theme.fontSize};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "IranSans" !important;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  font-weight: 500;
  border: 0px solid transparent;
  cursor: pointer;
  transition: 300ms;
  overflow: hidden;

  &:hover {
    background-color: ${Theme.purpleColorLight};
    box-shadow: rgb(19 28 233 / 50%) 0 1px 15px;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${Theme.fontColor};
  font-size: ${Theme.fontSize};
`;

const Item = styled.div`
  margin-right: 7px;
`;
