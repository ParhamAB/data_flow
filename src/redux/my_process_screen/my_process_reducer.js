const initialState = {
  loading: false,
  processList: [],
  error: "",
};

const processListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PROCESS_SERVICE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "PROCESS_SERVICE_SUCCEED":
      return {
        loading: false,
        processList: action.payload !== undefined ? action.payload : [],
        error: "",
      };
    case "PROCESS_SERVICE_FAILED":
      return {
        loading: false,
        processList: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default processListReducer;
