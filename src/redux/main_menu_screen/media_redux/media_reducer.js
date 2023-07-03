const initialState = {
  loading: false,
  mediaList: [],
  error: "",
};

const mediaListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MEDIA_SERVICE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_MEDIA_SERVICE_SUCCEED":
      return {
        loading: false,
        mediaList: action.payload !== undefined ? action.payload : [],
        error: "",
      };
    case "GET_MEDIA_SERVICE_FAILED":
      return {
        loading: false,
        mediaList: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default mediaListReducer;
