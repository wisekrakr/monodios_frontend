import axios from "axios";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_USER,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Check for token and load user
export const loadUser = () => async (dispatch) => {
  // Set user loading to true
  dispatch({ type: USER_LOADING });

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/users");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.msg, status: err.status },
    });
  }
};

// Register User
export const registerUser = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      //   errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
      payload: { msg: err.response.msg, status: err.response.status },
    });
  }
};

// Login User
export const loginUser = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      dispatch({
        type: AUTH_ERROR,
        payload: {
          errors,
          valid: Object.keys(errors).length === 0 ? true : false,
        },
      });
    }

    dispatch({
      type: LOGIN_FAIL,
      payload: { msg: err.response.msg, status: err.response.status },
    });
  }
};

// Logout / Clear Profile
export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS });
};
