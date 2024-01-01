import URL from "@/URL";
import axios from "axios";

// Create Machine
export const HandleCreateMachine = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/machine/create`, data, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "CREATE_MACHINE",
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

// GET Machine
export const GetMachine = (page) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${URL}/machine/getall-machine?page=${page}&pageLimit=8`,
        {
          headers: {
            authorization: localStorage.getItem("authorization"),
          },
        }
      );
      return dispatch({
        type: "GET_MACHINE",
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

// Edit Machine
export const HandleEditMachine = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${URL}/machine/edit/${id}`, data, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "EDIT_MACHINE",
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
