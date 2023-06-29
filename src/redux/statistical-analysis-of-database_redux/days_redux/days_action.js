import getStatisticalAnalysisService from "../../../service/statistical-analysis-of-database_service/statistical-analysis-of-database_service.ts";

export const withDaysRequest = () => {
  return { type: "DAY_ANALYSIS_SERVICE_REQUEST" };
};

export const withDaysSucceed = (list) => {
  return { type: "DAY_ANALYSIS_SERVICE_SUCCEED", payload: list };
};

export const withDaysFailed = (error) => {
  return { type: "DAY_ANALYSIS_SERVICE_FAILED", payload: error };
};
export const getDaysAnalysisListFunction = (year, month) => {
  return async (dispatch) => {
    dispatch(withDaysRequest());
    try {
      var req = await getStatisticalAnalysisService(year, month);
      dispatch(withDaysSucceed(req.data));
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(withDaysFailed(error.response.data.message));
      } else {
        dispatch(
          withDaysFailed("خطایی در برقراری ارتباط با سرور رخ داده است.")
        );
      }
    } finally {
    }
  };
};
