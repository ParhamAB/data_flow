import getStatisticalAnalysisService from "../../../service/statistical-analysis-of-database_service/statistical-analysis-of-database_service.ts";

export const withYearRequest = () => {
  return { type: "YEAR_ANALYSIS_SERVICE_REQUEST" };
};

export const withYearSucceed = (list, lastYear) => {
  return {
    type: "YEAR_ANALYSIS_SERVICE_SUCCEED",
    payload: list,
    lastYear: lastYear,
  };
};

export const withYearFailed = (error) => {
  return { type: "YEAR_ANALYSIS_SERVICE_FAILED", payload: error };
};
export const getYearsAnalysisListFunction = () => {
  return async (dispatch) => {
    dispatch(withYearRequest());
    try {
      var req = await getStatisticalAnalysisService(0, 0);
      dispatch(withYearSucceed(req.data, req.data[req.data.length - 1]._year));
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(withYearFailed(error.response.data.message));
      } else {
        dispatch(
          withYearFailed("خطایی در برقراری ارتباط با سرور رخ داده است.")
        );
      }
    } finally {
    }
  };
};
