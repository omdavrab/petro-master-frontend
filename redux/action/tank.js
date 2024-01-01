import URL from "@/URL";
import axios from "axios";

// Create TANK
export const HandleTankCreate = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${URL}/tank/create`,
        data,
        {
          headers: {
            authorization: localStorage.getItem("authorization"),
          },
        }
      );
      return dispatch({
        type: "CREATE_TANK",
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

// GET TANK
export const GetTank = (page) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/tank/getall-tank?page=${page}&pageLimit=8`, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "GET_TANK",
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

// Edit Employee
export const HandleEditTank = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${URL}/tank/edit/${id}`, data, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "EDIT_TANK",
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
