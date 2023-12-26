import { persistor } from "../store";

export const logout = () => (dispatch) => {
  // Dispatch actions to reset relevant parts of the state
  dispatch({ type: "GET_ORDER" });
  dispatch({ type: "USER_LOGIN" });
  // ...

  // Purge the Redux Persist store
  persistor.purge();
};
