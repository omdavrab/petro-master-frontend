import URL from "@/URL";
import axios from "axios";

export const HandleCreateProduct = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${URL}/product/create`,
        data,
        {
          headers: {
            authorization: localStorage.getItem("authorization"),
          },
        }
      );
      return dispatch({
        type: "CREATE_PRODUCT",
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

export const GetProduct = (page) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/product/getall?page=${page}&pageLimit=8`, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "GET_PRODUCT",
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

export const HandleEditProduct = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${URL}/product/edit/${id}`, data, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "EDIT_PRODUCT",
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
