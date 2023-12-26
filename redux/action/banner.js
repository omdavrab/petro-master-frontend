import URL from "@/URL";
import axios from "axios";

// Create Banner
export const HandleBannerCreate = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/banner/create`, data, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "CREATE_BANNER",
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
// Get Banner in admin side and user side
export const HandleGetBanner = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/banner/get?id=${id}`, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "GET_BANNER",
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
// Delete Banner in admin side
export const HandleDeleteBanner = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/banner/delete`, id, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "DELETE_BANNER",
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
