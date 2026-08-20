import * as ActionTypes from "./ActionTypes";
import { AppAction } from "../types/redux/actions";
import { BackgroundsState } from "../types/redux/state";

export const Backgrounds = (
  state: BackgroundsState = {
    colors: null,
    errMess: null
  },
  action: AppAction
): BackgroundsState => {
  switch (action.type) {
    case ActionTypes.BACKGROUNDS_SUCCESS:
      return { ...state, colors: action.payload, errMess: null };
    case ActionTypes.BACKGROUNDS_FAILED:
      return { ...state, colors: null, errMess: action.errmess };

    default:
      return state;
  }
};
