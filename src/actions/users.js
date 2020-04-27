import axios from "axios";

import {
  CURRENT_USER,
  GET_USER_PROFILE,
  GET_PROFILES,
  USER_ERROR,
  UPDATE_USER,
  CLEAR_USER,
  UPLOAD_AVATAR,
} from "./types";

import { loadUser } from "./authentication";

// Get current users profile
export const getCurrentUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/profile");

    dispatch({
      type: CURRENT_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err },
    });
  }
};

// Get all users
export const getUsers = () => async (dispatch) => {
  //   dispatch({ type: CLEAR_USER });
  try {
    const res = await axios.get("/users");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.msg, status: err.response.status },
    });
  }
};

// Get user by username
export const getUserByName = (name) => async (dispatch) => {
  try {
    const res = await axios.get(`/profile/${name}`);

    dispatch({
      type: GET_USER_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.msg, status: err.response.status },
    });
  }
};

// Update current user details
export const updateUser = (userDetails) => async (dispatch) => {
  dispatch(loadUser());
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/profile", userDetails, config);

    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      //   errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.msg, status: err.response.status },
    });
  }
};

// Delete account & profile
export const deleteAccount = (id) => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure? This will delete everything and can NOT be undone!"
    )
  ) {
    try {
      await axios.delete(`/users/${id}`);

      dispatch({ type: CLEAR_USER });
      //   dispatch({ type: DELETE_USER });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: { msg: err.response.msg, status: err.response.status },
      });
    }
  }
};

//========================== Profile editing functions ======================//

export const uploadUserAvatar = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/profile/avatar", data, config);

    dispatch({
      type: UPLOAD_AVATAR,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.msg, status: err.response.status },
    });
  }
};
