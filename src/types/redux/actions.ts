import { Task, User, Backgrounds, TodoList, Group } from '../models';

// Action Types
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS" as const;
export const SIGNUP_FAILURE = "SIGNUP_FAILURE" as const;
export const USER_SUCCESS = "USER_SUCCESS" as const;
export const USER_ERROR = "USER_ERROR" as const;
export const USER_LOADING = "USER_LOADING" as const;
export const USER_CHECK = "USER_CHECK" as const;
export const USERS_SUCCESS = "USERS_SUCCESS" as const;
export const USERS_ERROR = "USERS_ERROR" as const;
export const USERS_LOADING = "USERS_LOADING" as const;
export const LOGIN_REQUEST = "LOGIN_REQUEST" as const;
export const LOGIN_SUCCESS = "LOGIN_SUCCESS" as const;
export const LOGIN_FAILURE = "LOGIN_FAILURE" as const;
export const TOKEN_LOADING = "TOKEN_LOADING" as const;
export const TOKEN_CHECK = "TOKEN_CHECK" as const;
export const LOGOUT_REQUEST = "LOGOUT_REQUEST" as const;
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS" as const;
export const LOGOUT_FAILURE = "LOGOUT_FAILURE" as const;
export const NOTIFICATION_LOADING = 'NOTIFICATION_LOADING' as const;
export const NOTIFICATION_SUCCESS = 'NOTIFICATION_SUCCESS' as const;
export const NOTIFICATION_ERROR = 'NOTIFICATION_ERROR' as const;
export const NOTIFICATION_STATUS = 'NOTIFICATION_STATUS' as const;
export const DATAUSER_LOADING = 'DATAUSER_LOADING' as const;
export const DATAUSER_SUCCESS = 'DATAUSER_SUCCESS' as const;
export const DATAUSER_ERROR = 'DATAUSER_ERROR' as const;
export const IMAGEN_SUCCESS = 'IMAGEN_SUCCESS' as const;
export const IMAGEN_LOADING = 'IMAGEN_LOADING' as const;
export const IMAGEN_FAILED = 'IMAGEN_FAILED' as const;
export const TASKS_SUCCESS = 'TASKS_SUCCESS' as const;
export const TASKS_LOADING = 'TASKS_LOADING' as const;
export const TASKS_FAILED = 'TASKS_FAILED' as const;
export const TASKSDATE_SUCCESS = 'TASKSDATE_SUCCESS' as const;
export const TASKSDATE_LOADING = 'TASKSDATE_LOADING' as const;
export const TASKSDATE_FAILED = 'TASKSDATE_FAILED' as const;
export const TASKSIMPORTANTS_SUCCESS = 'TASKSIMPORTANTS_SUCCESS' as const;
export const TASKSIMPORTANTS_LOADING = 'TASKSIMPORTANTS_LOADING' as const;
export const TASKSIMPORTANTS_FAILED = 'TASKSIMPORTANTS_FAILED' as const;
export const TASKSASSIGN_SUCCESS = 'TASKSASSIGN_SUCCESS' as const;
export const TASKSASSIGN_LOADING = 'TASKSASSIGN_LOADING' as const;
export const TASKSASSIGN_FAILED = 'TASKSASSIGN_FAILED' as const;
export const BACKGROUNDS_SUCCESS = 'BACKGROUNDS_SUCCESS' as const;
export const BACKGROUNDS_FAILED = 'BACKGROUNDS_FAILED' as const;
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS' as const;
export const SEARCH_LOADING = 'SEARCH_LOADING' as const;
export const SEARCH_FAILED = 'SEARCH_FAILED' as const;

// Login Actions
export interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
  creds: { username: string; password: string };
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  token: string;
  userdata: { userdata: User };
}

export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  errMess: string;
}

// Logout Actions
export interface LogoutRequestAction {
  type: typeof LOGOUT_REQUEST;
}

export interface LogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}

// User Actions
export interface UserLoadingAction {
  type: typeof USER_LOADING;
}

export interface UserSuccessAction {
  type: typeof USER_SUCCESS;
  user: User;
}

export interface UserErrorAction {
  type: typeof USER_ERROR;
  errMess: string;
}

export interface UserCheckAction {
  type: typeof USER_CHECK;
}

// Tasks Actions
export interface TasksLoadingAction {
  type: typeof TASKS_LOADING;
}

export interface TasksSuccessAction {
  type: typeof TASKS_SUCCESS;
  payload: {
    tasks: Task[];
    todaytasks: Task[];
    favTasks: Task[];
    datetasks: Task[];
    lists: TodoList[];
    groups: Group[];
    assigntasks: Task[];
  };
}

export interface TasksFailedAction {
  type: typeof TASKS_FAILED;
  errMess: string;
}

// Signup Actions
export interface SignupSuccessAction {
  type: typeof SIGNUP_SUCCESS;
  payload: number;
}

export interface SignupFailureAction {
  type: typeof SIGNUP_FAILURE;
  payload: number;
}

// Backgrounds Actions
export interface BackgroundsSuccessAction {
  type: typeof BACKGROUNDS_SUCCESS;
  payload: Backgrounds;
}

export interface BackgroundsFailedAction {
  type: typeof BACKGROUNDS_FAILED;
  errmess: string;
}

// Search Actions
export interface SearchLoadingAction {
  type: typeof SEARCH_LOADING;
}

export interface SearchSuccessAction {
  type: typeof SEARCH_SUCCESS;
  payload: Task[];
}

export interface SearchFailedAction {
  type: typeof SEARCH_FAILED;
  payload: string;
}

// Token Actions
export interface TokenLoadingAction {
  type: typeof TOKEN_LOADING;
}

export interface TokenCheckAction {
  type: typeof TOKEN_CHECK;
}

// Union of all actions
export type AppAction =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutRequestAction
  | LogoutSuccessAction
  | UserLoadingAction
  | UserSuccessAction
  | UserErrorAction
  | UserCheckAction
  | TasksLoadingAction
  | TasksSuccessAction
  | TasksFailedAction
  | SignupSuccessAction
  | SignupFailureAction
  | BackgroundsSuccessAction
  | BackgroundsFailedAction
  | SearchLoadingAction
  | SearchSuccessAction
  | SearchFailedAction
  | TokenLoadingAction
  | TokenCheckAction;
