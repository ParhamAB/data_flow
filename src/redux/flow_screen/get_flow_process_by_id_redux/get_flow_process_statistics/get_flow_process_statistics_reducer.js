const initialState = {
  loading: false,
  flowStatisticsProcessList: [],
  error: "",
};

const getFlowProcessStatisticsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FLOW_PROCESS_STATISTICS_SERVICE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FLOW_PROCESS_STATISTICS_SERVICE_SUCCEED":
      return {
        loading: false,
        flowStatisticsProcessList:
          action.payload !== undefined ? action.payload : [],
        error: "",
      };
    case "FLOW_PROCESS_STATISTICS_SERVICE_FAILED":
      return {
        loading: false,
        flowStatisticsProcessList: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getFlowProcessStatisticsListReducer;
