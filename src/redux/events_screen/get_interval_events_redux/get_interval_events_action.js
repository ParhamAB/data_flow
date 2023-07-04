import getIntervalEventsService from "../../../service/event_process_screen/get_interval_events_service/get_interval_events_service.ts";

export const callEventIntervalRequest = () => {
  return { type: "EVENT_INTERVAL_SERVICE_REQUEST" };
};

export const callEventIntervalSucceed = (list) => {
  return { type: "EVENT_INTERVAL_SERVICE_SUCCEED", payload: list };
};

export const callEventIntervalFailed = (error) => {
  return { type: "EVENT_INTERVAL_SERVICE_FAILED", payload: error };
};

export const getEventIntervalListFunction = (id_model) => {
  return async (dispatch) => {
    dispatch(callEventIntervalRequest());
    try {
      var req = await getIntervalEventsService(id_model);
      dispatch(callEventIntervalSucceed(req.data));
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(callEventIntervalFailed(error.response.data.message));
      } else {
        dispatch(
          callEventIntervalFailed(
            "خطایی در برقراری ارتباط با سرور رخ داده است."
          )
        );
      }
    } finally {
    }
  };
};
