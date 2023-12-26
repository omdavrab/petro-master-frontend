import axios from "axios";
import URL from "../../URL";
import { tokenExpirationTime } from "@/utils/tokenExpirationTime";

export const HandleRestaurant = (data, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/restaurant/register`, data, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      localStorage.setItem("authorization", response.data.token);
      tokenExpirationTime(response.data.token);
      return dispatch({
        type: "CREATE_RESTAURANT",
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

export const HandleRestaurantData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/restaurant/get/restaurant`, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "RESTAURANT_DATA",
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

export const HandleEditRestaurantData = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${URL}/restaurant/edit`, data, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "EDIT_RESTAURANT_DATA",
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

export const HandleRestaurantCustomersData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/restaurant/get/customers`, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "RESTAURANT_CUSTOMERS_DATA",
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

// Trending Items
export const HandleTrendingItem = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${URL}/restaurant/get/trendingitems?id=${id}`,
        {
          headers: {
            authorization: localStorage.getItem("authorization"),
          },
        }
      );
      return dispatch({
        type: "RESTAURANT_TRENDING_ITEMS",
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
