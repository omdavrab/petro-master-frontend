import URL from "@/URL";
import axios from "axios";

// Create Employee
export const HandleEmployeeCreate = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${URL}/employee/create-employee`,
        data,
        {
          headers: {
            authorization: localStorage.getItem("authorization"),
          },
        }
      );
      return dispatch({
        type: "CREATE_EMPLOYEE",
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

// GET Employee
export const GetEmployee = (page) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/employee/getall-employee?page=${page}&pageLimit=8`, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "GET_EMPLOYEE",
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
export const HandleEditEmployee = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${URL}/employee/edit/${id}`, data, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      return dispatch({
        type: "EDIT_EMPLOYEE",
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
