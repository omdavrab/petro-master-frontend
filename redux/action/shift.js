import URL from "@/URL";
import axios from "axios";

// Create Shift
export const HandleCreateShift = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${URL}/shift/create`,
        data,
        {
          headers: {
            authorization: localStorage.getItem("authorization"),
          },
        }
      );
      return dispatch({
        type: "CREATE_SHIFT",
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

// GET Shift
export const GetShift = (page) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/shift/getall-shift?page=${page}&pageLimit=8`, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "GET_SHIFT",
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

// Edit Shift
export const HandleEditShift = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${URL}/upi/edit/${id}`, data, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "EDIT_SHIFT",
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
