import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Text } from "../../../utils/widgets/widgets";
import Theme from "../../../theme/theme";
import { useDispatch, useSelector } from "react-redux";
import { getRandomColor, persianDigits } from "../../../utils/utils";
import moment from "jalali-moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar, getElementsAtEvent } from "react-chartjs-2";
import Loading from "../../../utils/loading/loading";
import { getEventChartFunction } from "../../../redux/events_screen/events_chart_redux/events_chart_redux_action";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { TagCloud } from "react-tagcloud";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);
Modal.setAppElement("#root");

function ShowEventChart() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const eventChartList = useSelector((state) => state.eventChartListState);
  const [selectedEventsLabel, setSelectedEventsLabel] = useState([]);
  const [selectedEventsData, setSelectedEventsData] = useState([]);
  const [startEndChartLabel, setStartEndChartLabel] = useState([]);
  const [startEndChartData, setStartEndChartData] = useState([]);
  const [wordCloud, setWordCloud] = useState([]);
  const [noteList, setNoteList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const yearChartRef = useRef(null);
  const monthChartRef = useRef(null);
  const daysChartRef = useRef(null);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "#31313180",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: Theme.backGroundColorGrey,
      border: "0px solid #ccc",
      WebkitOverflowScrolling: "touch",
      borderRadius: "15px",
      outline: "none",
      padding: "25px",
    },
  };

  useEffect(() => {
    dispatch(getEventChartFunction(id));
  }, []);

  useEffect(() => {
    setSelectedEventsData([]);
    setSelectedEventsLabel([]);
    setWordCloud([]);
    setNoteList([]);
    eventChartList.eventChartModelZeroList.map((e, index) => {
      let temp = [];
      e.keywords.map((e) => {
        temp.push({ value: Object.keys(e)[0], count: Object.values(e)[0] });
      });
      setWordCloud((oldArray) => [...oldArray, temp]);
      setNoteList((oldArray) => [...oldArray, e.representative_documents]);
      setSelectedEventsLabel((oldArrays) => [
        ...oldArrays,
        persianDigits(e.x_index),
      ]);
      setSelectedEventsData((oldArrays) => [...oldArrays, e.y_index]);
    });
    console.log(noteList);
  }, [eventChartList.eventChartModelZeroList]);

  useEffect(() => {
    setStartEndChartData([]);
    setStartEndChartLabel([]);
    eventChartList.eventChartModelOneList.map((e, index) => {
      setStartEndChartLabel((oldArrays) => [
        ...oldArrays,
        `ابتدا:${persianDigits(
          moment(e.start_date_time).format("jYYYY/jMM/jDD")
        )} - انتها:${persianDigits(
          moment(e.end_date_time).format("jYYYY/jMM/jDD")
        )}`,
      ]);
      setStartEndChartData((oldArrays) => [...oldArrays, e.y_index]);
    });
  }, [eventChartList.eventChartModelOneList]);

  const handleBarYearClick = (event) => {
    let details = getElementsAtEvent(yearChartRef.current, event);
    if (details.length > 0) {
      setSelectedIndex(details[0].index);
      openModal();
    }
  };

  const handleBarMonthClick = (event) => {
    let details = getElementsAtEvent(monthChartRef.current, event);
    // if (details.length > 0) {
    // }
  };

  return (
    <Container>
      <Text
        text={"نمایش سلسله مراتبی رویداد ها"}
        fontSize="20px"
        fontWeight={700}
      ></Text>
      <BoxContainer>
        <ChartContainer>
          <RowTitle>
            <Text
              text={"لیست رویداد های پردازش انتخاب شده"}
              fontSize="23px"
            ></Text>
          </RowTitle>
          {!eventChartList.loading && eventChartList.error.length === 0 ? (
            <>
              <Center>
                <Bar
                  onClick={handleBarYearClick}
                  ref={yearChartRef}
                  data={{
                    labels: selectedEventsLabel,
                    datasets: [
                      {
                        data: selectedEventsData,
                        backgroundColor: "#0063F7",
                        hoverBackgroundColor: "#0E2B5D",
                        borderRadius: 5,
                        maxBarThickness: 30,
                      },
                    ],
                  }}
                  options={{
                    locale: "fa",
                    backgroundColor: "red",
                    scales: {
                      x: {
                        ticks: {
                          color: "white",
                          showLabelBackdrop: false,
                          font: {
                            size: 13,
                            family: "iranSans",
                            weight: 300,
                          },
                        },
                      },
                      y: {
                        ticks: {
                          color: "white",
                          showLabelBackdrop: false,
                          font: {
                            size: 13,
                            family: "iranSans",
                            weight: 300,
                          },
                        },
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </Center>
              <RowBottom>
                <ColorSquare color={"#0063F7"}></ColorSquare>
                <Text
                  text={"تعداد پیام / شناسه پیام ها"}
                  fontSize={"15px"}
                  fontWeight={500}
                />
              </RowBottom>
            </>
          ) : eventChartList.loading ? (
            <Center>
              <Loading></Loading>
            </Center>
          ) : (
            <Center>
              <Text text={eventChartList.error} />
            </Center>
          )}
        </ChartContainer>
        <ChartContainer>
          <RowTitle>
            <Text text={"لیست زیربازه های انتخاب شده"} fontSize="23px"></Text>
          </RowTitle>
          {!eventChartList.loading && eventChartList.error.length === 0 ? (
            <>
              <Center>
                <Bar
                  ref={monthChartRef}
                  onClick={handleBarMonthClick}
                  data={{
                    labels: startEndChartLabel,
                    datasets: [
                      {
                        data: startEndChartData,
                        backgroundColor: "#AB72FF",
                        hoverBackgroundColor: Theme.purpleColorLight,
                        borderRadius: 5,
                        maxBarThickness: 30,
                      },
                    ],
                  }}
                  options={{
                    locale: "fa",
                    scales: {
                      x: {
                        ticks: {
                          color: "white",
                          showLabelBackdrop: false,
                          font: {
                            size: 13,
                            family: "iranSans",
                            weight: 300,
                          },
                        },
                      },
                      y: {
                        ticks: {
                          color: "white",
                          font: {
                            size: 13,
                            family: "iranSans",
                            weight: 300,
                          },
                          showLabelBackdrop: false,
                        },
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </Center>
              <RowBottom>
                <ColorSquare color={"#AB72FF"}></ColorSquare>
                <Text text={"آمار ماهانه"} fontSize={"15px"} fontWeight={500} />
              </RowBottom>
            </>
          ) : eventChartList.loading ? (
            <Center>
              <Loading></Loading>
            </Center>
          ) : (
            <Center>
              <Text
                text={
                  eventChartList.error.length > 0
                    ? eventChartList.error
                    : eventChartList.error.length > 0
                    ? eventChartList.error
                    : "خطا"
                }
              />
            </Center>
          )}
        </ChartContainer>
        <ChartContainer>
          <RowTitle>
            <Text
              text={"لیست مربوط به زیربازه های انتخاب شده"}
              fontSize="23px"
            ></Text>
          </RowTitle>
          {!eventChartList.loading && eventChartList.error.length === 0 ? (
            <>
              <Center>
                <Bar
                  ref={daysChartRef}
                  data={{
                    labels: [],
                    datasets: [
                      {
                        data: [],
                        backgroundColor: "#00CFDE",
                        hoverBackgroundColor: "#145565",
                        borderRadius: 5,
                        maxBarThickness: 30,
                      },
                    ],
                  }}
                  options={{
                    locale: "fa",
                    scales: {
                      x: {
                        ticks: {
                          color: "white",
                          showLabelBackdrop: false,
                          font: {
                            size: 13,
                            family: "iranSans",
                            weight: 300,
                          },
                        },
                      },
                      y: {
                        ticks: {
                          color: "white",
                          showLabelBackdrop: false,
                          font: {
                            size: 13,
                            family: "iranSans",
                            weight: 300,
                          },
                        },
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </Center>
              <RowBottom>
                <ColorSquare color={"#00CFDE"}></ColorSquare>
                <Text text={"آمار روزانه"} fontSize={"15px"} fontWeight={500} />
              </RowBottom>
            </>
          ) : eventChartList.loading ? (
            <Center>
              <Loading></Loading>
            </Center>
          ) : (
            <Center>
              <Text text={eventChartList.error} />
            </Center>
          )}
        </ChartContainer>
      </BoxContainer>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <InsideBox>
          <Title>{"مشخصات پیام"}</Title>
          <WordCloud>
            <TagCloud
              minSize={12}
              maxSize={35}
              tags={wordCloud[selectedIndex]}
              className="wordCloud"
            />
          </WordCloud>
          <Title>{"پیام های مرتبط :"}</Title>
          <NoteContainer>
            {noteList && noteList[selectedIndex]
              ? noteList[selectedIndex].map((e) => {
                  return (
                    <PmContainerEach>
                      <Divider color={getRandomColor()}></Divider>
                      {e}
                    </PmContainerEach>
                  );
                })
              : null}
          </NoteContainer>
        </InsideBox>
      </Modal>
    </Container>
  );
}

export default ShowEventChart;

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

const BoxContainer = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const ChartContainer = styled.div`
  width: calc(100% / 2 - 30px);
  height: 500px;
  background-color: ${Theme.backGroundColorGreyLight};
  border-radius: ${Theme.textFieldBorderRadius};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
  margin-inline: 10px;
  margin-block: 10px;
  padding-inline: 15px;
`;

const RowTitle = styled.div`
  width: calc(100%);
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding-top: 20px;
  padding-inline: 20px;
  margin-bottom: 40px;
`;

const Center = styled.div`
  width: calc(100%);
  height: calc(75%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RowBottom = styled.div`
  width: calc(100%);
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding-right: 10px;
`;

const ColorSquare = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.color};
  margin-left: 10px;
`;

const InsideBox = styled.div`
  min-width: 300px;
  max-width: 80vw;
  height: fit-content;
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  direction: rtl;
`;

const WordCloud = styled.div`
  width: calc(80%);
  max-width: 500px;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoteContainer = styled.div`
  width: calc(100%);
  height: max-content;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const PmContainerEach = styled.div`
  width: calc(100%);
  height: max-content;
  border-radius: ${Theme.textFieldBorderRadius};
  background-color: ${Theme.backGroundColorGreyLight};
  margin-block: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-inline: 15px;
  padding-block: 10px;
  color: white;
`;

const Divider = styled.div`
  width: 10px;
  height: 70px;
  border-radius: 15px;
  background-color: ${(props) => props.color};
  margin-left: 10px;
`;

const Title = styled.div`
  width: calc(100%);
  height: 80px;
  color: ${Theme.fontColor};
  font-size: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-block: 20px;
`;
