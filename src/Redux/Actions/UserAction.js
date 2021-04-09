import { SET_USER_DETAIL } from "./types";
import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();
export const adminSummary = () => async (dispatch) => {
  await axios
    .get("/api/admin")
    .then((response) => {
      dispatch({
        type: SET_USER_DETAIL,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
      cookies.remove("sid", { path: "/" });
      cookies.remove("rid", { path: "/" });
    });
};
