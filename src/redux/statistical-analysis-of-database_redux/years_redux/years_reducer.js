const initialState = {
  loadingYears: false,
  yearsData: [],
  lastYear: "",
  error: "",
};

const getYearsAnalysisListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "YEAR_ANALYSIS_SERVICE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "YEAR_ANALYSIS_SERVICE_SUCCEED":
      return {
        loading: false,
        yearsData: action.payload !== undefined ? action.payload : [],
        lastYear: action.lastYear !== undefined ? action.lastYear : "",
        error: "",
      };
    case "YEAR_ANALYSIS_SERVICE_FAILED":
      return {
        loading: false,
        yearsData: [],
        lastYear: "",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getYearsAnalysisListReducer;
