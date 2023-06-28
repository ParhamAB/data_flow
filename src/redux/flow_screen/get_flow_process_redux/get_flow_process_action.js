import getFlowProcessListService from "../../../service/flow_process_screen/get_flow_process_Service/get_flow_process_service.ts";

export const callFlowServiceProcessRequest = () => {
  return { type: "FLOW_PROCESS_SERVICE_REQUEST" };
};

export const callFlowServiceProcessSucceed = (list) => {
  return { type: "FLOW_PROCESS_SERVICE_SUCCEED", payload: list };
};

export const callFlowServiceProcessFailed = (error) => {
  return { type: "FLOW_PROCESS_SERVICE_FAILED", payload: error };
};

export const getFlowProcessListFunction = (
  status,
  startDate,
  title,
  offset
) => {
  return async (dispatch) => {
    dispatch(callFlowServiceProcessRequest());
    try {
      var req = await getFlowProcessListService(
        status,
        startDate,
        title,
        offset
      );
      dispatch(callFlowServiceProcessSucceed(req.data));
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(callFlowServiceProcessFailed(error.response.data.message));
      } else {
        dispatch(
          callFlowServiceProcessFailed(
            "خطایی در برقراری ارتباط با سرور رخ داده است."
          )
        );
      }
    } finally {
    }
  };
};
