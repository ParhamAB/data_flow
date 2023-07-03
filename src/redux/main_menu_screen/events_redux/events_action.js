import getEventsNewsListService from "../../../service/main_menu_service/events_service/get_events_service.ts";

export const getEventsNewsRequest = () => {
  return { type: "GET_EVENTS_NEWS_SERVICE_REQUEST" };
};

export const getEventsNewsSucceed = (list) => {
  return { type: "GET_EVENTS_NEWS_SERVICE_SUCCEED", payload: list };
};

export const getEventsNewsFailed = (error) => {
  return { type: "GET_EVENTS_NEWS_SERVICE_FAILED", payload: error };
};

export const getEventsNewsListFunction = () => {
  return async (dispatch) => {
    dispatch(getEventsNewsRequest());
    try {
      var req = await getEventsNewsListService();
      dispatch(getEventsNewsSucceed(req.data));
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(getEventsNewsFailed(error.response.data.message));
      } else {
        dispatch(
          getEventsNewsFailed("خطایی در برقراری ارتباط با سرور رخ داده است.")
        );
      }
    } finally {
    }
  };
};
