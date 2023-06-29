import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Text } from "../../utils/widgets/widgets";
import Theme from "../../theme/theme";
import TextField from "../../utils/text_field/text_field";
import CustomButton from "../../utils/custom_button/custom_button";
import DropDown from "../../utils/drop_down/drop_down";
import { useDispatch, useSelector } from "react-redux";
import { getYearsAnalysisListFunction } from "../../redux/statistical-analysis-of-database_redux/years_redux/years_action";
import {
  isStringOnlyNumbers,
  persianDigits,
  persianMonth,
} from "../../utils/utils";
import moment from "jalali-moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Loading from "../../utils/loading/loading";
import { getMonthsAnalysisListFunction } from "../../redux/statistical-analysis-of-database_redux/months_redux/months_action";
import { getDaysAnalysisListFunction } from "../../redux/statistical-analysis-of-database_redux/days_redux/days_action";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

function StatisticalAnalysisOfDatabase() {
  const dispatch = useDispatch();
  const yearsAnalysis = useSelector((state) => state.yearsAnalysisListState);
  const monthsAnalysis = useSelector((state) => state.monthsAnalysisListState);
  const daysAnalysis = useSelector((state) => state.daysAnalysisListState);
  const [yearsLabel, setYearsLabel] = useState([]);
  const [yearsData, setYearsData] = useState([]);
  const [monthsLabel, setMonthsLabel] = useState([]);
  const [monthsData, setMonthsData] = useState([]);
  const [justMonthTextField, setJustMonthTextField] = useState("");
  const [daysLabel, setDaysLabel] = useState([]);
  const [daysData, setDaysData] = useState([]);
  const [justDaysTextField_year, setJustDaysTextField_year] = useState("");
  const [justDaysTextField_month, setJustDaysTextField_month] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  //   const startTimesList = useSelector((state) => state.flowStartTimesState);

  useEffect(() => {
    dispatch(getYearsAnalysisListFunction());
  }, []);

  useEffect(() => {
    setYearsData([]);
    setYearsLabel([]);
    yearsAnalysis.yearsData.map((e, index) => {
      if (index === yearsAnalysis.yearsData.length - 1 && isFirstLoad) {
        setJustMonthTextField(e._year);
        dispatch(getMonthsAnalysisListFunction(e._year));
      }
      setYearsLabel((oldArrays) => [...oldArrays, e._year]);
      setYearsData((oldArrays) => [...oldArrays, e.count]);
    });
  }, [yearsAnalysis.yearsData]);

  useEffect(() => {
    setMonthsData([]);
    setMonthsLabel([]);
    monthsAnalysis.monthsData.map((e, index) => {
      if (index === monthsAnalysis.monthsData.length - 1 && isFirstLoad) {
        setJustDaysTextField_year(yearsAnalysis.lastYear);
        setJustDaysTextField_month({
          label: persianMonth(e._month),
          value: e._month,
        });
        dispatch(getDaysAnalysisListFunction(yearsAnalysis.lastYear, e._month));
        setIsFirstLoad(false);
      }
      setMonthsLabel((oldArrays) => [...oldArrays, persianMonth(e._month)]);
      setMonthsData((oldArrays) => [...oldArrays, e.count]);
    });
  }, [monthsAnalysis.monthsData]);

  useEffect(() => {
    setDaysData([]);
    setDaysLabel([]);
    daysAnalysis.daysData.map((e) => {
      setDaysLabel((oldArrays) => [...oldArrays, persianDigits(e._day)]);
      setDaysData((oldArrays) => [...oldArrays, e.count]);
    });
  }, [daysAnalysis.daysData]);

  return (
    <Container>
      <Text text={"پردازش های من"} fontSize="20px" fontWeight={700}></Text>
      <BoxContainer>
        <ChartContainer>
          <RowTitle>
            <Text text={"آمار سالیانه"} fontSize="23px"></Text>
          </RowTitle>
          {!yearsAnalysis.loading && yearsAnalysis.error.length === 0 ? (
            <>
              <Center>
                <Bar
                  data={{
                    labels: yearsLabel,
                    datasets: [
                      {
                        data: yearsData,
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
                  text={"آمار سالیانه"}
                  fontSize={"15px"}
                  fontWeight={500}
                />
              </RowBottom>
            </>
          ) : yearsAnalysis.loading ? (
            <Center>
              <Loading></Loading>
            </Center>
          ) : (
            <Center>
              <Text text={yearsAnalysis.error} />
            </Center>
          )}
        </ChartContainer>
        <ChartContainer>
          <RowTitle>
            <Text text={"آمار ماهیانه"} fontSize="23px"></Text>
            <SearchContainer>
              <TextField
                width="150px"
                value={justMonthTextField}
                onChange={(event) => {
                  setJustMonthTextField(event.target.value);
                }}
              ></TextField>
              <ButtonContainer>
                <CustomButton
                  width="90px"
                  label={"نمایش"}
                  onClick={() => {
                    if (isStringOnlyNumbers(justMonthTextField)) {
                      if (parseInt(justMonthTextField) < 2100) {
                        dispatch(
                          getMonthsAnalysisListFunction(justMonthTextField)
                        );
                      }
                    }
                  }}
                ></CustomButton>
              </ButtonContainer>
            </SearchContainer>
          </RowTitle>
          {!monthsAnalysis.loading &&
          monthsAnalysis.error.length === 0 &&
          !yearsAnalysis.loading ? (
            <>
              <Center>
                <Bar
                  data={{
                    labels: monthsLabel,
                    datasets: [
                      {
                        data: monthsData,
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
          ) : monthsAnalysis.loading || yearsAnalysis.loading ? (
            <Center>
              <Loading></Loading>
            </Center>
          ) : (
            <Center>
              <Text
                text={
                  monthsAnalysis.error.length > 0
                    ? monthsAnalysis.error
                    : yearsAnalysis.error.length > 0
                    ? yearsAnalysis.error
                    : "خطا"
                }
              />
            </Center>
          )}
        </ChartContainer>
        <ChartContainer>
          <RowTitle>
            <Text text={"آمار روزانه"} fontSize="23px"></Text>
            <SearchContainer>
              <TextField
                width="150px"
                value={justDaysTextField_year}
                onChange={(event) => {
                  setJustDaysTextField_year(event.target.value);
                }}
              ></TextField>
              <DropDown
                width="200px"
                inClearable={false}
                defaultValue={justDaysTextField_month}
                onChange={(value) => {
                  setJustDaysTextField_month(value);
                }}
                value={[
                  { label: "فروردین", value: "1" },
                  { label: "اردیبهشت", value: "2" },
                  { label: "خرداد", value: "3" },
                  { label: "تیر", value: "4" },
                  { label: "مرداد", value: "5" },
                  { label: "شهریور", value: "6" },
                  { label: "مهر", value: "7" },
                  { label: "آبان", value: "8" },
                  { label: "آذر", value: "9" },
                  { label: "دی", value: "10" },
                  { label: "بهمن", value: "11" },
                  { label: "اسفند", value: "12" },
                ]}
              ></DropDown>
              <ButtonContainer>
                <CustomButton
                  width="90px"
                  label={"نمایش"}
                  onClick={() => {
                    if (isStringOnlyNumbers(justDaysTextField_year)) {
                      if (parseInt(justDaysTextField_year) < 2100) {
                        dispatch(
                          getDaysAnalysisListFunction(
                            justDaysTextField_year,
                            justDaysTextField_month.value
                          )
                        );
                      }
                    }
                  }}
                ></CustomButton>
              </ButtonContainer>
            </SearchContainer>
          </RowTitle>
          {!daysAnalysis.loading && daysAnalysis.error.length === 0 ? (
            <>
              <Center>
                <Bar
                  data={{
                    labels: daysLabel,
                    datasets: [
                      {
                        data: daysData,
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
          ) : daysAnalysis.loading ? (
            <Center>
              <Loading></Loading>
            </Center>
          ) : (
            <Center>
              <Text text={daysAnalysis.error} />
            </Center>
          )}
        </ChartContainer>
      </BoxContainer>
    </Container>
  );
}

export default StatisticalAnalysisOfDatabase;

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

const SearchContainer = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding-top: 20px;
`;

const ButtonContainer = styled.div`
  margin-right: 10px;
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
