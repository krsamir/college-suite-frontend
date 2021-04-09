import { SET_USER_DETAIL } from "../Actions/types";

const initialState = {
  data: [
    {
      admin_name: "",
      email: "",
      organization: "",
      role: "",
    },
  ],
};

const adminSummary = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DETAIL:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default adminSummary;
