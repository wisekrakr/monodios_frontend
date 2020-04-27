import { combineReducers } from "redux";
import postReducer from "./postReducer";
import authReducer from "./authReducer";
import userProfileReducer from "./userProfileReducer";

export default combineReducers({
  posts: postReducer,
  auth: authReducer,
  profile: userProfileReducer,
});
