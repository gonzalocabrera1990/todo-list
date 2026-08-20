import * as ActionTypes from "./ActionTypes";
import { AppAction } from "../types/redux/actions";
import { TasksState } from "../types/redux/state";

export const Tasks = (
  state: TasksState = {
    tasks: null,
    errMess: null,
    isLoading: false,
  },
  action: AppAction
): TasksState => {
  switch (action.type) {
    case ActionTypes.TASKS_LOADING:
      return { ...state, errMess: null, tasks: null, isLoading: true };
    case ActionTypes.TASKS_SUCCESS:
      return { ...state, errMess: null, tasks: action.payload, isLoading: false };
    case ActionTypes.TASKS_FAILED:
      return { ...state, errMess: action.errMess, tasks: null, isLoading: false };

    default:
      return state;
  }
};
