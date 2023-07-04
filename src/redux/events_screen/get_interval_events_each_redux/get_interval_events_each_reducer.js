const initialState = {
  loading: false,
  eventIntervalsDataEachList: [],
  error: "",
};

const eventIntervalsDataEachListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EVENT_INTERVAL_EACH_SERVICE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "EVENT_INTERVAL_EACH_SERVICE_SUCCEED":
      return {
        loading: false,
        eventIntervalsDataEachList:
          action.payload !== undefined ? action.payload : [],
        error: "",
      };
    case "EVENT_INTERVAL_EACH_SERVICE_FAILED":
      return {
        loading: false,
        eventIntervalsDataEachList: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default eventIntervalsDataEachListReducer;
