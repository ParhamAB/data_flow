import getNodeEventsService from "../../../service/event_process_screen/get_node_event_service/get_node_event_service.ts";

export const callEventNodeRequest = () => {
  return { type: "EVENT_NODE_SERVICE_REQUEST" };
};

export const callEventNodeSucceed = (list) => {
  return { type: "EVENT_NODE_SERVICE_SUCCEED", payload: list };
};

export const callEventNodeFailed = (error) => {
  return { type: "EVENT_NODE_SERVICE_FAILED", payload: error };
};

export const getEventNodeListFunction = (id_model) => {
  return async (dispatch) => {
    dispatch(callEventNodeRequest());
    try {
      var req = await getNodeEventsService(id_model);
      dispatch(callEventNodeSucceed(req.data));
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(callEventNodeFailed(error.response.data.message));
      } else {
        dispatch(
          callEventNodeFailed("خطایی در برقراری ارتباط با سرور رخ داده است.")
        );
      }
    } finally {
    }
  };
};
