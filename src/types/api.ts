import { Task, Backgrounds, TodoList, Group } from './models';

export interface TasksResponse {
  tasks: Task[];
  todaytasks: Task[];
  favTasks: Task[];
  datetasks: Task[];
  lists: TodoList[];
  groups: Group[];
  assigntasks: Task[];
}

export interface LoginResponse {
  success: boolean;
  token: string;
  userdata: {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    image?: { filename: string };
  };
}

export interface SignupResponse {
  status: number;
  successMess?: string;
  errMess?: string;
}

export interface UserResponse {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  gender?: string;
  date?: string;
  country?: string;
  image?: { filename: string };
  tasks: Task[];
  todaytasks: Task[];
  favTasks: Task[];
  datetasks: Task[];
  lists: TodoList[];
  groups: Group[];
  assigntasks: Task[];
  backgrounds: Backgrounds;
}

export interface ApiResponse {
  success?: boolean;
  token?: string;
  userdata?: UserResponse;
  status?: number;
  tasks?: Task[];
  todaytasks?: Task[];
  favTasks?: Task[];
  datetasks?: Task[];
  lists?: TodoList[];
  groups?: Group[];
  assigntasks?: Task[];
  backgrounds?: Backgrounds;
  message?: string;
}
