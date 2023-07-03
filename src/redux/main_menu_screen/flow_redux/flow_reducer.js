const initialState = {
  loading: false,
  flowChartList: [],
  error: "",
};

const flowChartMainMenuListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_FLOW_CHART_SERVICE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_FLOW_CHART_SERVICE_SUCCEED":
      return {
        loading: false,
        flowChartList: action.payload !== undefined ? action.payload : [],
        error: "",
      };
    case "GET_FLOW_CHART_SERVICE_FAILED":
      return {
        loading: false,
        flowChartList: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default flowChartMainMenuListReducer;
