import getMediaListService from "../../../service/main_menu_service/media_service/get_media_service.ts";

export const getMediaRequest = () => {
  return { type: "GET_MEDIA_SERVICE_REQUEST" };
};

export const getMediaSucceed = (list) => {
  return { type: "GET_MEDIA_SERVICE_SUCCEED", payload: list };
};

export const getMediaFailed = (error) => {
  return { type: "GET_MEDIA_SERVICE_FAILED", payload: error };
};

export const getMediaListFunction = () => {
  return async (dispatch) => {
    dispatch(getMediaRequest());
    try {
      var req = await getMediaListService();
      dispatch(getMediaSucceed(req.data));
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(getMediaFailed(error.response.data.message));
      } else {
        dispatch(
          getMediaFailed("خطایی در برقراری ارتباط با سرور رخ داده است.")
        );
      }
    } finally {
    }
  };
};
