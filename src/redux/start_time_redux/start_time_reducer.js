const initialState = {
  loading: false,
  startTimesList: [],
  error: "",
};

const startTimeListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_TIME_SERVICE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "START_TIME_SERVICE_SUCCEED":
      return {
        loading: false,
        startTimesList: action.payload,
        error: "",
      };
    case "START_TIME_SERVICE_FAILED":
      return {
        loading: false,
        startTimesList: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default startTimeListReducer;
