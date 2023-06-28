import React, { useRef } from "react";
import useRipple from "./use_ripple.tsx";
import Theme from "../../theme/theme.js";
import styled from "styled-components";

export default function CustomButton({
  width = "150px",
  label,
  onClick,
  icon,
  color = Theme.purpleColorLight,
}) {
  const ref = useRef(null);
  const ripples = useRipple(ref);

  return (
    <InputButton ref={ref} width={width} onClick={onClick} color={color}>
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
  background-color: ${(props) => props.color};
  color: ${Theme.fontColor};
  font-size: ${Theme.fontSize};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "iranSans" !important;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  font-weight: 500;
  border: 0px solid transparent;
  cursor: pointer;
  transition: 300ms;
  overflow: hidden;

  &:hover {
    background-color: ${(props) => props.color};
    box-shadow: ${(props) =>
        props.color === Theme.purpleColorLight ? "#6600ccb0" : "none"}
      0 3px 30px;
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
