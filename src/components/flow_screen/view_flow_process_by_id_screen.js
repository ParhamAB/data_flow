import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Text } from "../../utils/widgets/widgets";
import TextField from "../../utils/text_field/text_field";
import Theme from "../../theme/theme";
import ArrowIcon from "../../utils/icons/arrow_icon";
import {
  Chart as ChartJS,
  Chart as ChartJS2,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFlowProcessInfoListFunction } from "../../redux/flow_screen/get_flow_process_by_id_redux/get_flow_process_info/get_flow_process_info_by_id_action";
import { getFlowProcessStatisticsListFunction } from "../../redux/flow_screen/get_flow_process_by_id_redux/get_flow_process_statistics/get_flow_process_statistics_action";
// import moment from "jalali-moment";
import { persianDigits } from "../../utils/utils";
import moment from "jalali-moment";
import CheckBox from "../../utils/check_box/check_box";
import CustomButton from "../../utils/custom_button/custom_button";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);
ChartJS2.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  PointElement,
  LineElement
);

function ViewFlowMyProcessByIdScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const flowInfoList = useSelector(
    (state) => state.getFlowProcessInfoListState
  );
  const flowStatisticsList = useSelector(
    (state) => state.getFlowProcessStatisticsListState
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [samePercent, setSamePercent] = useState("");
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [isOpenThird, setIsOpenThird] = useState(false);
  const [chartLabel, setChartLabel] = useState([]);
  const [chartFirstData, setChartFirstData] = useState([]);
  const [chartSecondData, setChartSecondData] = useState([]);
  const [chartThirdData, setChartThirdData] = useState([]);
  const [isCheckedList, setIsCheckedList] = useState([]);
  const [flowChartData, setFlowChartData] = useState([]);
  const [flowChartLabel, setFlowChartLabel] = useState([]);
  const [Labels, setLabels] = useState([]);

  useEffect(() => {
    dispatch(getFlowProcessInfoListFunction(id));
    dispatch(getFlowProcessStatisticsListFunction(id));
  }, []);

  useEffect(() => {
    if (
      flowInfoList &&
      flowInfoList.flowInfoProcessList &&
      flowInfoList.flowInfoProcessList.process_info &&
      flowInfoList.flowInfoProcessList.process_info[0]
    ) {
      setStartDate(
        persianDigits(
          moment(
            flowInfoList.flowInfoProcessList.process_info[0].start_date_time
          ).format("jYYYY/jMM/jDD") +
            " " +
            moment(
              flowInfoList.flowInfoProcessList.process_info[0].start_date_time
            ).format("HH:mm")
        )
      );
      setEndDate(
        persianDigits(
          moment(
            flowInfoList.flowInfoProcessList.process_info[0].end_date_time
          ).format("jYYYY/jMM/jDD") +
            " " +
            moment(
              flowInfoList.flowInfoProcessList.process_info[0].end_date_time
            ).format("HH:mm")
        )
      );
    }
    if (flowInfoList && flowInfoList.flowInfoProcessList) {
      setSamePercent(persianDigits(flowInfoList.flowInfoProcessList.threshold));
    }
    if (
      flowInfoList &&
      flowInfoList.flowInfoProcessList &&
      flowInfoList.flowInfoProcessList.flows_info
    ) {
      setIsCheckedList([]);
      flowInfoList.flowInfoProcessList.flows_info.map((e) => {
        setIsCheckedList((oldArray) => [
          ...oldArray,
          { isChecked: false, data: e },
        ]);
      });
    }
  }, [flowInfoList.flowInfoProcessList]);

  useEffect(() => {
    setChartLabel([]);
    setChartFirstData([]);
    setChartSecondData([]);
    setChartThirdData([]);
    if (flowStatisticsList.flowStatisticsProcessList[0] !== undefined) {
      flowStatisticsList.flowStatisticsProcessList[0].flows_id.map((e) => {
        setChartLabel((oldArray) => [...oldArray, persianDigits(e)]);
      });
      setChartFirstData(
        flowStatisticsList.flowStatisticsProcessList[1].flows_gradient
      );
      setChartSecondData(
        flowStatisticsList.flowStatisticsProcessList[2].flows_weight
      );
      setChartThirdData(
        flowStatisticsList.flowStatisticsProcessList[3].flows_variability
      );
    }
  }, [flowStatisticsList.flowStatisticsProcessList]);

  return (
    <Container>
      <Text
        text={"نمایش پردازش جریان ها"}
        fontSize="20px"
        fontWeight={700}
      ></Text>
      <SearchForm>
        <BoxContainer>
          <TextField
            label={"ابتدای بازه"}
            value={startDate}
            disabled
          ></TextField>
        </BoxContainer>
        <BoxContainer>
          <TextField label={"انتهای بازه"} value={endDate} disabled></TextField>
        </BoxContainer>
        <BoxContainer>
          <TextField label={"شباهت"} value={samePercent} disabled></TextField>
        </BoxContainer>
      </SearchForm>
      <AllChartContainer>
        <EachContainer style={{ height: !isOpenFirst ? "65px" : "465px" }}>
          <PopDownButton
            onClick={() => {
              setIsOpenFirst(!isOpenFirst);
            }}
          >
            <Text
              text={"میانگین تغییرات علایق کاربران نسبت به جریان ها"}
              fontSize={"20px"}
              fontWeight={"500"}
            ></Text>
            <IconContainer
              style={{
                transform: isOpenFirst ? "rotate(180deg)" : "none",
              }}
            >
              <ArrowIcon />
            </IconContainer>
          </PopDownButton>
          <ChartContainer style={{ height: isOpenFirst ? "400px" : "0px" }}>
            <ChartBarContainer>
              <Bar
                data={{
                  labels: chartLabel,
                  datasets: [
                    {
                      data: chartFirstData,
                      backgroundColor: "#00CFDE",
                      hoverBackgroundColor: "#145565",
                      borderRadius: 5,
                      maxBarThickness: 30,
                    },
                  ],
                }}
                options={{
                  locale: "fa",
                  backgroundColor: "red",
                  maintainAspectRatio: false,
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
            </ChartBarContainer>
            <RowBottom>
              <ColorSquare color={"#00CFDE"}></ColorSquare>
              <Text text={"گرادین جریان"} fontSize={"15px"} fontWeight={500} />
            </RowBottom>
          </ChartContainer>
        </EachContainer>
        <EachContainer style={{ height: !isOpenSecond ? "65px" : "465px" }}>
          <PopDownButton
            onClick={() => {
              setIsOpenSecond(!isOpenSecond);
            }}
          >
            <Text
              text={"میانگین تغییرات در وزن جریان ها"}
              fontSize={"20px"}
              fontWeight={"500"}
            ></Text>
            <IconContainer
              style={{
                transform: isOpenSecond ? "rotate(180deg)" : "none",
              }}
            >
              <ArrowIcon />
            </IconContainer>
          </PopDownButton>
          <ChartContainer style={{ height: isOpenSecond ? "400px" : "0px" }}>
            <ChartBarContainer>
              <Bar
                data={{
                  labels: chartLabel,
                  datasets: [
                    {
                      data: chartSecondData,
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
                  maintainAspectRatio: false,
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
            </ChartBarContainer>
            <RowBottom>
              <ColorSquare color={"#0063F7"}></ColorSquare>
              <Text text={"وزن جریان ها"} fontSize={"15px"} fontWeight={500} />
            </RowBottom>
          </ChartContainer>
        </EachContainer>
        <EachContainer style={{ height: !isOpenThird ? "65px" : "465px" }}>
          <PopDownButton
            onClick={() => {
              setIsOpenThird(!isOpenThird);
            }}
          >
            <Text
              text={"میانگین تغییرات ترجیحات کاربران در جریان ها"}
              fontSize={"20px"}
              fontWeight={"500"}
            ></Text>
            <IconContainer
              style={{
                transform: isOpenThird ? "rotate(180deg)" : "none",
              }}
            >
              <ArrowIcon />
            </IconContainer>
          </PopDownButton>
          <ChartContainer style={{ height: isOpenThird ? "400px" : "0px" }}>
            <ChartBarContainer>
              <Bar
                data={{
                  labels: chartLabel,
                  datasets: [
                    {
                      data: chartThirdData,
                      backgroundColor: "#AB72FF",
                      hoverBackgroundColor: Theme.purpleColorLight,
                      borderRadius: 5,
                      maxBarThickness: 30,
                    },
                  ],
                }}
                options={{
                  locale: "fa",
                  backgroundColor: "red",
                  maintainAspectRatio: false,
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
            </ChartBarContainer>
            <RowBottom>
              <ColorSquare color={"#AB72FF"}></ColorSquare>
              <Text
                text={"تغییر پذیری جریان"}
                fontSize={"15px"}
                fontWeight={500}
              />
            </RowBottom>
          </ChartContainer>
        </EachContainer>
        <RowBottomLast>
          <ChartInRowBottomLast>
            <Text
              text={"بازه رویداد نسبت به پیام"}
              fontSize="23px"
              fontWeight={500}
            />
            <ChartBarContainerLast>
              <Line
                data={{
                  labels: flowChartLabel,
                  datasets: flowChartData,
                }}
                options={{
                  locale: "fa",
                  backgroundColor: "red",
                  maintainAspectRatio: false,
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
            </ChartBarContainerLast>
          </ChartInRowBottomLast>
          <ChartInRowBottomLast>
            <Row>
              <Text text={"جریان ها"} fontSize="23px" fontWeight={500} />
              <CustomButton
                label={"پاک کردن"}
                color="transparent"
                borderColor={Theme.fontColorInActive}
                onClick={() => {
                  isCheckedList.map((e) => {
                    e.isChecked = false;
                  });
                  setFlowChartData([]);
                }}
              ></CustomButton>
            </Row>
            <CheckBoxList>
              {isCheckedList.map((e, index) => {
                return (
                  <CheckBoxContainer
                    onClick={() => {
                      e.isChecked = !e.isChecked;
                      let arr = [];
                      setFlowChartLabel([]);
                      setFlowChartData([]);
                      isCheckedList
                        .filter((p) => p.isChecked === true)
                        .map((temp, index) => {
                          let red = Math.floor(Math.random() * 256);
                          let green = Math.floor(Math.random() * 256);
                          let blue = Math.floor(Math.random() * 256);
                          let rgbColor = `rgb(${red}, ${green}, ${blue})`;
                          let rgbColorOpacity = `rgb(${red}, ${green}, ${blue},0.5)`;
                          let arr = [];
                          temp.data.event_chain.map((temp2) => {
                            arr.push(temp2.Count);
                            if (
                              flowChartLabel.filter(
                                (s) => s.model === temp2.model
                              ).length === 0
                            ) {
                              setFlowChartLabel((oldArray) => [
                                ...oldArray,
                                temp2.model,
                              ]);
                            }
                            // flowChartLabel.map((lbl) => {
                            //   if (lbl === temp2.model) {
                            //     arr.push(temp2.Count);
                            //   } else {
                            //     arr.push(null);
                            //   }
                            // });
                            setFlowChartData((oldArray) => [
                              ...oldArray,
                              {
                                id: index,
                                label: "",
                                data: arr,
                                borderColor: rgbColor,
                                backgroundColor: rgbColorOpacity,
                              },
                            ]);
                          });
                        });

                      // if (e.isChecked) {

                      //   e.data.event_chain.map((e) => {
                      //     arr.push(e.Count);
                      //     setLabels((oldArray) => [...oldArray, e.model]);
                      //     if (!flowChartLabel.includes(e.model)) {
                      //       setFlowChartLabel((oldArray) => [
                      //         ...oldArray,
                      //         e.model,
                      //       ]);
                      //     }
                      //   });
                      //   setFlowChartData((oldArray) => [
                      //     ...oldArray,
                      //     {
                      //       id: index,
                      //       label: "",
                      //       data: arr,
                      //       borderColor: rgbColor,
                      //       backgroundColor: rgbColorOpacity,
                      //     },
                      //   ]);
                      // }
                    }}
                  >
                    <CheckBox value={e.isChecked} onClick={() => {}}></CheckBox>
                    <CheckBoxLabel>
                      <Text
                        text={e.data.flow_title}
                        fontSize="16px"
                        fontWeight={500}
                      ></Text>
                    </CheckBoxLabel>
                  </CheckBoxContainer>
                );
              })}
            </CheckBoxList>
          </ChartInRowBottomLast>
        </RowBottomLast>
      </AllChartContainer>
    </Container>
  );
}

export default ViewFlowMyProcessByIdScreen;

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

const AllChartContainer = styled.div`
  width: calc(100%);
  margin-top: 70px;
  margin-bottom: 50px;
`;

const PopDownButton = styled.div`
  width: calc(100%);
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding-inline: 25px;
  transition: 300ms;
  user-select: none;
  background-color: ${Theme.backGroundColorGreyLight};
  border-radius: ${Theme.textFieldBorderRadius};
  cursor: pointer;

  &:hover {
    background-color: ${Theme.secondBackGround};
  }
`;

const EachContainer = styled.div`
  width: calc(100%);
  transition: 300ms;
  background-color: ${Theme.backGroundColorGreyLight};
  border-radius: ${Theme.textFieldBorderRadius};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
`;

const IconContainer = styled.div`
  width: 30px;
  height: calc(100%);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 300ms;
`;

const ChartContainer = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 20px;
  overflow: hidden;
  transition: 300ms;
`;

const ChartBarContainer = styled.div`
  width: calc(100%);
  height: calc(100% - 70px);
  box-sizing: border-box;
  padding-inline: 10px;
  padding-top: 5px;
`;

const RowBottom = styled.div`
  width: calc(100%);
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding-right: 30px;
  margin-top: 20px;
`;

const ColorSquare = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.color};
  margin-left: 10px;
`;

const RowBottomLast = styled.div`
  width: calc(100%);
  height: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

const ChartInRowBottomLast = styled.div`
  width: calc(100% / 2 - 50px);
  height: calc(100%);
  background-color: ${Theme.backGroundColorGreyLight};
  border-radius: ${Theme.textFieldBorderRadius};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
  padding-inline: 25px;
`;

const CheckBoxList = styled.div`
  width: calc(100%);
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: auto;
`;

const CheckBoxContainer = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
`;

const CheckBoxLabel = styled.div`
  margin-right: 10px;
  max-width: calc(100% - 50px);
  text-overflow: clip;
`;

const Row = styled.div`
  width: calc(100%);
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

const ChartBarContainerLast = styled.div`
  width: calc(100%);
  height: calc(100% - 70px);
  box-sizing: border-box;
  padding-inline: 10px;
  padding-bottom: 25px;
`;
