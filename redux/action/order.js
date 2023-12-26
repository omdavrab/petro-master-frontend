import URL from "@/URL";
import axios from "axios";

export const HandleViewStoreData = (data) => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: "ORDER_VIEW_STORE_DATA",
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

export const HandleCreateOrder = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                `${URL}/order/create/`, data,
                {
                    headers: {
                        authorization: localStorage.getItem("authorization"),
                    },
                }
            );
            return dispatch({
                type: "CREATE_ORDER",
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

export const HandleGetOrder = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `${URL}/order/get/`,
                {
                    headers: {
                        authorization: localStorage.getItem("authorization"),
                    },
                }
            );
            return dispatch({
                type: "GET_ORDER",
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

export const HandleGetOrderByRestaurant = (page) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `${URL}/order/get/restaurant?page=${page}`,
                {
                    headers: {
                        authorization: localStorage.getItem("authorization"),
                    },
                }
            );
            return dispatch({
                type: "GET_ORDER_BY_RESTAURANT",
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