import axios from "axios";
import BASE_URL from "../../URL";
import URL from "../../URL";
import { tokenExpirationTime } from "@/utils/tokenExpirationTime";
import Cookies from 'js-cookie';

// Admin Signup
export const HandleSignUp = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/register`, data);
      localStorage.setItem("authorization", response.data.token);
      Cookies.set('authorization', response.data.token);
      tokenExpirationTime(response.data.token);
      return dispatch({
        type: "CREATE_USER",
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
// Verify signup OTP
export const HandleVerifyOTP = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/verify`, data);
      localStorage.setItem("authorization", response.data.token);
      Cookies.set('authorization', response.data.token);
      tokenExpirationTime(response.data.token);
      return dispatch({
        type: "OTP_VERIFY",
        payload: response,
      });
    } catch (err) {
      return dispatch({
        type: "SET_LOADING",
        payload: err,
      });
    }
  };
};
// Forgot Password
export const HandleForgotPassword = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/forgotPassword`, data);
      return dispatch({
        type: "FORGOT_PASSWORD",
        payload: response,
      });
    } catch (err) {
      return dispatch({
        type: "SET_LOADING",
        payload: err,
      });
    }
  };
};
// Update Password
export const HandleUpdatePassword = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/updatePassword`, data);
      return dispatch({
        type: "FORGOT_PASSWORD",
        payload: response,
      });
    } catch (err) {
      return dispatch({
        type: "SET_LOADING",
        payload: err,
      });
    }
  };
};
// Admin Login
export const HandleLogIn = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/login`, data);
      localStorage.setItem("authorization", response.data.token);
      Cookies.set('authorization', response.data.token);
      tokenExpirationTime(response.data.token);
      return dispatch({
        type: "ADMIN_LOGIN",
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

export const createUserDetails = (data) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: "USER_DETAILS",
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

export const saveToken = (data) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: "SAVE_TOKEN",
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

// User Login
export const HandleUserLogIn = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/loginUser`, data);
      localStorage.setItem("authorization", response.data.token);
      tokenExpirationTime(response.data.token);
      return dispatch({
        type: "USER_LOGIN",
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

// Edit admin User 
export const HandleEditUser = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/loginUser`, data);
      localStorage.setItem("authorization", response.data.token);
      tokenExpirationTime(response.data.token);
      return dispatch({
        type: "USER_EDIT",
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
