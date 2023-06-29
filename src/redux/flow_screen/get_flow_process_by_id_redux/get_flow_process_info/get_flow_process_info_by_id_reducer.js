const initialState = {
  loading: false,
  flowInfoProcessList: {},
  error: "",
};

const getFlowProcessInfoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FLOW_PROCESS_INFO_SERVICE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FLOW_PROCESS_INFO_SERVICE_SUCCEED":
      return {
        loading: false,
        flowInfoProcessList: action.payload !== undefined ? action.payload : {},
        error: "",
      };
    case "FLOW_PROCESS_INFO_SERVICE_FAILED":
      return {
        loading: false,
        flowInfoProcessList: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getFlowProcessInfoListReducer;
