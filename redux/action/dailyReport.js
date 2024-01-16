import URL from "@/URL";
import axios from "axios";

// Create REPORT
export const HandleCreateReport = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/report/create`, data, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "CREATE_REPORT",
        payload: response,
      });
    } catch (err) {
      return dispatch({
        type: "SET_LOADING",
        payload: err.response,
      });
    }
  };
};

// GET Report
export const GetReport = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/report/getall`, id, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "GET_REPORT",
        payload: response?.data,
      });
    } catch (err) {
      return dispatch({
        type: "SET_LOADING",
        payload: err.response,
      });
    }
  };
};
