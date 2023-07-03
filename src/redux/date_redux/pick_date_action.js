import getDateListService from "../../service/pick_date_service/pick_date_service.ts";

export const callPickDateRequest = () => {
  return { type: "PICK_DATE_SERVICE_REQUEST" };
};

export const callPickDateSucceed = (list) => {
  return { type: "PICK_DATE_SERVICE_SUCCEED", payload: list };
};

export const callPickDateFailed = (error) => {
  return { type: "PICK_DATE_SERVICE_FAILED", payload: error };
};

export const getPickDateFunction = () => {
  return async (dispatch) => {
    dispatch(callPickDateRequest());
    try {
      var req = await getDateListService();
      dispatch(callPickDateSucceed(req.data));
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(callPickDateFailed(error.response.data.message));
      } else {
        dispatch(
          callPickDateFailed("خطایی در برقراری ارتباط با سرور رخ داده است.")
        );
      }
    } finally {
    }
  };
};
