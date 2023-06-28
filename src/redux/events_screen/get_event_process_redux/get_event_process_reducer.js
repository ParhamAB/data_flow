const initialState = {
  loading: false,
  eventProcessList: [],
  error: "",
};

const eventProcessListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EVENT_PROCESS_SERVICE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "EVENT_PROCESS_SERVICE_SUCCEED":
      return {
        loading: false,
        eventProcessList: action.payload !== undefined ? action.payload : [],
        error: "",
      };
    case "EVENT_PROCESS_SERVICE_FAILED":
      return {
        loading: false,
        eventProcessList: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default eventProcessListReducer;
