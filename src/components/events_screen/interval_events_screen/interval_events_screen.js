import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Text } from "../../../utils/widgets/widgets";
import TextField from "../../../utils/text_field/text_field";
import DropDown from "../../../utils/drop_down/drop_down";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import moment from "jalali-moment";
import { getRandomColor, persianDigits } from "../../../utils/utils";
import moment from "jalali-moment";
import { getEventIntervalListFunction } from "../../../redux/events_screen/get_interval_events_redux/get_interval_events_action";
import CustomButton from "../../../utils/custom_button/custom_button";
import ShowIcon from "../../../utils/icons/show_icon";
import { getEventIntervalEachListFunction } from "../../../redux/events_screen/get_interval_events_each_redux/get_interval_events_each_action";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import ArrowLeftIcon from "../../../utils/icons/arrow_next_or_prev";
import { TagCloud } from "react-tagcloud";
import Theme from "../../../theme/theme";

function EventIntervalEventsScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const eventInterval = useSelector((state) => state.eventIntervalListState);
  const eachEventInterval = useSelector(
    (state) => state.eventIntervalsDataEachListState
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timing, setTiming] = useState("");
  const [selectedEventRange, setSelectedEventRange] = useState(null);
  const [eventRange, setEventRange] = useState([]);
  const [eachEventRange, setEachEventRange] = useState([]);
  const [_, setInit] = useState();
  const swiper = useSwiper();
  const prevNewsRef = useRef(null);
  const nextNewsRef = useRef(null);
  const [indexPm, setIndexPm] = useState(0);

  useEffect(() => {
    dispatch(getEventIntervalListFunction(id));
  }, []);

  useEffect(() => {
    setEachEventRange([]);
    setEventRange([]);
    if (
      eventInterval &&
      eventInterval.eventIntervalList &&
      eventInterval.eventIntervalList[0]
    ) {
      setStartDate(
        persianDigits(
          moment(
            eventInterval.eventIntervalList[0].process_info[0].start_date_time
          ).format("jYYYY/jMM/jDD") +
            " " +
            moment(
              eventInterval.eventIntervalList[0].process_info[0].start_date_time
            ).format("HH:mm")
        )
      );
      setEndDate(
        persianDigits(
          moment(
            eventInterval.eventIntervalList[0].process_info[0].end_date_time
          ).format("jYYYY/jMM/jDD") +
            " " +
            moment(
              eventInterval.eventIntervalList[0].process_info[0].end_date_time
            ).format("HH:mm")
        )
      );
      let type = eventInterval.eventIntervalList[0].window_type;
      setTiming(
        type === "hours"
          ? "ساعت"
          : type === "weeks"
          ? "هفته"
          : type === "days"
          ? "روز"
          : "دقیقه"
      );
      setEventRange([]);
      eventInterval.eventIntervalList[0].model_info.map((e) => {
        setEventRange((oldArray) => [
          ...oldArray,
          {
            label: `شماره ${e.id_model} : از ${persianDigits(
              moment(e.start_date_time).format("jYYYY/jMM/jDD")
            )} تا ${persianDigits(
              moment(e.end_date_time).format("jYYYY/jMM/jDD")
            )} `,
            value: e.id_model,
          },
        ]);
      });
    }
  }, [eventInterval.eventIntervalList]);

  useEffect(() => {
    setEachEventRange([]);
    eachEventInterval.eventIntervalsDataEachList.map((e, index) => {
      let temp = [];
      e.keywords.map((e) => {
        temp.push({ value: Object.keys(e)[0], count: Object.values(e)[0] });
      });
      setEachEventRange((oldArray) => [
        ...oldArray,
        {
          wordCloud: temp,
          pmCount: e.count,
          index: index,
          notes: e.representative_documents,
          influence: e.influential_users,
        },
      ]);
    });
  }, [eachEventInterval.eventIntervalsDataEachList]);

  return (
    <Container>
      <Text
        text={"نمایش بازه ای رویداد ها"}
        fontSize="20px"
        fontWeight={700}
      ></Text>
      <SearchForm>
        <BoxContainer>
          <DropDown
            width={"400px"}
            label={"انتخاب بازه رویداد"}
            isSearchable={true}
            defaultValue={selectedEventRange}
            value={eventRange}
            onChange={(value) => {
              setSelectedEventRange(value);
            }}
          ></DropDown>
        </BoxContainer>

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
          <TextField label={"تقسیم بندی"} value={timing} disabled></TextField>
        </BoxContainer>
        <ButtonContainer>
          <CustomButton
            label={"نمایش"}
            icon={<ShowIcon />}
            onClick={() => {
              if (selectedEventRange !== null) {
                dispatch(
                  getEventIntervalEachListFunction(selectedEventRange.value)
                );
              }
            }}
          ></CustomButton>
        </ButtonContainer>
      </SearchForm>
      <BottomContainer>
        <CarouselContainer>
          <Swiper
            style={{
              width: "calc(100%)",
              height: "500px",
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
            spaceBetween={50}
            slidesPerView={3}
          >
            {eachEventRange.map((e) => {
              return (
                <StyledSliderSwiper
                  style={{
                    width: "calc(100%)",
                    height: "calc(95%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    setIndexPm(e.index);
                  }}
                >
                  <WordCloudContainer>
                    <TagCloud
                      minSize={12}
                      maxSize={35}
                      tags={e.wordCloud}
                      className="wordCloud"
                    />
                  </WordCloudContainer>
                  <Text text={`تعداد پیام های مرتبط : ${e.pmCount}`}></Text>
                </StyledSliderSwiper>
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
        <NotesContainer>
          <PmContainer>
            {eachEventRange[indexPm]
              ? eachEventRange[indexPm].notes.map((e) => {
                  return (
                    <PmContainerEach>
                      <Divider color={getRandomColor()}></Divider>
                      {e}
                    </PmContainerEach>
                  );
                })
              : null}
          </PmContainer>
          <InfluenceContainer>
            {eachEventRange[indexPm]
              ? eachEventRange[indexPm].influence.map((e) => {
                  return <PmContainerEach>{e}</PmContainerEach>;
                })
              : null}
          </InfluenceContainer>
        </NotesContainer>
      </BottomContainer>
    </Container>
  );
}

export default EventIntervalEventsScreen;

const Container = styled.div`
  min-height: calc(100%);
  max-height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-inline: 40px;
  padding-top: 10px;
  overflow-y: auto;
  box-sizing: border-box;
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
  min-width: 280px;
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 10px;
  margin-bottom: 15px;
`;

const ButtonContainer = styled.div`
  width: calc(100%);
  height: 70px;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
`;

const BottomContainer = styled.div`
  width: calc(100%);
  height: max-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 50px;
  z-index: 0;
`;

const WordCloudContainer = styled.div`
  width: 350px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .wordCloud {
    width: calc(100%);
    height: calc(95%);
    object-fit: contain;
    overflow: hidden;
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

const StyledSliderSwiper = styled(SwiperSlide)`
  width: calc(100% / 3 - 25px);
  height: calc(100% - 80px);
  background-color: transparent;
  border-radius: ${Theme.textFieldBorderRadius};
  transition: 300ms;

  &:hover {
    background-color: ${Theme.secondBackGround};
    transition: 300ms;
    scale: 1.04;
  }
`;

const NotesContainer = styled.div`
  width: calc(100%);
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const PmContainer = styled.div`
  width: calc(100% / 2 - 30px);
  height: fit-content;
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

const InfluenceContainer = styled.div`
  width: calc(100% / 2 - 30px);
  height: max-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
