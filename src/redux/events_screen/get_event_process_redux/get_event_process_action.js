import getEventProcessListService from "../../../service/event_process_screen/get_event_process_service/get_event_process_service.ts";

export const callEventServiceProcessRequest = () => {
  return { type: "EVENT_PROCESS_SERVICE_REQUEST" };
};

export const callEventServiceProcessSucceed = (list) => {
  return { type: "EVENT_PROCESS_SERVICE_SUCCEED", payload: list };
};

export const callEventServiceProcessFailed = (error) => {
  return { type: "EVENT_PROCESS_SERVICE_FAILED", payload: error };
};

export const getEventProcessListFunction = (
  status,
  startDate,
  title,
  offset,
  limit = 15
) => {
  return async (dispatch) => {
    dispatch(callEventServiceProcessRequest());
    try {
      var req = await getEventProcessListService(
        status,
        startDate,
        title,
        offset,
        limit
      );
      dispatch(callEventServiceProcessSucceed(req.data));
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(callEventServiceProcessFailed(error.response.data.message));
      } else {
        dispatch(
          callEventServiceProcessFailed(
            "خطایی در برقراری ارتباط با سرور رخ داده است."
          )
        );
      }
    } finally {
    }
  };
};
