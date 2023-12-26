export const HandleSideBar = (data) => {
    return async (dispatch) => {
      try {
        return dispatch({
          type: "OPEN_SIDEBAR",
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