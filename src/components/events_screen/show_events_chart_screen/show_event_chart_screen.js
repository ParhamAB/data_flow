import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Text } from "../../../utils/widgets/widgets";
import Theme from "../../../theme/theme";
import TextField from "../../../utils/text_field/text_field";
import CustomButton from "../../../utils/custom_button/custom_button";
import DropDown from "../../../utils/drop_down/drop_down";
import { useDispatch, useSelector } from "react-redux";
import {
  englishDigits,
  isStringOnlyNumbers,
  persianDigits,
  persianMonth,
  persianMonthToNumber,
} from "../../../utils/utils";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

function ShowEventChart() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const eventChartList = useSelector((state) => state.eventChartListState);
  const [selectedEventsLabel, setSelectedEventsLabel] = useState([]);
  const [selectedEventsData, setSelectedEventsData] = useState([]);
  const [startEndChartLabel, setStartEndChartLabel] = useState([]);
  const [startEndChartData, setStartEndChartData] = useState([]);
  //   const [justMonthTextField, setJustMonthTextField] = useState("");
  //   const [daysLabel, setDaysLabel] = useState([]);
  //   const [daysData, setDaysData] = useState([]);
  //   const [justDaysTextField_year, setJustDaysTextField_year] = useState("");
  //   const [justDaysTextField_month, setJustDaysTextField_month] = useState(null);
  //   const [isFirstLoad, setIsFirstLoad] = useState(true);

  const yearChartRef = useRef(null);
  const monthChartRef = useRef(null);
  const daysChartRef = useRef(null);
  //   const startTimesList = useSelector((state) => state.flowStartTimesState);

  useEffect(() => {
    dispatch(getEventChartFunction(id));
  }, []);

  useEffect(() => {
    setSelectedEventsData([]);
    setSelectedEventsLabel([]);
    eventChartList.eventChartModelZeroList.map((e, index) => {
      setSelectedEventsLabel((oldArrays) => [
        ...oldArrays,
        persianDigits(e.x_index),
      ]);
      setSelectedEventsData((oldArrays) => [...oldArrays, e.y_index]);
    });
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

  //   useEffect(() => {
  //     setDaysData([]);
  //     setDaysLabel([]);
  //     daysAnalysis.daysData.map((e) => {
  //       setDaysLabel((oldArrays) => [...oldArrays, persianDigits(e._day)]);
  //       setDaysData((oldArrays) => [...oldArrays, e.count]);
  //     });
  //   }, [eventChartList.eventChartModelOneList]);

  const handleBarYearClick = (event) => {
    let details = getElementsAtEvent(yearChartRef.current, event);
    // if (details.length > 0) {
    //   let temp = moment(
    //     `${englishDigits(yearsLabel[details[0].index])}-01-01`,
    //     "jYYYY-jMM-jDD"
    //   );
    //   setJustMonthTextField(yearsLabel[details[0].index]);
    //   dispatch(
    //     getMonthsAnalysisListFunction(parseInt(moment(temp).format("YYYY")) + 1)
    //   );
    // }
  };

  const handleBarMonthClick = (event) => {
    let details = getElementsAtEvent(monthChartRef.current, event);
    // if (details.length > 0) {
    //   let temp = moment(
    //     `${englishDigits(justMonthTextField)}-01-01`,
    //     "jYYYY-jMM-jDD"
    //   );
    //   setJustDaysTextField_year(justMonthTextField);
    //   setJustDaysTextField_month({
    //     label: monthsLabel[details[0].index],
    //     value: persianMonthToNumber(monthsLabel[details[0].index]),
    //   });
    //   setJustMonthTextField(yearsLabel[details[0].index]);
    //   dispatch(
    //     getDaysAnalysisListFunction(
    //       parseInt(moment(temp).format("YYYY")) + 1,
    //       persianMonthToNumber(monthsLabel[details[0].index])
    //     )
    //   );
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
