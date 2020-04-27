import {
  GET_POSTS,
  GET_POST,
  LOADING_POSTS,
  POST_ERROR,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
} from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  errors: [],
  loadingPosts: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loadingPosts: false,
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loadingPosts: false,
      };
    case LIKE_POST:
    case UNLIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.postId === action.payload.postId
            ? { ...post, likes: action.payload.likes }
            : post
        ),
        loading: false,
      };

    case POST_ERROR:
      return {
        ...state,
        errors: action.payload,
        loadingPosts: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.postId !== action.payload),
      };
    case LOADING_POSTS:
      return { ...state, loadingPosts: true };
    default:
      return state;
  }
};
