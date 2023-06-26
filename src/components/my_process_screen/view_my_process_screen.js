import React from "react";
import styled from "styled-components";
import { Text } from "../../utils/widgets/widgets";
import TextField from "../../utils/text_field/text_field";
import DropDown from "../../utils/drop_down/drop_down";
import CustomButton from "../../utils/custom_button/custom_button";
import ZoomIcon from "../../utils/icons/zoom_icon/zoom_icon";
import Theme from "../../theme/theme";

function ViewMyProcessScreen() {
  return (
    <Container>
      <Text text={"پردازش های من"} fontSize="20px" fontWeight={700}></Text>
      <SearchForm>
        <BoxContainer>
          <TextField label={"عنوان"}></TextField>
        </BoxContainer>
        <BoxContainer>
          <DropDown label={"تاریخ آغاز"} />
        </BoxContainer>
        <BoxContainer>
          <DropDown label={"نوع پردازش"} />
        </BoxContainer>
        <ButtonContainer>
          <CustomButton
            label={"جست و جو"}
            icon={<ZoomIcon color={"#ffffff"} />}
          ></CustomButton>
        </ButtonContainer>
      </SearchForm>
      <TableContainer>
        <HeaderTable>
          <HeaderText flex={1}>{"ردیف"}</HeaderText>
          <HeaderText flex={2}>{"عنوان پردازش"}</HeaderText>
          <HeaderText flex={1}>{"تاریخ آغاز"}</HeaderText>
          <HeaderText flex={2}>{"وضعیت"}</HeaderText>
          <HeaderText flex={1}>{"نوع پردازش"}</HeaderText>
          <HeaderText flex={1}>{"تاریخ ایجاد"}</HeaderText>
          <HeaderText flex={2}>{"ابزار"}</HeaderText>
        </HeaderTable>
        <ValueTable>
          <ValueText>
            <ValueText flex={1}>{"1"}</ValueText>
            <ValueText flex={2}>{"پردازش اولیه زیبا"}</ValueText>
            <ValueText flex={1}>{"05/05/1402\n21:15"}</ValueText>
            <ValueText flex={2}>{"در حال انجام"}</ValueText>
            <ValueText flex={1}>{"جریان رویداد"}</ValueText>
            <ValueText flex={1}>{"05/05/1402\n21:15"}</ValueText>
            <ValueText flex={2}>{"ابزار"}</ValueText>
          </ValueText>
        </ValueTable>
      </TableContainer>
    </Container>
  );
}

export default ViewMyProcessScreen;

const Container = styled.div`
  /* height: calc(100% - 250px); */
  max-height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-inline: 40px;
  padding-top: 10px;
  overflow-y: auto;
`;

const SearchForm = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const BoxContainer = styled.div`
  width: 280px;
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 280px;
  height: fit-content;
  padding-top: 35px;
  box-sizing: border-box;
`;

const TableContainer = styled.div`
  width: calc(100%);
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const HeaderTable = styled.div`
  width: calc(100%);
  height: 60px;
  background-color: ${Theme.backGroundColorGreyLight};
  border-radius: ${Theme.textFieldBorderRadius};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const HeaderText = styled.div`
  width: calc((100% / 10) * (${(props) => props.flex}));
  font-size: 15px;
  color: ${Theme.fontColorInActive};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ValueTable = styled.div`
  width: calc(100%);
  height: 60px;
  background-color: transparent;
  border: 1px solid ${Theme.fontColorInActive};
  border-radius: ${Theme.textFieldBorderRadius};
  box-sizing: border-box;
  margin-block: 16px;
`;

const ValueText = styled.div`
  width: calc((100% / 10) * (${(props) => props.flex}));
  height: 100%;
  font-size: 15px;
  color: ${Theme.fontColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;
