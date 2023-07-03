const initialState = {
  loading: false,
  eventChartModelZeroList: [],
  eventChartModelOneList: [],
  error: "",
};

const eventChartListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EVENT_CHART_SERVICE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "EVENT_CHART_MODEL_ZERO_SERVICE_SUCCEED":
      return {
        ...state,
        loading: false,
        eventChartModelZeroList:
          action.payload !== undefined ? action.payload : [],
        error: "",
      };
    case "EVENT_CHART_MODEL_ONE_SERVICE_SUCCEED":
      return {
        ...state,
        loading: false,
        eventChartModelOneList:
          action.payload !== undefined ? action.payload : [],
        error: "",
      };
    case "EVENT_CHART_SERVICE_FAILED":
      return {
        loading: false,
        eventChartModelZeroList: [],
        eventChartModelOneList: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default eventChartListReducer;
