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
import { getPickDateFunction } from "../../redux/date_redux/pick_date_action";
import { persianDigits } from "../../utils/utils";
import { getEventProcessListFunction } from "../../redux/events_screen/get_event_process_redux/get_event_process_action";
import postNewFlowTaskService from "../../service/flow_process_screen/create_flow_process_service/create_flow_process_service.ts";

function NewFlowProcessScreen() {
  const dispatch = useDispatch();
  const DateTimesList = useSelector((state) => state.pickDateListState);
  const eventProcessList = useSelector((state) => state.eventProcessListState);

  //   const eventStartTimesList = useSelector(
  //     (state) => state.eventStartTimesState
  //   );
  const [status, setStatus] = useState(null);
  const [title, setTitle] = useState("");
  const [timesList, setTimesList] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [startTimes, setStartTimes] = useState(null);
  const [endTimes, setEndTimes] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [threshold, setThreshold] = useState(0.0);

  useEffect(() => {
    dispatch(getPickDateFunction());
    dispatch(
      getEventProcessListFunction("", "2000-01-01T00:00:00", "0", 0, 1000)
    );
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setTimesList([]);
    if (DateTimesList.dateList.length > 0) {
      DateTimesList.dateList.map((e) => {
        setTimesList((oldArray) => [
          ...oldArray,
          {
            value: e.created_at.split("+")[0],
            label: persianDigits(
              moment(e.created_at).format("jYYYY/jMM/jDD") +
                " - " +
                moment(e.created_at).format("HH:mm")
            ),
          },
        ]);
      });
    }
    // eslint-disable-next-line
  }, [DateTimesList.dateList]);

  useEffect(() => {
    setEventsList([]);
    if (eventProcessList.eventProcessList.length > 0) {
      eventProcessList.eventProcessList.map((e) => {
        setEventsList((oldArray) => [
          ...oldArray,
          {
            value: e.id_event_process,
            label:
              e.title +
              " از " +
              persianDigits(
                moment(e.start_date_time).format("jYYYY/jMM/jDD") +
                  " - " +
                  moment(e.start_date_time).format("HH:mm")
              ) +
              " تا " +
              persianDigits(
                moment(e.end_date_time).format("jYYYY/jMM/jDD") +
                  " - " +
                  moment(e.end_date_time).format("HH:mm")
              ),
          },
        ]);
      });
    }
    // eslint-disable-next-line
  }, [eventProcessList.eventProcessList]);

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
            defaultValue={startTimes}
            value={timesList}
            onChange={(value) => {
              setStartTimes(value);
            }}
          />
        </BoxContainer>
        <BoxContainer>
          <DropDown
            label={"انتهای بازه"}
            isSearchable={true}
            defaultValue={endTimes}
            value={timesList}
            onChange={(value) => {
              setEndTimes(value);
            }}
          />
        </BoxContainer>
        <BoxContainer>
          <DropDown
            label={"رویداد ها"}
            isSearchable={true}
            isDisabled={!isChecked}
            defaultValue={selectedEvent}
            value={eventsList}
            onChange={(value) => {
              setSelectedEvent(value);
            }}
          />
        </BoxContainer>
        <CheckBoxContainer
          onClick={() => {
            if (isChecked) {
              setSelectedEvent(null);
            }
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
          <Slider
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={threshold}
            onChange={(event) => {
              setThreshold(event.target.value);
            }}
          ></Slider>
        </SliderContainer>
      </SearchForm>
      <ButtonContainer>
        <ButtonInnerContainer>
          <CustomButton
            onClick={async () => {
              await postNewFlowTaskService(
                title,
                threshold,
                selectedEvent.value,
                startTimes.value,
                endTimes.value
              ).then((_) => {
                setStartTimes(null);
                setEndTimes(null);
                setSelectedEvent(null);
                setIsChecked(false);
                setThreshold(0.0);
                setTitle("");
              });
            }}
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
  position: relative;
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
