import { SET_LOGIN_TOKEN, SET_ROLE_TOKEN, REMOVE_TOKEN } from "./types";

export const setLoginToken = (token) => (dispatch) => {
  dispatch({
    type: SET_LOGIN_TOKEN,
    payload: token,
  });
};

export const setRoleToken = (token) => (dispatch) => {
  dispatch({
    type: SET_ROLE_TOKEN,
    payload: token,
  });
};

export const removeToken = () => (dispatch) => {
  dispatch({
    type: REMOVE_TOKEN,
  });
};
