const initialState = {
  loading: false,
  eventStartTimesList: [],
  error: "",
};

const eventStartTimeListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EVENT_START_TIME_SERVICE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "EVENT_START_TIME_SERVICE_SUCCEED":
      return {
        loading: false,
        eventStartTimesList: action.payload !== undefined ? action.payload : [],
        error: "",
      };
    case "EVENT_START_TIME_SERVICE_FAILED":
      return {
        loading: false,
        eventStartTimesList: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default eventStartTimeListReducer;
