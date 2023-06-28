import getProcessListService from "../../service/my_process_service/my_process_service.ts";

export const callServiceProcessRequest = () => {
  return { type: "PROCESS_SERVICE_REQUEST" };
};

export const callServiceProcessSucceed = (list) => {
  return { type: "PROCESS_SERVICE_SUCCEED", payload: list };
};

export const callServiceProcessFailed = (error) => {
  return { type: "PROCESS_SERVICE_FAILED", payload: error };
};

export const getProcessListFunction = (type, startDate, title, offset) => {
  return async (dispatch) => {
    dispatch(callServiceProcessRequest());
    try {
      var req = await getProcessListService(type, startDate, title, offset);
      dispatch(callServiceProcessSucceed(req.data));
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(callServiceProcessFailed(error.response.data.message));
      } else {
        dispatch(
          callServiceProcessFailed(
            "خطایی در برقراری ارتباط با سرور رخ داده است."
          )
        );
      }
    } finally {
    }
  };
};
