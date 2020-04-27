import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loadingAuth: false,
  errors: [],
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loadingAuth: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loadingAuth: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", `Bearer ${action.payload.token}`);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loadingAuth: false,
      };
    case AUTH_ERROR:
      return {
        ...state,
        token: null,
        user: null,
        errors: action.payload,
        isAuthenticated: false,
        loadingAuth: false,
      };
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loadingAuth: false,
      };

    default:
      return state;
  }
};
