import axios from "axios";
import URL from "../../URL";

export const HandleQRCode = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${URL}/qr/create`, data, {
                headers: {
                    authorization: localStorage.getItem("authorization"),
                },
            });
            return dispatch({
                type: "CREATE_QRCODE",
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

export const HandleGetQRCode = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${URL}/qr/get`, {
                headers: {
                    authorization: localStorage.getItem("authorization"),
                },
            });
            return dispatch({
                type: "GET_QRCODE",
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

export const HandleDeleteQR = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${URL}/qr/delete/${id}`, {
                headers: {
                    authorization: localStorage.getItem("authorization"),
                },
            });
            return dispatch({
                type: "DELETE_QR",
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