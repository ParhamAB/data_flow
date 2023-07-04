const initialState = {
  loading: false,
  eventIntervalList: [],
  error: "",
};

const eventIntervalListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EVENT_INTERVAL_SERVICE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "EVENT_INTERVAL_SERVICE_SUCCEED":
      return {
        loading: false,
        eventIntervalList: action.payload !== undefined ? action.payload : [],
        error: "",
      };
    case "EVENT_INTERVAL_SERVICE_FAILED":
      return {
        loading: false,
        eventIntervalList: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default eventIntervalListReducer;
