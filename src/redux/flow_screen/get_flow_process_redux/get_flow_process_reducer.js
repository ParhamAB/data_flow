const initialState = {
  loading: false,
  flowProcessList: [],
  error: "",
};

const flowProcessListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FLOW_PROCESS_SERVICE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FLOW_PROCESS_SERVICE_SUCCEED":
      return {
        loading: false,
        flowProcessList: action.payload !== undefined ? action.payload : [],
        error: "",
      };
    case "FLOW_PROCESS_SERVICE_FAILED":
      return {
        loading: false,
        flowProcessList: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default flowProcessListReducer;
