export const SignUpState = (data) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: "SIGNUPSTATE",
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
