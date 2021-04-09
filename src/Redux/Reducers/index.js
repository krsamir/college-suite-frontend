import { combineReducers } from "redux";
import toastReducer from "./ToastReducer";
import tokenReducer from "./TokenReducer";
import userReducer from "./UserReducer";
export default combineReducers({
  toast: toastReducer,
  token: tokenReducer,
  user: userReducer,
});
