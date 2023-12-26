import URL from "@/URL";
import axios from "axios";

export const HandleCartStoreData = (data) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: "CART_STORE_DATA",
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


