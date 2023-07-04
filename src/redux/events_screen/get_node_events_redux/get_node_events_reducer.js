const initialState = {
  loading: false,
  eventNodeList: [],
  error: "",
};

const eventNodeListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EVENT_NODE_SERVICE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "EVENT_NODE_SERVICE_SUCCEED":
      return {
        loading: false,
        eventNodeList: action.payload !== undefined ? action.payload : [],
        error: "",
      };
    case "EVENT_NODE_SERVICE_FAILED":
      return {
        loading: false,
        eventNodeList: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default eventNodeListReducer;
