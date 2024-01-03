import URL from "@/URL";
import axios from "axios";

// Create TANK
export const HandleCreateBank = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${URL}/bank/create`,
        data,
        {
          headers: {
            authorization: localStorage.getItem("authorization"),
          },
        }
      );
      return dispatch({
        type: "CREATE_BANK",
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

// GET TANK
export const GetBank = (page) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/bank/getall-bank?page=${page}&pageLimit=8`, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "GET_BANK",
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

// Edit Employee
export const HandleEditBank = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${URL}/bank/edit/${id}`, data, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "EDIT_BANK",
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
