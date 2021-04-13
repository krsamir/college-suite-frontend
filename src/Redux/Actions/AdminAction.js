import { FETCH_NOTICE } from "./types";
import axios from "axios";

export const adminUtils = () => async (dispatch) => {
  await axios
    .get("/api/get_notice")
    .then((response) => {
      dispatch({
        type: FETCH_NOTICE,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
