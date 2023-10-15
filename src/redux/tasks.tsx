import * as ActionTypes from "./ActionTypes";
type Tasks = {
  isLoading: boolean;
  errMess: string | null;
  tasks: any;
}
export const Tasks = (
  state:Tasks = {
    tasks:null,
    errMess: null,
    isLoading: false,
  },
  action:any
) => {
  switch (action.type) {
    case ActionTypes.TASKS_LOADING:
      return { ...state, errMess: null, tasks: null, isLoading: true };
    case ActionTypes.TASKS_SUCCESS:
      return { ...state, errMess: null, tasks: action.payload, isLoading: false };
    case ActionTypes.TASKS_FAILED:
      return { ...state, errMess: action.payload, tasks: null, isLoading: false };

    default:
      return state;
  }
};
