export const OpenLoader = (data) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: "OPEN_LOADER",
        payload: data,
      });
    } catch (err) {
      return dispatch({
        type: "SET_LOADING",
        payload: err,
      });
    }
  };
};

export const CloseLoader = (data) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: "CLOSE_LOADER",
        payload: data,
      });
    } catch (err) {
      return dispatch({
        type: "SET_LOADING",
        payload: err,
      });
    }
  };
};
