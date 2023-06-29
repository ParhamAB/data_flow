import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Text } from "../../utils/widgets/widgets";
import TextField from "../../utils/text_field/text_field";
import DropDown from "../../utils/drop_down/drop_down";
import CustomButton from "../../utils/custom_button/custom_button";
import ZoomIcon from "../../utils/icons/zoom_icon";
import Theme from "../../theme/theme";
import { useDispatch, useSelector } from "react-redux";
import { getProcessListFunction } from "../../redux/my_process_screen/my_process_action";
import moment from "jalali-moment";
import RunningIcon from "../../utils/icons/running_icon";
import TickIcon from "../../utils/icons/tick_icon";
import CloseIcon from "../../utils/icons/close_icon";
import { getStartTimesListFunction } from "../../redux/start_time_redux/start_time_action";
import { persianDigits } from "../../utils/utils";
import ShowIcon from "../../utils/icons/show_icon";
import DeleteIcon from "../../utils/icons/delete_icon";
import deleteProcessService from "../../service/delete_process_service/delete_process_service.ts";
import Loading from "../../utils/loading/loading";

function ViewMyProcessScreen() {
  const dispatch = useDispatch();
  const processList = useSelector((state) => state.processListState);
  const startTimesList = useSelector((state) => state.startTimesState);
  const [processType, setProcessType] = useState(null);
  const [title, setTitle] = useState("");
  const [startTimes, setStartTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [offSet, setOffSet] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    dispatch(getProcessListFunction("0", "2000-01-01T00:00:00", "0", offSet));
    dispatch(getStartTimesListFunction());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setStartTimes([]);
    if (startTimesList.startTimesList.length > 0) {
      startTimesList.startTimesList.map((e) => {
        setStartTimes((oldArray) => [
          ...oldArray,
          {
            value: e.start_date_time.split("+")[0],
            label: persianDigits(
              moment(e.start_date_time).format("jYYYY/jMM/jDD") +
                " - " +
                moment(e.start_date_time).format("HH:mm")
            ),
          },
        ]);
      });
    }
    // eslint-disable-next-line
  }, [startTimesList.startTimesList]);

  return (
    <Container>
      <Text text={"پردازش های من"} fontSize="20px" fontWeight={700}></Text>
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
            label={"تاریخ آغاز"}
            isSearchable={true}
            value={startTimes}
            defaultValue={selectedDate}
            onChange={(value) => {
              setSelectedDate(value);
            }}
          />
        </BoxContainer>
        <BoxContainer>
          <DropDown
            label={"نوع پردازش"}
            defaultValue={processType}
            value={[
              { label: "استخراج رویداد", value: "event" },
              { label: "استخراج جریان", value: "flow" },
            ]}
            onChange={(value) => {
              setProcessType(value);
            }}
          />
        </BoxContainer>
        <ButtonContainer>
          <CustomButton
            onClick={() => {
              setOffSet(0);
              setPageNumber(1);
              dispatch(
                getProcessListFunction(
                  processType !== null ? processType.value : "",
                  selectedDate !== null ? selectedDate.value : "",
                  title,
                  0
                )
              );
            }}
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
        {!processList.loading ? (
          processList.processList.length > 0 ? (
            processList.processList.map((e, index) => {
              return (
                <ValueTable key={index}>
                  <ValueText flex={1}>
                    {persianDigits(index + (offSet + 1))}
                  </ValueText>
                  <ValueText flex={2}>{e.title}</ValueText>
                  <ValueText flex={1}>
                    {persianDigits(
                      moment(e.start_date_time).format("jYYYY/jMM/jDD") +
                        " - " +
                        moment(e.start_date_time).format("HH:mm")
                    )}
                  </ValueText>
                  <ValueText flex={2}>
                    {e.status_title === "running" ? (
                      <RunningContainer>
                        <RunningIcon />
                        <TextInside type={e.status_title}>
                          {"در حال انجام"}
                        </TextInside>
                      </RunningContainer>
                    ) : e.status_title === "done" ? (
                      <DoneContainer>
                        <TickIcon />
                        <TextInside type={e.status_title}>
                          {"انجام شده"}
                        </TextInside>
                      </DoneContainer>
                    ) : (
                      <ErrContainer>
                        <CloseIcon />
                        <TextInside type={e.status_title}>
                          {"ناموفق"}
                        </TextInside>
                      </ErrContainer>
                    )}
                  </ValueText>
                  <ValueText flex={1}>
                    {e.process_type === "event"
                      ? "استخراج رویداد"
                      : "استخراج جریان"}
                  </ValueText>
                  <ValueText flex={1}>
                    {persianDigits(
                      moment(e.end_date_time).format("jYYYY/jMM/jDD") +
                        " - " +
                        moment(e.end_date_time).format("HH:mm")
                    )}
                  </ValueText>
                  <ValueText flex={2}>
                    <ButtonEachTable>
                      <ShowIcon />
                    </ButtonEachTable>
                    <ButtonEachTable
                      onClick={async () => {
                        await deleteProcessService(e.id_process);
                        dispatch(
                          getProcessListFunction(
                            processType !== null ? processType.value : "",
                            selectedDate !== null ? selectedDate.value : "",
                            title,
                            offSet
                          )
                        );
                      }}
                    >
                      <DeleteIcon />
                    </ButtonEachTable>
                  </ValueText>
                </ValueTable>
              );
            })
          ) : (
            <NoElementText>{"داده ای وجود ندارد!"}</NoElementText>
          )
        ) : (
          <Loading></Loading>
        )}
      </TableContainer>
      {processList.loading ? null : (
        <LazyPageContainer>
          <TextPageNumber>{`نمایش  ${persianDigits(
            offSet + 1
          )} - ${persianDigits(
            offSet + processList.processList.length
          )}`}</TextPageNumber>
          <PageHandlerContainer>
            <PageHandler>
              <ButtonPage
                onClick={
                  pageNumber === 1
                    ? null
                    : () => {
                        setPageNumber(pageNumber - 1);
                        dispatch(
                          getProcessListFunction(
                            processType !== null ? processType.value : "",
                            selectedDate !== null ? selectedDate.value : "",
                            title,
                            offSet - 15
                          )
                        );
                        setOffSet(offSet - 15);
                      }
                }
                color={
                  pageNumber === 1 ? Theme.fontColorInActive : Theme.fontColor
                }
              >
                {"<"}
              </ButtonPage>
              <TextPage>{persianDigits(pageNumber)}</TextPage>
              <ButtonPage
                onClick={
                  processList.processList.length < 15
                    ? null
                    : () => {
                        setPageNumber(pageNumber + 1);
                        dispatch(
                          getProcessListFunction(
                            processType !== null ? processType.value : "",
                            selectedDate !== null ? selectedDate.value : "",
                            title,
                            offSet + 15
                          )
                        );
                        setOffSet(offSet + 15);
                      }
                }
                color={
                  processList.processList.length < 15
                    ? Theme.fontColorInActive
                    : Theme.fontColor
                }
              >
                {">"}
              </ButtonPage>
            </PageHandler>
          </PageHandlerContainer>
        </LazyPageContainer>
      )}
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
  margin-block: 8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
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

const RunningContainer = styled.div`
  width: 100px;
  height: 40px;
  border-radius: ${Theme.textFieldBorderRadius};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ebebf0;
  padding-inline: 15px;
`;

const DoneContainer = styled.div`
  width: 100px;
  height: 40px;
  border-radius: ${Theme.textFieldBorderRadius};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #39ef9e;
  padding-inline: 15px;
`;

const ErrContainer = styled.div`
  width: 100px;
  height: 40px;
  border-radius: ${Theme.textFieldBorderRadius};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ff9d9d;
  padding-inline: 15px;
`;

const TextInside = styled.p`
  font-size: 13px;
  color: ${(props) =>
    props.type === "failed"
      ? "#A50F0F"
      : props.type === "done"
      ? "#0D5A3A"
      : "#605E75"};
  font-weight: 500;
  margin-right: 6px;
  font-family: "iranSans";
`;

const NoElementText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100%);
  height: 100px;
  font-size: 20px;
  color: ${Theme.fontColorInActive};
