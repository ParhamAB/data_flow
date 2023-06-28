import getFlowStartTimeListService from "../../../service/flow_process_screen/flow_start_time_service/flow_start_time_service.ts";

export const flowStartTimeRequest = () => {
  return { type: "FLOW_START_TIME_SERVICE_REQUEST" };
};

export const flowStartTimeSucceed = (list) => {
  return { type: "FLOW_START_TIME_SERVICE_SUCCEED", payload: list };
};

export const flowStartTimeFailed = (error) => {
  return { type: "FLOW_START_TIME_SERVICE_FAILED", payload: error };
};

export const getFlowStartTimesListFunction = () => {
  return async (dispatch) => {
    dispatch(flowStartTimeRequest());
    try {
      var req = await getFlowStartTimeListService();
      if (req.data.length > 0) {
        const uniqueArr = req.data.filter((item, index) => {
          const i = req.data.findIndex(
            (t) => t.start_date_time === item.start_date_time
          );
          return index === i;
        });
        dispatch(flowStartTimeSucceed(uniqueArr));
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(flowStartTimeFailed(error.response.data.message));
      } else {
        dispatch(
          flowStartTimeFailed("خطایی در برقراری ارتباط با سرور رخ داده است.")
        );
      }
    } finally {
    }
  };
};
