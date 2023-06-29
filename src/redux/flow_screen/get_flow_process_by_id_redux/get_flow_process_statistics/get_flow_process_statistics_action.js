import getFlowProcessStatisticsService from "../../../../service/flow_process_screen/get_flow_process_by_id_service/get_flow_process_statistics_by_id_service.ts";

export const callFlowGetProcessStatisticsRequest = () => {
  return { type: "FLOW_PROCESS_STATISTICS_SERVICE_REQUEST" };
};

export const callFlowGetProcessStatisticsSucceed = (list) => {
  return { type: "FLOW_PROCESS_STATISTICS_SERVICE_SUCCEED", payload: list };
};

export const callFlowGetProcessStatisticsFailed = (error) => {
  return { type: "FLOW_PROCESS_STATISTICS_SERVICE_FAILED", payload: error };
};

export const getFlowProcessStatisticsListFunction = (id) => {
  return async (dispatch) => {
    dispatch(callFlowGetProcessStatisticsRequest());
    try {
      var req = await getFlowProcessStatisticsService(id);
      dispatch(callFlowGetProcessStatisticsSucceed(req.data));
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(
          callFlowGetProcessStatisticsFailed(error.response.data.message)
        );
      } else {
        dispatch(
          callFlowGetProcessStatisticsFailed(
            "خطایی در برقراری ارتباط با سرور رخ داده است."
          )
        );
      }
    } finally {
    }
  };
};
