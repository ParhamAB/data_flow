const initialState = {
  loadingYears: false,
  daysData: [],
  error: "",
};

const getDaysAnalysisListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DAY_ANALYSIS_SERVICE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "DAY_ANALYSIS_SERVICE_SUCCEED":
      return {
        loading: false,
        daysData: action.payload !== undefined ? action.payload : [],
        error: "",
      };
    case "DAY_ANALYSIS_SERVICE_FAILED":
      return {
        loading: false,
        daysData: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getDaysAnalysisListReducer;
