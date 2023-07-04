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
  const [textType, setTextType] = useState(null);
  const [processModel, setProcessModel] = useState(null);
  const [numberWindowsType, setNumberWindowsType] = useState(0);
  const [deletePercent, setDeletePercent] = useState(0);
  const [lang, setLang] = useState(null);
  const [nr_topics, setEventNumber] = useState(0);
  const [minDf, setMinDf] = useState(0);
  const [diffEvents, setDiffEvents] = useState(0);
  const [top_n_words, setTopNWord] = useState(0);
  const [minNgram, setMinNgram] = useState(0);
  const [maxNgram, setMaxNgram] = useState(1);
  const [topic_min_keyword_count, setTopic_min_keyword_count] = useState(0);
  const [min_doc_count, setMin_doc_count] = useState(50);
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
              <IntValuelabel>{"درصد تکرار عبارت پردازشی"}</IntValuelabel>
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
                    if (nr_topics < 100) {
                      setEventNumber(nr_topics + 1);
                    }
                  }}
                >
                  +
                </IntValueButton>
                <IntValue>{persianDigits(nr_topics)}</IntValue>
                <IntValueButton
                  onClick={() => {
                    if (nr_topics > 0) {
                      setEventNumber(nr_topics - 1);
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
                    if (minDf < 100) {
                      setMinDf(minDf + 1);
                    }
                  }}
                >
                  +
                </IntValueButton>
                <IntValue>{persianDigits(minDf)}</IntValue>
                <IntValueButton
                  onClick={() => {
                    if (minDf > 0) {
                      setMinDf(minDf - 1);
                    }
                  }}
                >
                  -
                </IntValueButton>
              </IntValueButtonContainer>
            </IntValueContainer>,
            <IntValueContainer>
              <IntValuelabel>{"تنوع عبارت در رویداد"}</IntValuelabel>
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
                {"حداکثر تعداد عبارت نمایشی در رویداد"}
              </IntValuelabel>
              <IntValueButtonContainer>
                <IntValueButton
                  onClick={() => {
                    if (top_n_words < 100) {
                      setTopNWord(top_n_words + 1);
                    }
                  }}
                >
                  +
                </IntValueButton>
                <IntValue>{persianDigits(top_n_words)}</IntValue>
                <IntValueButton
                  onClick={() => {
                    if (top_n_words > 0) {
                      setTopNWord(top_n_words - 1);
                    }
                  }}
                >
                  -
                </IntValueButton>
              </IntValueButtonContainer>
            </IntValueContainer>,
            <IntValueContainer>
              <IntValuelabel>{"حداقل میزان ngram"}</IntValuelabel>
              <IntValueButtonContainer>
                <IntValueButton
                  onClick={() => {
                    if (minNgram + 1 < maxNgram) {
                      setMinNgram(minNgram + 1);
                    }
                  }}
                >
                  +
                </IntValueButton>
                <IntValue>{persianDigits(minNgram)}</IntValue>
                <IntValueButton
                  onClick={() => {
                    if (minNgram > 0) {
                      setMinNgram(minNgram - 1);
                    }
                  }}
                >
                  -
                </IntValueButton>
              </IntValueButtonContainer>
            </IntValueContainer>,
            <IntValueContainer>
              <IntValuelabel>{"حداکثر میزان ngram"}</IntValuelabel>
              <IntValueButtonContainer>
                <IntValueButton
                  onClick={() => {
                    if (maxNgram > minNgram) {
                      setMaxNgram(maxNgram + 1);
                    }
                  }}
                >
                  +
                </IntValueButton>
                <IntValue>{persianDigits(maxNgram)}</IntValue>
                <IntValueButton
                  onClick={() => {
                    if (maxNgram > 0 && maxNgram - 1 > minNgram) {
                      setMaxNgram(maxNgram - 1);
                    }
                  }}
                >
                  -
                </IntValueButton>
              </IntValueButtonContainer>
            </IntValueContainer>,
            <IntValueContainer>
              <IntValuelabel>{"حداقل سایز رویداد"}</IntValuelabel>
              <IntValueButtonContainer>
                <IntValueButton
                  onClick={() => {
                    setTopic_min_keyword_count(topic_min_keyword_count + 1);
                  }}
                >
                  +
                </IntValueButton>
                <IntValue>{persianDigits(topic_min_keyword_count)}</IntValue>
                <IntValueButton
                  onClick={() => {
                    if (topic_min_keyword_count > 0) {
                      setTopic_min_keyword_count(topic_min_keyword_count - 1);
                    }
                  }}
                >
                  -
                </IntValueButton>
              </IntValueButtonContainer>
            </IntValueContainer>,
            <IntValueContainer>
              <IntValuelabel>
                {"حداقل مستندات شامل عبارت پردازشی"}
              </IntValuelabel>
              <IntValueButtonContainer>
                <IntValueButton
                  onClick={() => {
                    setMin_doc_count(min_doc_count + 1);
                  }}
                >
                  +
                </IntValueButton>
                <IntValue>{persianDigits(min_doc_count)}</IntValue>
                <IntValueButton
                  onClick={() => {
                    if (min_doc_count > 0) {
                      setMin_doc_count(min_doc_count - 1);
                    }
                  }}
                >
                  -
                </IntValueButton>
              </IntValueButtonContainer>
            </IntValueContainer>,
            <BoxContainer>
              <DropDown
                label={"نوع پردازش متن ها"}
                defaultValue={textType}
                value={[
                  { label: "همه متن ها", value: "0" },
                  { label: "اسم ها", value: "1" },
                  { label: "فعل ها", value: "2" },
                ]}
                onChange={(value) => {
                  setTextType(value);
                }}
              />
            </BoxContainer>,
            <BoxContainer>
              <DropDown
                label={"مدل پردازشی"}
                defaultValue={processModel}
                value={[
                  {
                    label: "paraphrase-multilingual-MiniLM-L12-v2",
                    value: "paraphrase-multilingual-MiniLM-L12-v2",
                  },
                ]}
                onChange={(value) => {
                  setProcessModel(value);
                }}
              />
            </BoxContainer>,
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
                    diffEvents / 100,
                    lang.value,
                    maxDf / 100,
                    minDf,
                    top_n_words,
                    min_doc_count,
                    nr_topics,
                    windowsType.value,
                    numberWindowsType,
                    minNgram,
                    maxNgram,
                    topic_min_keyword_count,
                    textType.value,
                    processModel.value
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
