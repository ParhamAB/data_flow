import getFlowsNewsListService from "../../../service/main_menu_service/flows_service/get_flows_service.ts";

export const getFlowChartRequest = () => {
  return { type: "GET_FLOW_CHART_SERVICE_REQUEST" };
};

export const getFlowChartSucceed = (list) => {
  return { type: "GET_FLOW_CHART_SERVICE_SUCCEED", payload: list };
};

export const getFlowChartFailed = (error) => {
  return { type: "GET_FLOW_CHART_SERVICE_FAILED", payload: error };
};

export const getFlowChartMainMenuListFunction = () => {
  return async (dispatch) => {
    dispatch(getFlowChartRequest());
    try {
      var req = await getFlowsNewsListService();
      dispatch(getFlowChartSucceed(req.data));
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(getFlowChartFailed(error.response.data.message));
      } else {
        dispatch(
          getFlowChartFailed("خطایی در برقراری ارتباط با سرور رخ داده است.")
        );
      }
    } finally {
    }
  };
};
