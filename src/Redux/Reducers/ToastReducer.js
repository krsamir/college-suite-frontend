import { SUCCESS_TOAST, WARNING_TOAST, ERROR_TOAST } from "../Actions/types";
import { toast } from "react-toastify";

const initialState = {};

const message = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_TOAST:
      toast.success(action.payload);
      return null;

    case WARNING_TOAST:
      toast.warning(action.payload);
      return null;

    case ERROR_TOAST:
      toast.error(action.payload);
      return null;

    default:
      return state;
  }
};

export default message;
