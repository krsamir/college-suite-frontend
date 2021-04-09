import {
  SET_LOGIN_TOKEN,
  REMOVE_TOKEN,
  SET_ROLE_TOKEN,
} from "../Actions/types";
import Cookies from "universal-cookie";

const initialState = {};

const loginFunction = (state = initialState, action) => {
  const cookies = new Cookies();
  switch (action.type) {
    case SET_LOGIN_TOKEN:
      cookies.set("sid", action.payload, {
        path: "/",
      });
      return null;
    case SET_ROLE_TOKEN:
      cookies.set("rid", action.payload, {
        path: "/",
      });
      return null;
    case REMOVE_TOKEN:
      cookies.remove("sid", { path: "/" });
      cookies.remove("rid", { path: "/" });
      return null;
    default:
      return state;
  }
};

export default loginFunction;
