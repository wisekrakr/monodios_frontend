import axios from "axios";
import { LIKE_POST, UNLIKE_POST, POST_ERROR } from "./types";

export const likePost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/posts/${id}/like`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    dispatch({
      type: LIKE_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.msg,
    });
  }
};

export const unlikePost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/posts/${id}/unlike`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    dispatch({
      type: UNLIKE_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.msg,
    });
  }
};
