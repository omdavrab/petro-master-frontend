import axios from "axios";
import URL from "../../URL";

export const HandleFoodCategory = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/food/create`, data, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "FOOD_CATEGORY",
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

export const HandleGetFoodCategory = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/food/get`, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "GET_FOOD_CATEGORY",
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

export const HandleGetFoodCategoryByRestaurant = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${URL}/food/getcategorybyrestaurant/${id}`,
        {
          headers: {
            authorization: localStorage.getItem("authorization"),
          },
        }
      );
      return dispatch({
        type: "GET_FOOD_CATEGORY_BY_RESTAURANT",
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

export const HandleGetMenuByCategory = (categoryId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/food/get/menu/${categoryId}`, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return response.data
      return dispatch({
        type: "GET_RESTAURANT_MENU_BY_CATEGORY",
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

export const HandleGetMenuByCategoryStore = (data) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: "GET_RESTAURANT_MENU_BY_CATEGORY",
        payload: data,
      });
    } catch (err) {
      return dispatch({
        type: "SET_LOADING",
        payload: err.response,
      });
    }
  };
};


export const HandleDeleteFoodCategory = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${URL}/food/delete/${id}`, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "DELETE_RESTAURANT_CATEGORY",
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
export const HandleEditFoodCategory = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${URL}/food/edit/${data.id}`,
        data.formData,
        {
          headers: {
            authorization: localStorage.getItem("authorization"),
          },
        }
      );
      return dispatch({
        type: "EDIT_FOOD_CATEGORY",
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

export const HandleStoreData = (data) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: "STORE_DATA",
        payload: data,
      });
    } catch (err) {
      return dispatch({
        type: "SET_LOADING",
        payload: err,
      });
    }
  };
};
