import React from "react";
import styled from "styled-components";
import Theme from "../../theme/theme";

function TextField({ width = "250px", label, onChange, value }) {
  return (
    <Container width={width}>
      <Label>{label}</Label>
      <InputTextField
        type="text"
        onChange={onChange}
        value={value}
      ></InputTextField>
    </Container>
  );
}

export default TextField;

const Container = styled.div`
  width: ${(props) => props.width};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Label = styled.div`
  width: 100%;
  height: 30px;
  font-size: ${Theme.fontSize};
  color: ${Theme.fontColor};
  margin-bottom: 5px;
  padding-right: 5px;
`;

const InputTextField = styled.input`
  width: 100%;
  height: 50px;
  border-radius: ${Theme.textFieldBorderRadius};
  background-color: transparent;
  color: ${Theme.fontColor};
  font-size: ${Theme.fontSize};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-right: 10px;
  padding-left: 10px;
  font-family: "iranSans" !important;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  font-weight: 500;
  border: 1px solid ${Theme.fontColorInActive};
  cursor: pointer;

  &:focus,
  &:hover {
    border: 1px solid ${Theme.fontColor};
  }
`;
