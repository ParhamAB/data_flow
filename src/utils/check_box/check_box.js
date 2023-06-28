import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Theme from "../../theme/theme";

const animation = keyframes`
  0% {
    stroke-dasharray: 20;
    stroke-dashoffset: -20;
  }
  30% {
    stroke-dasharray: 20;
  }
  100% {
    stroke-dasharray: 0;
  }
`;

const CheckBoxInput = styled.input`
  width: 60px;
  height: 60px;
  background-color: transparent;
  border-radius: ${Theme.textFieldBorderRadius};
  appearance: none;
  position: absolute;
  top: -10px;
  left: -10px;
  cursor: pointer;

  &:checked {
    background-color: #6600cc93;
    transition: background-color 0.3s ease-in-out;
  }

  &:disabled {
    background-color: ${Theme.backGroundColorGrey};
  }
`;

const CheckMark = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-35%, -35%);
  width: 12px;
  height: 12px;
  fill: none;
  stroke: white;
  stroke-width: 7px;
  stroke-linecap: round;
  stroke-linejoin: round;
  visibility: hidden;
  scale: 1.5;

  ${CheckBoxInput}:checked + & {
    visibility: visible;
    animation: ${animation} 0.3s linear forwards;
  }

  ${CheckBoxInput}:disabled + & {
    visibility: visible;
  }
`;

const CheckBox = ({ value, onClick }) => {
  return (
    <Container onClick={onClick}>
      <CheckBoxInput type="checkbox" checked={value} />
      <CheckMark viewBox="0 0 24 24">
        <path d="M20 6L9 17l-5-5" />
      </CheckMark>
    </Container>
  );
};

export default CheckBox;

const Container = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid ${Theme.fontColorInActive};
  position: relative;
  border-radius: ${Theme.textFieldBorderRadius};
  overflow: hidden;
  box-sizing: border-box;
  padding: 0px;
  cursor: pointer;
  margin: 0px;
`;
