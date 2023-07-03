const initialState = {
  loading: false,
  eventsNewsList: [],
  error: "",
};

const eventsNewsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_EVENTS_NEWS_SERVICE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_EVENTS_NEWS_SERVICE_SUCCEED":
      return {
        loading: false,
        eventsNewsList: action.payload !== undefined ? action.payload : [],
        error: "",
      };
    case "GET_EVENTS_NEWS_SERVICE_FAILED":
      return {
        loading: false,
        eventsNewsList: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default eventsNewsListReducer;
