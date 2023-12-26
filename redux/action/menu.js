import axios from "axios";
import URL from "../../URL";

export const HandleMenu = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/menu/create`, data, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "RESTAURANT_MENU",
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

export const HandleGetMenu = (page) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/menu/get?page=${page}&pageLimit=8`, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "GET_RESTAURANT_MENU",
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

export const HandleGetMenuById = (menuId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/menu/getId/${menuId}`, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "GET_RESTAURANT_MENU_BY_ID",
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

export const HandleEditMenu = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${URL}/menu/edit/${data.id}`, data.formData, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "EDIT_RESTAURANT_MENU",
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

export const HandleDeleteMenu = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${URL}/menu/delete/${id}`, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "DELETE_RESTAURANT_MENU",
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