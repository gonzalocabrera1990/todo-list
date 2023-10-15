import * as ActionTypes from "./ActionTypes";

export const Backgrounds = (
  state = {
    colors: null,
    errMess: null
  },
  action:any
) => {
  switch (action.type) {
    case ActionTypes.BACKGROUNDS_SUCCESS:
      return { ...state, colors: action.payload, errMess: null };
    case ActionTypes.BACKGROUNDS_FAILED:
      return { ...state, colors: null, errMess: action.errmess };
  
    default:
      return state;
  }
};
