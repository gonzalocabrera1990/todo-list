import {
  Task,
  Backgrounds,
  BackgroundChange,
  CreateTaskPayload,
  CreateDateTaskPayload,
  CreateGroupPayload,
  CreateListPayload,
  UpdateTaskPayload,
  UpdateDateTaskPayload,
  UpdateGroupTaskPayload,
  UpdateListTaskPayload,
} from '../models';
import { TasksData, TasksState, AuthState, UserState, SignupState, BackgroundsState } from '../redux/state';

export interface UpdateValueState {
  open: boolean;
  description: string;
  _id: string | null;
}

export interface TodayProps {
  tasks: TasksData | null;
  createTask: (task: CreateTaskPayload, userId: string) => void;
  addFavTask: (task: CreateTaskPayload, userId: string, taskId: string) => void;
  updateTask: (url: string, userId: string, task: UpdateTaskPayload) => void;
  checkTask: (url: string, userId: string, task: UpdateTaskPayload) => void;
  deleteTask: (url: string, userId: string, taskId: string) => void;
  backgrounds: Backgrounds | null;
}

export interface TasksProps {
  tasks: TasksData | null;
  createTask: (task: CreateTaskPayload, userId: string) => void;
  updateTask: (url: string, userId: string, task: UpdateTaskPayload) => void;
  checkTask: (url: string, userId: string, task: UpdateTaskPayload) => void;
  deleteTask: (url: string, userId: string, taskId: string) => void;
  backgrounds: Backgrounds | null;
}

export interface TasksDateProps {
  tasks: TasksData | null;
  createDateTask: (task: CreateDateTaskPayload, userId: string) => void;
  updateTask: (url: string, userId: string, task: UpdateDateTaskPayload) => void;
  checkTask: (url: string, userId: string, task: UpdateDateTaskPayload) => void;
  deleteTask: (url: string, userId: string, taskId: string) => void;
  backgrounds: Backgrounds | null;
}

export interface ImportantsProps {
  tasks: TasksData | null;
  createFavTask: (task: CreateTaskPayload, userId: string) => void;
  dropFavTask: (task: CreateTaskPayload, userId: string, taskId: string) => void;
  updateTask: (url: string, userId: string, task: UpdateTaskPayload) => void;
  checkTask: (url: string, userId: string, task: UpdateTaskPayload) => void;
  deleteTask: (url: string, userId: string, taskId: string) => void;
  backgrounds: Backgrounds | null;
}

export interface MyTasksProps {
  tasks: TasksData | null;
  createTask: (task: CreateTaskPayload, userId: string) => void;
  checkTask: (url: string, userId: string, task: UpdateTaskPayload) => void;
  backgrounds: Backgrounds | null;
}

export interface HomeProps {
  user: UserState;
  logoutUser: () => void;
  backgrounds: Backgrounds | null;
}

export interface HeaderProps {
  user: UserState;
  logoutUser: () => void;
  imagenUser: (userId: string, image: FormData) => void;
  tasks: TasksData | null;
  search: (data: Task[][], query: string) => void;
}

export interface LoginProps {
  loginUser: (creds: { username: string; password: string }) => void;
}

export interface SignupProps {
  signupUser: (data: {
    username: string;
    password: string;
    repeatpassword: string;
    firstname: string;
    lastname: string;
    gender: string;
    date: string;
    country: string;
  }) => void;
}

export interface PostSignUpProps {
  signup: SignupState;
}

export interface BackgroundsProps {
  changeBackgrounds: (userId: string, data: BackgroundChange) => void;
}

export interface GroupCreateProps {
  tasks: TasksData | null;
  createGroup: (group: CreateGroupPayload, userId: string) => void;
  backgrounds: Backgrounds | null;
}

