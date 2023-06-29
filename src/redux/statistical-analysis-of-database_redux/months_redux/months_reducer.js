const initialState = {
  loadingYears: false,
  monthsData: [],
  error: "",
};

const getMonthsAnalysisListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MONTH_ANALYSIS_SERVICE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "MONTH_ANALYSIS_SERVICE_SUCCEED":
      return {
        loading: false,
        monthsData: action.payload !== undefined ? action.payload : [],
        error: "",
      };
    case "MONTH_ANALYSIS_SERVICE_FAILED":
      return {
        loading: false,
        monthsData: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getMonthsAnalysisListReducer;
