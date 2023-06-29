import getFlowProcessInfoService from "../../../../service/flow_process_screen/get_flow_process_by_id_service/get_flow_process_info_by_id_service.ts";

export const callFlowGetProcessInfoRequest = () => {
  return { type: "FLOW_PROCESS_INFO_SERVICE_REQUEST" };
};

export const callFlowGetProcessInfoSucceed = (list) => {
  return { type: "FLOW_PROCESS_INFO_SERVICE_SUCCEED", payload: list };
};

export const callFlowGetProcessInfoFailed = (error) => {
  return { type: "FLOW_PROCESS_INFO_SERVICE_FAILED", payload: error };
};

export const getFlowProcessInfoListFunction = (id) => {
  return async (dispatch) => {
    dispatch(callFlowGetProcessInfoRequest());
    try {
      var req = await getFlowProcessInfoService(id);
      dispatch(callFlowGetProcessInfoSucceed(req.data));
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(callFlowGetProcessInfoFailed(error.response.data.message));
      } else {
        dispatch(
          callFlowGetProcessInfoFailed(
            "خطایی در برقراری ارتباط با سرور رخ داده است."
          )
        );
      }
    } finally {
    }
  };
};
