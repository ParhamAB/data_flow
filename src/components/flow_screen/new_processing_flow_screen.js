import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Text } from "../../utils/widgets/widgets";
import TextField from "../../utils/text_field/text_field";
import DropDown from "../../utils/drop_down/drop_down";
import CustomButton from "../../utils/custom_button/custom_button";
import Theme from "../../theme/theme";
import { useDispatch, useSelector } from "react-redux";
import moment from "jalali-moment";
import CheckBox from "../../utils/check_box/check_box";

function NewFlowProcessScreen() {
  const dispatch = useDispatch();
  //   const eventProcessList = useSelector((state) => state.eventProcessListState);
  //   const eventStartTimesList = useSelector(
  //     (state) => state.eventStartTimesState
  //   );
  const [status, setStatus] = useState(null);
  const [title, setTitle] = useState("");
  const [startTimes, setStartTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  //   useEffect(() => {
  //     dispatch(getEventStartTimesListFunction());
  //     // eslint-disable-next-line
  //   }, []);

  //   useEffect(() => {
  //     setStartTimes([]);
  //     if (eventStartTimesList.eventStartTimesList.length > 0) {
  //       eventStartTimesList.eventStartTimesList.map((e) => {
  //         setStartTimes((oldArray) => [
  //           ...oldArray,
  //           {
  //             value: e.start_date_time.split("+")[0],
  //             label: persianDigits(
  //               moment(e.start_date_time).format("jYYYY/jMM/jDD") +
  //                 " - " +
  //                 moment(e.start_date_time).format("HH:mm")
  //             ),
  //           },
  //         ]);
  //       });
  //     }
  //     // eslint-disable-next-line
  //   }, [eventStartTimesList.eventStartTimesList]);

  return (
    <Container>
      <Text
        text={"عملیات رویداد - پردازش جدید"}
        fontSize="20px"
        fontWeight={700}
      ></Text>
      <SearchForm>
        <BoxContainer>
          <TextField
            label={"عنوان"}
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          ></TextField>
        </BoxContainer>
        <BoxContainer>
          <DropDown
            label={"ابتدای بازه"}
            isSearchable={true}
            defaultValue={""}
            value={[]}
            onChange={(value) => {}}
          />
        </BoxContainer>
        <BoxContainer>
          <DropDown
            label={"انتهای بازه"}
            isSearchable={true}
            defaultValue={""}
            value={[]}
            onChange={(value) => {}}
          />
        </BoxContainer>
        <BoxContainer>
          <DropDown
            label={"رویداد ها"}
            isSearchable={true}
            defaultValue={""}
            value={[]}
            onChange={(value) => {}}
          />
        </BoxContainer>
        <CheckBoxContainer
          onClick={() => {
            setIsChecked(!isChecked);
          }}
        >
          <CheckBox value={isChecked}></CheckBox>
          <CheckBoxLabel>
            <Text
              text={"مبتنی بر رویداد"}
              fontSize="16px"
              fontWeight={500}
            ></Text>
          </CheckBoxLabel>
        </CheckBoxContainer>
        <SliderContainer>
          <SliderLabel>{"آستانه شباهت"}</SliderLabel>
          <Slider type="range" min={0} max={10}></Slider>
        </SliderContainer>
      </SearchForm>
      <ButtonContainer>
        <ButtonInnerContainer>
          <CustomButton
            onClick={() => {}}
            label={"افزودن"}
            icon={<div style={{ fontSize: "20px" }}>+</div>}
          ></CustomButton>
        </ButtonInnerContainer>
      </ButtonContainer>
    </Container>
  );
}

export default NewFlowProcessScreen;

const Container = styled.div`
  /* height: calc(100% - 250px); */
  height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-inline: 40px;
  padding-top: 10px;
  overflow-y: auto;
`;

const SearchForm = styled.div`
  width: calc(100%);
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  background-color: ${Theme.backGroundColorGreyLight};
  box-sizing: border-box;
  padding-inline: 25px;
  padding-block: 15px;
  border-radius: ${Theme.textFieldBorderRadius};
`;

const BoxContainer = styled.div`
  width: 280px;
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-block: 50px;
`;

const ButtonContainer = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: transparent;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const ButtonInnerContainer = styled.div`
  width: 200px;
  box-sizing: border-box;
`;

const CheckBoxContainer = styled.div`
  width: 180px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block: 85px;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
`;

const CheckBoxLabel = styled.div`
  margin-right: 10px;
`;

const SliderContainer = styled.div`
  width: 230px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-block: 50px;
  margin-inline: 15px;
  padding-top: 10px;
`;

const SliderLabel = styled.div`
  color: ${Theme.fontColor};
  font-size: 18px;
  font-weight: 500;
  font-family: "iranSans";
`;

const Slider = styled.input`
  appearance: none;
  width: calc(100%);
  direction: ltr;
  margin-top: 20px;
  height: 5px;
  border-radius: ${Theme.textFieldBorderRadius};
  background-color: #ab72ff;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${Theme.purpleColorLight};
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${Theme.purpleColorLight};
    cursor: pointer;
  }
`;
