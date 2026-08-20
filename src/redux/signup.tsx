import * as ActionTypes from "./ActionTypes";
import { AppAction } from "../types/redux/actions";
import { SignupState } from "../types/redux/state";

export const Signup = (
  state: SignupState = {
    errMess: null,
    successMess: null
  },
  action: AppAction
): SignupState => {
  switch (action.type) {
    case ActionTypes.SIGNUP_SUCCESS:
      return { ...state, errMess: null, successMess: String(action.payload) };
    case ActionTypes.SIGNUP_FAILURE:
      return { ...state, errMess: String(action.payload), successMess: null };

    default:
      return state;
  }
};
