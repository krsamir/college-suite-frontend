import { FETCH_NOTICE } from "../Actions/types";

const initialState = {
  data: [],
};

const adminUtils = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTICE:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default adminUtils;
