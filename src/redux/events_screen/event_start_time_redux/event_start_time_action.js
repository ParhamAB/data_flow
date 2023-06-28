import getEventStartTimeListService from "../../../service/event_process_screen/event_start_time_service/event_start_time_service.ts";

export const eventStartTimeRequest = () => {
  return { type: "EVENT_START_TIME_SERVICE_REQUEST" };
};

export const eventStartTimeSucceed = (list) => {
  return { type: "EVENT_START_TIME_SERVICE_SUCCEED", payload: list };
};

export const eventStartTimeFailed = (error) => {
  return { type: "EVENT_START_TIME_SERVICE_FAILED", payload: error };
};

export const getEventStartTimesListFunction = () => {
  return async (dispatch) => {
    dispatch(eventStartTimeRequest());
    try {
      var req = await getEventStartTimeListService();
      if (req.data.length > 0) {
        const uniqueArr = req.data.filter((item, index) => {
          const i = req.data.findIndex(
            (t) => t.start_date_time === item.start_date_time
          );
          return index === i;
        });
        dispatch(eventStartTimeSucceed(uniqueArr));
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(eventStartTimeFailed(error.response.data.message));
      } else {
        dispatch(
          eventStartTimeFailed("خطایی در برقراری ارتباط با سرور رخ داده است.")
        );
      }
    } finally {
    }
  };
};
