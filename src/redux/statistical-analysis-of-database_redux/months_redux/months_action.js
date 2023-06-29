import getStatisticalAnalysisService from "../../../service/statistical-analysis-of-database_service/statistical-analysis-of-database_service.ts";

export const withMonthRequest = () => {
  return { type: "MONTH_ANALYSIS_SERVICE_REQUEST" };
};

export const withMonthSucceed = (list) => {
  return { type: "MONTH_ANALYSIS_SERVICE_SUCCEED", payload: list };
};

export const withMonthFailed = (error) => {
  return { type: "MONTH_ANALYSIS_SERVICE_FAILED", payload: error };
};
export const getMonthsAnalysisListFunction = (year) => {
  return async (dispatch) => {
    dispatch(withMonthRequest());
    try {
      var req = await getStatisticalAnalysisService(year, 0);
      dispatch(withMonthSucceed(req.data));
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(withMonthFailed(error.response.data.message));
      } else {
        dispatch(
          withMonthFailed("خطایی در برقراری ارتباط با سرور رخ داده است.")
        );
      }
    } finally {
    }
  };
};
