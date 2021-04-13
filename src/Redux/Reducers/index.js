import { combineReducers } from "redux";
import toastReducer from "./ToastReducer";
import tokenReducer from "./TokenReducer";
import userReducer from "./UserReducer";
import AdminReducers from "./AdminReducers";
export default combineReducers({
  toast: toastReducer,
  token: tokenReducer,
  user: userReducer,
  admin: AdminReducers,
});
