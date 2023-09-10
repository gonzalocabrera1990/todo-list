import * as ActionTypes from "./ActionTypes";
type State = {
  isLoading: boolean;
  errMess: string | null;
  user: any| null;
}
export const User = (
  state:State = {
    isLoading: true,
    errMess: null,
    user: null
  },
  action:any
) => {
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
