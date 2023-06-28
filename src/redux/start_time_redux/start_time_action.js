import getStartTimeListService from "../../service/start_time_service/start_time_service.ts";

export const startTimeRequest = () => {
  return { type: "START_TIME_SERVICE_REQUEST" };
};

export const startTimeSucceed = (list) => {
  return { type: "START_TIME_SERVICE_SUCCEED", payload: list };
};

export const startTimeFailed = (error) => {
  return { type: "START_TIME_SERVICE_FAILED", payload: error };
};

export const getStartTimesListFunction = () => {
  return async (dispatch) => {
    dispatch(startTimeRequest());
    try {
      var req = await getStartTimeListService();
      if (req.data.length > 0) {
        const uniqueArr = req.data.filter((item, index) => {
          const i = req.data.findIndex(
            (t) => t.start_date_time === item.start_date_time
          );
          return index === i;
        });
        dispatch(startTimeSucceed(uniqueArr));
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(startTimeFailed(error.response.data.message));
      } else {
        dispatch(
          startTimeFailed("خطایی در برقراری ارتباط با سرور رخ داده است.")
        );
      }
    } finally {
    }
  };
};
