import React from "react";
import Select from "react-select";
import Theme from "../../theme/theme";
import styled from "styled-components";

function DropDown({
  width = "250px",
  value,
  onChange,
  isSearchable = false,
  label,
}) {
  return (
    <Container width={width}>
      <Label>{label}</Label>
      <Select
        options={value}
        isRtl
        isSearchable={isSearchable}
        onChange={onChange}
        placeholder={"انتخاب کنید..."}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            width: width,
            backgroundColor: "transparent",
            border: `1px solid ${Theme.fontColorInActive}`,
            borderColor: state.isFocused
              ? Theme.fontColor
              : Theme.fontColorInActive,
            ":hover": {
              border: `1px solid ${Theme.fontColor}`,
            },
            borderRadius: Theme.textFieldBorderRadius,
            boxShadow: "none",
            height: 50,
            zIndex: 10,
            cursor: "pointer",
          }),
        }}
      />
    </Container>
  );
}

export default DropDown;

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
