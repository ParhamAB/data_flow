import getEventChartService from "../../../service/event_process_screen/get_events_chart_service/get_event_chart_service.ts";

export const eventChartRequest = () => {
  return { type: "EVENT_CHART_SERVICE_REQUEST" };
};

export const eventChartModelZeroSucceed = (list) => {
  return { type: "EVENT_CHART_MODEL_ZERO_SERVICE_SUCCEED", payload: list };
};

export const eventChartModelOneSucceed = (list) => {
  return { type: "EVENT_CHART_MODEL_ONE_SERVICE_SUCCEED", payload: list };
};

export const eventChartFailed = (error) => {
  return { type: "EVENT_CHART_SERVICE_FAILED", payload: error };
};

export const getEventChartFunction = (id_event_process) => {
  return async (dispatch) => {
    dispatch(eventChartRequest());
    try {
      var req = await getEventChartService(id_event_process, 0);
      dispatch(eventChartModelZeroSucceed(req.data));
      var req2 = await getEventChartService(id_event_process, 1);
      dispatch(eventChartModelOneSucceed(req2.data));
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(eventChartFailed(error.response.data.message));
      } else {
        dispatch(
          eventChartFailed("خطایی در برقراری ارتباط با سرور رخ داده است.")
        );
      }
    } finally {
    }
  };
};
