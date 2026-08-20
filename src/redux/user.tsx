import * as ActionTypes from "./ActionTypes";
import { AppAction } from "../types/redux/actions";
import { UserState } from "../types/redux/state";

export const User = (
  state: UserState = {
    isLoading: true,
    errMess: null,
    user: null
  },
  action: AppAction
): UserState => {
  switch (action.type) {
    case ActionTypes.USER_SUCCESS:
      return { ...state, isLoading: false, errMess: null, user: action.user };

    case ActionTypes.USER_LOADING:
      return { ...state, isLoading: true, errMess: null, user: null };

    case ActionTypes.USER_CHECK:
      return { ...state, isLoading: false, errMess: null, user: null };

    case ActionTypes.USER_ERROR:
      return {
        ...state,
        isLoading: false,
        errMess: action.errMess,
        user: null
      };

    default:
      return state;
  }
};