export interface GroupViewsProps {
  tasks: TasksData | null;
  updateTaskGroup: (userId: string, oldUser: string, task: UpdateGroupTaskPayload) => void;
  checkTask: (url: string, userId: string, task: Task) => void;
  sendGroupTask: (userId: string, groupId: string, task: { description: string; appointed: string; due: string; group: string }) => void;
  addUserGroup: (userId: string, groupId: string, addUserId: string) => void;
  deleteListGroup: (url: string, userId: string, id: string) => void;
  deleteUserGroup: (userId: string, deletedUserId: string, groupId: string) => void;
  deleteTaskGroup: (userId: string, taskUserId: string, groupId: string, taskId: string) => void;
  backgrounds: Backgrounds | null;
}

export interface ListCreateProps {
  tasks: TasksData | null;
  createList: (list: CreateListPayload, userId: string) => void;
  backgrounds: Backgrounds | null;
}

export interface ListViewsProps {
  tasks: TasksData | null;
  createTaskList: (userId: string, listId: string, task: { description: string }) => void;
  updateTaskList: (userId: string, listId: string, task: UpdateListTaskPayload) => void;
  deleteTaskList: (userId: string, listId: string, taskId: string) => void;
  deleteListGroup: (url: string, userId: string, id: string) => void;
  checkGroupTask: (url: string, userId: string, listId: string, task: UpdateListTaskPayload) => void;
  backgrounds: Backgrounds | null;
}

export interface SearchResultsOwnProps {}

export interface SearchResultsStateProps {
  searchResult: Task[] | null;
  backgrounds: Backgrounds | null;
}

export interface SearchResultsDispatchProps {
  dispatch: (action: any) => any;
}

export type SearchResultsProps = SearchResultsOwnProps & SearchResultsStateProps & SearchResultsDispatchProps;

export interface MainComponentProps {
  auth: AuthState;
  user: UserState;
  tasks: TasksState;
  signup: SignupState;
  backgrounds: BackgroundsState;
  loginUser: (creds: { username: string; password: string }) => void;
  logoutUser: () => void;
  signupUser: (data: {
    username: string;
    password: string;
    repeatpassword: string;
    firstname: string;
    lastname: string;
    gender: string;
    date: string;
    country: string;
  }) => void;
  fetchUser: (id: string) => void;
  createTask: (task: CreateTaskPayload, userId: string) => void;
  createDateTask: (task: CreateDateTaskPayload, userId: string) => void;
  createFavTask: (task: CreateTaskPayload, userId: string) => void;
  addFavTask: (task: CreateTaskPayload, userId: string, taskId: string) => void;
  dropFavTask: (task: CreateTaskPayload, userId: string, taskId: string) => void;
  createGroup: (group: CreateGroupPayload, userId: string) => void;
  createList: (list: CreateListPayload, userId: string) => void;
  createTaskList: (userId: string, listId: string, task: { description: string }) => void;
  updateTaskList: (userId: string, listId: string, task: UpdateListTaskPayload) => void;
  deleteTaskList: (userId: string, listId: string, taskId: string) => void;
  imagenUser: (userId: string, image: FormData) => void;
  changeBackgrounds: (userId: string, data: string | BackgroundChange) => void;
  search: (data: Task[][] | string, query: string) => void;
  updateTask: (url: string, userId: string, task: UpdateTaskPayload | UpdateDateTaskPayload) => void;
  checkTask: (url: string, userId: string, task: UpdateTaskPayload | UpdateDateTaskPayload | Task) => void;
  deleteTask: (url: string, userId: string, taskId: string) => void;
  sendGroupTask: (userId: string, groupId: string, task: { description: string; appointed: string; due: string; group: string }) => void;
  updateTaskGroup: (userId: string, oldUser: string, task: UpdateGroupTaskPayload) => void;
  checkGroupTask: (url: string, userId: string, listId: string, task: UpdateListTaskPayload) => void;
  deleteListGroup: (url: string, userId: string, id: string) => void;
  deleteTaskGroup: (userId: string, taskUserId: string, groupId: string, taskId: string) => void;
  addUserGroup: (userId: string, groupId: string, addUserId: string) => void;
  deleteUserGroup: (userId: string, deletedUserId: string, groupId: string) => void;
}
