const initialState = {
  loading: false,
  flowStartTimesList: [],
  error: "",
};

const flowStartTimeListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FLOW_START_TIME_SERVICE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FLOW_START_TIME_SERVICE_SUCCEED":
      return {
        loading: false,
        flowStartTimesList: action.payload,
        error: "",
      };
    case "FLOW_START_TIME_SERVICE_FAILED":
      return {
        loading: false,
        flowStartTimesList: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default flowStartTimeListReducer;
