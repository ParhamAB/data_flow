import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Text } from "../../utils/widgets/widgets";
import { useDispatch, useSelector } from "react-redux";
import Theme from "../../theme/theme";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import ArrowLeftIcon from "../../utils/icons/arrow_next_or_prev";
import { getMediaListFunction } from "../../redux/main_menu_screen/media_redux/media_action";
import { persianDigits } from "../../utils/utils";
import SwapIcon from "../../utils/icons/navbar_icons/swap_icon";
import ShowIcon from "../../utils/icons/show_icon";
import ChatIcon from "../../utils/icons/chat_icon";
import LikeIcon from "../../utils/icons/like_icon";
import ArrowLeftSquare from "../../utils/icons/arrow_left_square_icon";
import { getEventsNewsListFunction } from "../../redux/main_menu_screen/events_redux/events_action";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import moment from "jalali-moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getFlowChartMainMenuListFunction } from "../../redux/main_menu_screen/flow_redux/flow_action";
import { TagCloud } from "react-tagcloud";
import Loading from "../../utils/loading/loading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  PointElement,
  LineElement
);

function MainMenuScreen() {
  const dispatch = useDispatch();
  const getMediaList = useSelector((state) => state.mediaListState);
  const getEventsList = useSelector((state) => state.eventsNewsListState);
  const getFlowChartList = useSelector(
    (state) => state.flowChartMainMenuListState
  );
  const [_, setInit] = useState();
  const swiper = useSwiper();
  const prevNewsRef = useRef(null);
  const nextNewsRef = useRef(null);
  const prevEventRef = useRef(null);
  const nextEventRef = useRef(null);

  const [mediaList, setMediaList] = useState([]);
  const [eventNewsList, setEventNewsList] = useState([]);
  const [chartLabel, setChartLabel] = useState([]);
  const [chartData, setChartData] = useState([]);

  const options = {
    enableTooltip: true,
    deterministic: false,
    fontFamily: "iranSans",
    fontSizes: [5, 60],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: "1.2",
    spiral: "archimedean",
    transitionDuration: 1000,
  };

  useEffect(() => {
    setMediaList([]);
    dispatch(getMediaListFunction());
    dispatch(getEventsNewsListFunction());
    dispatch(getFlowChartMainMenuListFunction());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setMediaList([]);
    getMediaList.mediaList.map((e) => {
      setMediaList((oldArray) => [...oldArray, e]);
    });
  }, [getMediaList.mediaList]);

  useEffect(() => {
    setEventNewsList([]);
    getEventsList.eventsNewsList.map((e) => {
      let keys = [];
      e.keywords.map((e) => {
        let t1 = Object.keys(e);
        let t2 = Object.values(e);
        if (t1[0].length > 0) {
          keys.push({ value: t1[0], count: t2[0] });
        }
      });
      setEventNewsList((oldArray) => [
        ...oldArray,
        { item: e, keywordList: keys },
      ]);
    });
  }, [getEventsList.eventsNewsList]);

  useEffect(() => {
    setChartData([]);
    getFlowChartList.flowChartList.map((e, index) => {
      let red = Math.floor(Math.random() * 256);
      let green = Math.floor(Math.random() * 256);
      let blue = Math.floor(Math.random() * 256);
      let rgbColor = `rgb(${red}, ${green}, ${blue})`;
      let rgbColorOpacity = `rgb(${red}, ${green}, ${blue},0.5)`;
      let arr = [];
      e.event_chain.map((e) => {
        arr.push(e.Count);
      });
      setChartData((oldArray) => [
        ...oldArray,
        {
          id: index,
          label: "",
          data: arr,
          borderColor: rgbColor,
          backgroundColor: rgbColorOpacity,
        },
      ]);
      setMediaList((oldArray) => [...oldArray, e]);
    });
  }, [getFlowChartList.flowChartList]);

  return (
    <Container>
      <Text text={"صفحه اصلی"} fontSize="20px" fontWeight={700}></Text>
      <NewsContainer>
        <HotNewsContainer>
          {!getMediaList.loading ? (
            <>
              <CarouselContainer>
                <Swiper
                  style={{
                    width: "calc(100%)",
                    height: "calc(100%)",
                    boxSizing: "border-box",
                    position: "relative",
                  }}
                  navigation={{
                    prevEl: prevNewsRef.current,
                    nextEl: nextNewsRef.current,
                  }}
                  controller={swiper}
                  modules={[Navigation]}
                  onInit={() => setInit(true)}
                >
                  {mediaList.map((e) => {
                    return (
                      <SwiperSlide
                        style={{
                          width: "calc(100%)",
                          height: "calc(100%)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TitleItem></TitleItem>
                        <BottomItem>
                          <Description>
                            <TextDis>{e.tweet_text}</TextDis>
                          </Description>
                          <DesInfo>
                            <EachDesInfoContainer>
                              <Value>{persianDigits(e.retweet_count)}</Value>
                              <SwapIcon color={"#C7C9D9"} />
                            </EachDesInfoContainer>
                            <EachDesInfoContainer>
                              <Value>{persianDigits(e.retweet_count)}</Value>
                              <ShowIcon color={"#C7C9D9"} />
                            </EachDesInfoContainer>
                            <EachDesInfoContainer>
                              <Value>{persianDigits(e.reply_count)}</Value>
                              <ChatIcon color={"#C7C9D9"} />
                            </EachDesInfoContainer>
                            <EachDesInfoContainer>
                              <Value>{persianDigits(e.like_count)}</Value>
                              <LikeIcon color={"#C7C9D9"} />
                            </EachDesInfoContainer>
                          </DesInfo>
                        </BottomItem>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
                <NextButton ref={nextNewsRef}>
                  <ArrowLeftIcon />
                </NextButton>
                <PrevButton ref={prevNewsRef}>
                  <ArrowLeftIcon />
                </PrevButton>
              </CarouselContainer>
              <ButtonContainer>
                <ButtonShowAll>
                  <ButtonText>{"همه پیام های داغ"}</ButtonText>
                  <ArrowLeftSquare />
                </ButtonShowAll>
              </ButtonContainer>
            </>
          ) : (
            <Center>
              <Loading></Loading>
            </Center>
          )}
        </HotNewsContainer>
        <ImportantEventsContainer>
          {!getEventsList.loading ? (
            <>
              <CarouselContainer>
                <Swiper
                  style={{
                    width: "calc(100%)",
                    height: "calc(100%)",
                    boxSizing: "border-box",
                    position: "relative",
                  }}
                  navigation={{
                    prevEl: prevEventRef.current,
                    nextEl: nextEventRef.current,
                  }}
                  controller={swiper}
                  modules={[Navigation]}
                  onInit={() => setInit(true)}
                >
                  {eventNewsList.map((e) => {
                    return (
                      <SwiperSlide
                        style={{
                          width: "calc(100%)",
                          height: "calc(100%)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TitleItem>
                          <Tag>
                            <TagCloud tags={e.keywordList} />
                          </Tag>
                        </TitleItem>
                        <BottomItem>
                          <Description>
                            <TextDis>
                              {e.item.representative_documents.map((e) => {
                                return (
                                  <>
                                    <p>{e}</p>
                                    <br></br>
                                  </>
                                );
                              })}
                            </TextDis>
                          </Description>
                          <DesInfo>
                            <EventBottomItem>
                              <EventInfoTitle>{"تعداد پیام"}</EventInfoTitle>
                              <EventValue>
                                {persianDigits(e.item.count)}
                              </EventValue>
                            </EventBottomItem>
                            <Divider />
                            <EventBottomItem>
                              <EventInfoTitle>{"تعداد کاربر"}</EventInfoTitle>
                              <EventValue>
                                {persianDigits(
                                  e.item.influential_users !== null
                                    ? e.item.influential_users
                                    : 0
                                )}
                              </EventValue>
                            </EventBottomItem>
                            <Divider />
                            <EventBottomItem>
                              <EventInfoTitle>{"تاریخ رویداد"}</EventInfoTitle>
                              <EventValue>
                                {persianDigits(
                                  e.item.start_date_time !== null
                                    ? moment(e.item.start_date_time).format(
                                        "jYYYY/jMM/jDD"
                                      )
                                    : 0
                                )}
                              </EventValue>
                            </EventBottomItem>
                          </DesInfo>
                        </BottomItem>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
                <NextButton ref={nextEventRef}>
                  <ArrowLeftIcon />
                </NextButton>
                <PrevButton ref={prevEventRef}>
                  <ArrowLeftIcon />
                </PrevButton>
              </CarouselContainer>
              <ButtonContainer>
                <ButtonShowAll>
                  <ButtonText>{"همه رویداد های مهم"}</ButtonText>
                  <ArrowLeftSquare />
                </ButtonShowAll>
              </ButtonContainer>
            </>
          ) : (
            <Center>
              <Loading></Loading>
            </Center>
          )}
        </ImportantEventsContainer>
        <ImportantFlowsContainer>
          {!getFlowChartList.loading ? (
            <>
              <ChartContainer>
                <Line
                  data={{
                    labels: [0, 1],
                    datasets: chartData,
                  }}
                  options={{
                    locale: "fa",
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
              </ChartContainer>
              <ButtonContainer>
                <ButtonShowAll>
                  <ButtonText>{"همه جریان های مهم"}</ButtonText>
                  <ArrowLeftSquare />
                </ButtonShowAll>
              </ButtonContainer>
            </>
          ) : (
            <Center>
              <Loading></Loading>
            </Center>
          )}
        </ImportantFlowsContainer>
      </NewsContainer>
    </Container>
  );
}

export default MainMenuScreen;

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

const NewsContainer = styled.div`
  width: calc(100%);
  height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
`;

const HotNewsContainer = styled.div`
  width: calc(30%);
  height: 550px;
  display: flex;
  border: 1px solid ${Theme.fontColorInActive};
  border-radius: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  &::before {
    content: "پیام های داغ";
    position: absolute;
    top: 30px;
    font-size: 17px;
    color: ${Theme.fontColor};
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0px;
    width: 150px;
    height: 50px;
    z-index: 2;
    background-color: ${Theme.purpleColor};
  }

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-left: 27px solid transparent;
    border-right: 27px solid transparent;
    border-bottom: 50px solid ${Theme.purpleColor};
    top: 30px;
    right: 123px;
    z-index: 1;
    box-sizing: border-box;
    /* transform: rotate(90deg); */
  }
`;

const ImportantEventsContainer = styled.div`
  width: calc(30%);
  height: 550px;
  display: flex;
  border: 1px solid ${Theme.fontColorInActive};
  border-radius: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  &::before {
    content: "رویداد های مهم";
    position: absolute;
    top: 30px;
    font-size: 17px;
    color: ${Theme.fontColor};
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0px;
    width: 150px;
    height: 50px;
    z-index: 2;
    background-color: ${Theme.purpleColor};
  }

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-left: 27px solid transparent;
    border-right: 27px solid transparent;
    border-bottom: 50px solid ${Theme.purpleColor};
    top: 30px;
    right: 123px;
    z-index: 1;
    box-sizing: border-box;
    /* transform: rotate(90deg); */
  }
`;

const ImportantFlowsContainer = styled.div`
  width: calc(40%);
  height: 550px;
  display: flex;
  border: 1px solid ${Theme.fontColorInActive};
  border-radius: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding-inline: 15px;
  position: relative;

  &::before {
    content: "جریان های مهم";
    position: absolute;
    top: 30px;
    font-size: 17px;
    color: ${Theme.fontColor};
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0px;
    width: 150px;
    height: 50px;
    z-index: 2;
    background-color: ${Theme.purpleColor};
  }

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-left: 27px solid transparent;
    border-right: 27px solid transparent;
    border-bottom: 50px solid ${Theme.purpleColor};
    top: 30px;
    right: 123px;
    z-index: 1;
    box-sizing: border-box;
    /* transform: rotate(90deg); */
  }
`;

const CarouselContainer = styled.div`
  width: calc(100%);
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
`;

const NextButton = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 140px;
  left: 0px;
  cursor: pointer;
  z-index: 10;
`;

const PrevButton = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 140px;
  right: 0px;
  cursor: pointer;
  z-index: 10;
  transform: rotate(180deg);
`;

const TitleItem = styled.div`
  width: calc(100%);
  height: calc(55%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
`;

const BottomItem = styled.div`
  width: calc(100%);
  height: calc(45%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Description = styled.div`
  display: block;
  width: calc(100%);
  height: 55px;
  overflow: hidden;
  box-sizing: border-box;
  padding-inline: 15px;
`;

const TextDis = styled.p`
  display: block;
  font-size: 13px;
  text-align: justify;
  text-overflow: ellipsis;
  max-lines: 1;
  direction: rtl;
  color: ${Theme.fontColor};
`;

const DesInfo = styled.div`
  width: calc(100%);
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding-inline: 25px;
  margin-top: 40px;
`;

const EachDesInfoContainer = styled.div`
  width: 90px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Value = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-inline: 5px;
  box-sizing: border-box;
  padding-top: 2px;
  color: ${Theme.fontColor};
`;

const ButtonContainer = styled.div`
  width: calc(100%);
  height: 50px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding-inline: 15px;
`;

const ButtonShowAll = styled.div`
  width: fit-content;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: ${Theme.textFieldBorderRadius};
  align-items: center;
  cursor: pointer;
  transition: 300ms;
  color: ${Theme.fontColor};
  padding-inline: 10px;
  box-sizing: border-box;

  &:hover {
    background-color: ${Theme.secondBackGround};
  }
`;

const ButtonText = styled.div`
  margin-left: 10px;
  color: #c7c9d9;
  user-select: none;
`;

const Divider = styled.div`
  width: 1px;
  height: 40px;
  border-radius: 5px;
  background-color: ${Theme.fontColorInActive};
`;

const EventBottomItem = styled.div`
  width: calc(100% / 3 - 10px);
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const EventInfoTitle = styled.div`
  width: calc(100%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-family: "iranSans";
  color: ${Theme.fontColor};
  margin-bottom: 15px;
`;

const EventValue = styled.div`
  width: calc(100%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: ${Theme.fontColor};
`;

const ChartContainer = styled.div`
  width: calc(100%);
  height: calc(100% - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Tag = styled.div`
  width: calc(100%);
  height: calc(100%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Center = styled.div`
  width: calc(100%);
  height: calc(100%);
  display: flex;
  justify-content: center;
  align-items: center;
`;
