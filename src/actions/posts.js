import axios from "axios";
import {
  GET_POSTS,
  GET_POST,
  ADD_POST,
  DELETE_POST,
  LOADING_POSTS,
  POST_ERROR,
} from "./types";

// Get all Posts
export const getAllPosts = () => async (dispatch) => {
  dispatch({ type: LOADING_POSTS });
  try {
    const res = await axios.get("/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.data,
    });
  }
};

// Get a post by id
export const getPost = (id) => async (dispatch) => {
  dispatch({ type: LOADING_POSTS });
  try {
    const res = await axios.get(`/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.data,
    });
  }
};

// Add Post
export const addPost = (post) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/posts", post, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.data,
    });
  }
};

// Delete Post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.data,
    });
  }
};