`;

const LazyPageContainer = styled.div`
  width: calc(100%);
  height: 120px;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const TextPageNumber = styled.div`
  width: 150px;
  height: 50px;
  font-size: 16px;
  color: ${Theme.fontColorInActive};
`;

const PageHandlerContainer = styled.div`
  width: calc(100% - 150px);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const PageHandler = styled.div`
  width: calc(100% - 150px);
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-bottom: 30px;
  padding-left: 150px;
  box-sizing: border-box;
`;

const ButtonPage = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  background-color: transparent;
  color: ${(props) => props.color};
  border: 1px solid ${(props) => props.color};
  border-radius: ${Theme.textFieldBorderRadius};
  transition: 300ms;
  cursor: ${(props) =>
    props.color === Theme.fontColor ? "pointer" : "default"};

  &:hover {
    background-color: ${(props) =>
      props.color === Theme.fontColor ? "#6600cc6b" : "transparent"};
  }
`;

const TextPage = styled.p`
  font-size: 20px;
  margin-inline: 15px;
  color: ${Theme.fontColor};
`;

const ButtonEachTable = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${Theme.textFieldBorderRadius};
  border: 1px solid ${Theme.fontColor};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-inline: 5px;
  cursor: pointer;
  transition: 300ms;

  &:hover {
    background-color: #6600cc6b;
  }
`;
