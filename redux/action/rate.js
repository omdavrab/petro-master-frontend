import URL from "@/URL";
import axios from "axios";

// Create Rate
export const HandleCreateRate = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${URL}/rate/create`,
        data,
        {
          headers: {
            authorization: localStorage.getItem("authorization"),
          },
        }
      );
      return dispatch({
        type: "CREATE_RATE",
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
export const GetRate = (page) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/rate/getall-rate?page=${page}&pageLimit=8`, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "GET_RATE",
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
export const HandleEditRate = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${URL}/rate/edit/${id}`, data, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "EDIT_RATE",
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

export const HandleDateRate = (date) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/rate/get?date=${date}`, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "DATE_RATE",
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