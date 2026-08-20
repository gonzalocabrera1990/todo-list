import * as ActionTypes from "./ActionTypes";
import { AppAction } from "../types/redux/actions";
import { AuthState } from "../types/redux/state";

export const Auth = (
  state: AuthState = {
    isLoading: false,
    isAuthenticated: localStorage.getItem("token") ? true : false,
    token: localStorage.getItem("token"),
    user: localStorage.getItem("creds")
      ? JSON.parse(localStorage.getItem("creds") || '{}')
      : null,
    errMess: null,
    id: localStorage.getItem("id")
  },
  action: AppAction
): AuthState => {
  switch (action.type) {
    case ActionTypes.TOKEN_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.TOKEN_CHECK:
      return {
        ...state,
        isLoading: false
      };
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        user: action.creds
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errMess: "",
        token: action.token,
        user: action.userdata.userdata as unknown as AuthState['user']
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMess: action.errMess
      };
    case ActionTypes.LOGOUT_REQUEST:
      return { ...state, isLoading: true, isAuthenticated: true };
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        id: "",
        token: "",
        user: null
      };
    default:
      return state;
  }
};
