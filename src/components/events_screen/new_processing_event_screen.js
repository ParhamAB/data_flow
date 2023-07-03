import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Text } from "../../utils/widgets/widgets";
import TextField from "../../utils/text_field/text_field";
import DropDown from "../../utils/drop_down/drop_down";
import CustomButton from "../../utils/custom_button/custom_button";
import ZoomIcon from "../../utils/icons/zoom_icon";
import Theme from "../../theme/theme";
import { useDispatch, useSelector } from "react-redux";
import moment from "jalali-moment";
import { Filter } from "@mui/icons-material";
import FilterIcon from "../../utils/icons/filter_icon";
import { persianDigits } from "../../utils/utils";
import { getPickDateFunction } from "../../redux/date_redux/pick_date_action";
import postNewEventTaskService from "../../service/event_process_screen/create_event_service/create_event_process_service.ts";

function NewEventProcessScreen() {
  const dispatch = useDispatch();
  const DateTimesList = useSelector((state) => state.pickDateListState);
  const [title, setTitle] = useState("");
  const [timesList, setTimesList] = useState([]);
  const [startTimes, setStartTimes] = useState(null);
  const [endTimes, setEndTimes] = useState(null);
  const [maxDf, setMaxDf] = useState(0);
  const [windowsType, setWindowsType] = useState(null);
  const [numberWindowsType, setNumberWindowsType] = useState(0);
  const [deletePercent, setDeletePercent] = useState(0);
  const [lang, setLang] = useState(null);
  const [eventNumber, setEventNumber] = useState(0);
  const [lowestNumberProcess, setLowestNumberProcess] = useState(0);
  const [diffEvents, setDiffEvents] = useState(0);
  const [numberWords, setNumberWords] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getPickDateFunction());
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
            label={"واحد پنجره زمان بندی"}
            isSearchable={true}
            defaultValue={windowsType}
            value={[
              { label: "هفته", value: "weeks" },
              { label: "روز", value: "days" },
              { label: "ساعت", value: "hours" },
              { label: "دقیقه", value: "minutes" },
            ]}
            onChange={(value) => {
              setWindowsType(value);
            }}
          />
        </BoxContainer>
        <IntValueContainer>
          <IntValuelabel>{"تعداد پنجره های زمانبندی"}</IntValuelabel>
          <IntValueButtonContainer>
            <IntValueButton
              onClick={() => {
                if (numberWindowsType < 100) {
                  setNumberWindowsType(numberWindowsType + 1);
                }
              }}
            >
              +
            </IntValueButton>
            <IntValue>{persianDigits(numberWindowsType)}</IntValue>
            <IntValueButton
              onClick={() => {
                if (numberWindowsType > 0) {
                  setNumberWindowsType(numberWindowsType - 1);
                }
              }}
            >
              -
            </IntValueButton>
          </IntValueButtonContainer>
        </IntValueContainer>

        {isOpen ? (
          [
            <BoxContainer>
              <DropDown
                label={"زبان"}
                isSearchable={true}
                defaultValue={lang}
                value={[
                  { label: "دو زبانه", value: "multilingual" },
                  { label: "فارسی", value: "fa" },
                  { label: "انگلیسی", value: "en" },
                ]}
                onChange={(value) => {
                  setLang(value);
                }}
              />
            </BoxContainer>,
            <IntValueContainer>
              <IntValuelabel>
                {"حذف عبارت پردازشی بیش از این درصد"}
              </IntValuelabel>
              <IntValueButtonContainer>
                <IntValueButton
                  onClick={() => {
                    if (maxDf < 100) {
                      setMaxDf(maxDf + 1);
                    }
                  }}
                >
                  +
                </IntValueButton>
                <IntValue>{persianDigits(maxDf)}</IntValue>
                <IntValueButton
                  onClick={() => {
                    if (maxDf > 0) {
                      setMaxDf(maxDf - 1);
                    }
                  }}
                >
                  -
                </IntValueButton>
              </IntValueButtonContainer>
            </IntValueContainer>,
            <IntValueContainer>
              <IntValuelabel>{"تعداد رویداد های قابل استخراج"}</IntValuelabel>
              <IntValueButtonContainer>
                <IntValueButton
                  onClick={() => {
                    if (eventNumber < 100) {
                      setEventNumber(eventNumber + 1);
                    }
                  }}
                >
                  +
                </IntValueButton>
                <IntValue>{persianDigits(eventNumber)}</IntValue>
                <IntValueButton
                  onClick={() => {
                    if (eventNumber > 0) {
                      setEventNumber(eventNumber - 1);
                    }
                  }}
                >
                  -
                </IntValueButton>
              </IntValueButtonContainer>
            </IntValueContainer>,
            <IntValueContainer>
              <IntValuelabel>{"حداقل پیام شامل عبارت پردازشی"}</IntValuelabel>
              <IntValueButtonContainer>
                <IntValueButton
                  onClick={() => {
                    if (lowestNumberProcess < 100) {
                      setLowestNumberProcess(lowestNumberProcess + 1);
                    }
                  }}
                >
                  +
                </IntValueButton>
                <IntValue>{persianDigits(lowestNumberProcess)}</IntValue>
                <IntValueButton
                  onClick={() => {
                    if (lowestNumberProcess > 0) {
                      setLowestNumberProcess(lowestNumberProcess - 1);
                    }
                  }}
                >
                  -
                </IntValueButton>
              </IntValueButtonContainer>
            </IntValueContainer>,
            <IntValueContainer>
              <IntValuelabel>{"میزان اختلاف بین رویداد ها"}</IntValuelabel>
              <IntValueButtonContainer>
                <IntValueButton
                  onClick={() => {
                    if (diffEvents < 100) {
                      setDiffEvents(diffEvents + 1);
                    }
                  }}
                >
                  +
                </IntValueButton>
                <IntValue>{persianDigits(diffEvents)}</IntValue>
                <IntValueButton
                  onClick={() => {
                    if (diffEvents > 0) {
                      setDiffEvents(diffEvents - 1);
                    }
                  }}
                >
                  -
                </IntValueButton>
              </IntValueButtonContainer>
            </IntValueContainer>,
            <IntValueContainer>
              <IntValuelabel>
                {"مدل آموزش دیده مورد استفاده جهت استخراج رویداد"}
              </IntValuelabel>
              <IntValueButtonContainer>
                <IntValueButton>+</IntValueButton>
                <IntValue>0</IntValue>
                <IntValueButton>-</IntValueButton>
              </IntValueButtonContainer>
            </IntValueContainer>,
            <IntValueContainer>
              <IntValuelabel>
                {"تعداد عبارت نمایشی برای معرفی یک رویداد"}
              </IntValuelabel>
              <IntValueButtonContainer>
                <IntValueButton
                  onClick={() => {
                    if (numberWords < 100) {
                      setNumberWords(numberWords + 1);
                    }
                  }}
                >
                  +
                </IntValueButton>
                <IntValue>{persianDigits(numberWords)}</IntValue>
                <IntValueButton
                  onClick={() => {
                    if (numberWords > 0) {
                      setNumberWords(numberWords - 1);
                    }
                  }}
                >
                  -
                </IntValueButton>
              </IntValueButtonContainer>
            </IntValueContainer>,
          ]
        ) : (
          <></>
        )}
      </SearchForm>
      <ButtonContainer>
        <ButtonInnerContainer>
          <CustomButton
            onClick={async () => {
              try {
                if (
                  startTimes !== null &&
                  endTimes !== null &&
                  lang !== null &&
                  windowsType !== null &&
                  title.length > 0
                ) {
                  await postNewEventTaskService(
                    title,
                    startTimes.value,
                    endTimes.value,
                    diffEvents,
                    lang.value,
                    maxDf,
                    lowestNumberProcess,
                    numberWords,
                    50,
                    eventNumber,
                    windowsType.value,
                    numberWindowsType
                  );
                }
              } catch (err) {}
            }}
            label={"افزودن"}
            icon={<div style={{ fontSize: "20px" }}>+</div>}
          ></CustomButton>
        </ButtonInnerContainer>
        <ButtonInnerContainer>
          <CustomButton
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            label={"تنظیمات پیشرفته"}
            icon={<FilterIcon />}
            color="transparent"
          ></CustomButton>
        </ButtonInnerContainer>
      </ButtonContainer>
    </Container>
  );
}

export default NewEventProcessScreen;

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

const IntValueContainer = styled.div`
  width: 280px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-block: 50px;
  margin-inline: 15px;
`;

const IntValuelabel = styled.p`
  height: fit-content;
  font-size: 16px;
  color: ${Theme.fontColor};
  font-weight: 500;
  font-family: "iranSans";
  box-sizing: border-box;
  margin: 0;
`;

const IntValue = styled.p`
  font-size: 16px;
  font-weight: 500;
  font-family: "iranSans";
  color: ${Theme.fontColor};
`;

const IntValueButtonContainer = styled.div`
  width: calc(100%);
  height: 65px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding-left: 20px;
`;

const IntValueButton = styled.div`
  width: 50px;
  height: 50px;
  border-radius: ${Theme.textFieldBorderRadius};
  border: 1px solid ${Theme.fontColorInActive};
  color: ${Theme.fontColorInActive};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  user-select: none;

  &:hover {
    border: 1px solid ${Theme.fontColor};
    color: ${Theme.fontColor};
  }
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
