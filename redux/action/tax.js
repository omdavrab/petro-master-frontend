import URL from "@/URL";
import axios from "axios";

// Create Tax
export const HandleCreateTax = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${URL}/tax/create`, data, {
                headers: {
                    authorization: localStorage.getItem("authorization"),
                },
            });
            return dispatch({
                type: "CREATE_TAX",
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
// Get Tax in admin side and user side
export const HandleGetTax = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${URL}/tax/get?id=${id}`, {
                headers: {
                    authorization: localStorage.getItem("authorization"),
                },
            });
            return dispatch({
                type: "GET_TAX",
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

// Edit Tax
export const HandleEditTax = (id, data) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${URL}/tax/edit/${id}`, data, {
                headers: {
                    authorization: localStorage.getItem("authorization"),
                },
            });
            return dispatch({
                type: "EDIT_TAX",
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

// Delete Tax
export const HandleDeleteTax = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${URL}/tax/delete/${id}`, {
                headers: {
                    authorization: localStorage.getItem("authorization"),
                },
            });
            return dispatch({
                type: "DELETE_TAX",
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