const initialState = {
  loading: false,
  dateList: [],
  error: "",
};

const pickDateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PICK_DATE_SERVICE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "PICK_DATE_SERVICE_SUCCEED":
      return {
        loading: false,
        dateList: action.payload !== undefined ? action.payload : [],
        error: "",
      };
    case "PICK_DATE_SERVICE_FAILED":
      return {
        loading: false,
        dateList: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default pickDateReducer;
