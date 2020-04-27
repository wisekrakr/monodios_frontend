import {
  CURRENT_USER,
  GET_USER_PROFILE,
  GET_PROFILES,
  USER_ERROR,
  UPDATE_USER,
  CLEAR_USER,
  UPLOAD_AVATAR,
  LIKE_POST,
  UNLIKE_POST,
} from "../actions/types";

const initialState = {
  user: null,
  profile: null,
  credentials: {},
  likes: [],
  notifications: [],
  loadingProfile: true,
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_USER:
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
        loadingProfile: false,
      };
    case GET_USER_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loadingProfile: false,
      };
    case UPLOAD_AVATAR:
      return {
        ...state.user,
        avatarUrl: action.payload,
        loadingProfile: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        users: action.payload,
        loadingProfile: false,
      };
    case LIKE_POST:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            username: state.credentials.name,
            postId: action.payload.postId,
          },
        ],
      };
    case UNLIKE_POST:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.postId !== action.payload.postId
        ),
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
        loadingProfile: false,
        user: null,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null,
        loadingProfile: false,
      };
    default:
      return state;
  }
};
