import { Task, User, Backgrounds, TodoList, Group } from '../models';

export interface AuthUser {
  username: string;
}

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  errMess: string | null;
  user: AuthUser | null;
  id: string | null;
}

export interface UserState {
  isLoading: boolean;
  errMess: string | null;
  user: User | null;
}

export interface TasksData {
  tasks: Task[];
  todaytasks: Task[];
  favTasks: Task[];
  datetasks: Task[];
  lists: TodoList[];
  groups: Group[];
  assigntasks: Task[];
}

export interface TasksState {
  isLoading: boolean;
  errMess: string | null;
  tasks: TasksData | null;
}

export interface SignupState {
  errMess: string | null;
  successMess: string | null;
}

export interface BackgroundsState {
  colors: Backgrounds | null;
  errMess: string | null;
}

export interface SearchState {
  isLoading: boolean;
  errMess: string | null;
  search: Task[] | null;
}

export interface RootState {
  auth: AuthState;
  user: UserState;
  tasks: TasksState;
  signup: SignupState;
  backgrounds: BackgroundsState;
  searchResult: SearchState;
}
