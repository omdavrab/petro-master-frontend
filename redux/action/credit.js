import URL from "@/URL";
import axios from "axios";

export const HandleCreateCreditParty = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${URL}/party/create`,
        data,
        {
          headers: {
            authorization: localStorage.getItem("authorization"),
          },
        }
      );
      return dispatch({
        type: "CREATE_PARTY",
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

export const GetCreditParty = (page) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/party/getall?page=${page}&pageLimit=8`, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "GET_PARTY",
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

export const HandleEditCreditParty = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${URL}/party/edit/${id}`, data, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "EDIT_PARTY",
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
