import URL from "@/URL";
import axios from "axios";

// Create Upi
export const HandleCreateUpi = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${URL}/upi/create`,
        data,
        {
          headers: {
            authorization: localStorage.getItem("authorization"),
          },
        }
      );
      return dispatch({
        type: "CREATE_UPI",
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

// GET Upi
export const GetUpi = (page) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/upi/getall-upi?page=${page}&pageLimit=8`, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "GET_UPI",
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

// Edit Upi
export const HandleEditUpi = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${URL}/upi/edit/${id}`, data, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "EDIT_UPI",
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
