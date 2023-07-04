import getIntervalEventsEachService from "../../../service/event_process_screen/get_interval_events_each_service/get_interval_events_each_service.ts";

export const callEventIntervalEachRequest = () => {
  return { type: "EVENT_INTERVAL_EACH_SERVICE_REQUEST" };
};

export const callEventIntervalEachSucceed = (list) => {
  return { type: "EVENT_INTERVAL_EACH_SERVICE_SUCCEED", payload: list };
};

export const callEventIntervalEachFailed = (error) => {
  return { type: "EVENT_INTERVAL_EACH_SERVICE_FAILED", payload: error };
};

export const getEventIntervalEachListFunction = (id_model) => {
  return async (dispatch) => {
    dispatch(callEventIntervalEachRequest());
    try {
      var req = await getIntervalEventsEachService(id_model);
      dispatch(callEventIntervalEachSucceed(req.data));
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(callEventIntervalEachFailed(error.response.data.message));
      } else {
        dispatch(
          callEventIntervalEachFailed(
            "خطایی در برقراری ارتباط با سرور رخ داده است."
          )
        );
      }
    } finally {
    }
  };
};
