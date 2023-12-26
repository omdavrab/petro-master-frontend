import URL from "@/URL";
import axios from "axios";

export const HandleTotal = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/restaurant/get/total`, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "COUNT_TOTAL",
        payload: response.data,
      });
    } catch (err) {
      return dispatch({
        type: "SET_LOADING",
        payload: err.response,
      });
    }
  };
};
