export interface UserImage {
  filename: string;
  contentType?: string;
}

export interface User {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  gender?: string;
  date?: string;
  country?: string;
  image?: UserImage;
}

export interface Task {
  _id: string;
  description: string;
  done: boolean;
  due?: string;
  fav?: boolean;
  user?: string;
  appointed?: User;
  seen?: boolean;
  group?: string;
}

export interface TodoList {
  _id: string;
  name: string;
  tasks: Task[];
  user?: string;
}

export interface Group {
  _id: string;
  name: string;
  leader: User;
  members: User[];
  tasks: Task[];
}

export interface Backgrounds {
  [key: string]: string;
}

export interface BackgroundChange {
  type: string;
  value: string;
}

export interface CreateTaskPayload {
  description: string;
  user: string;
}

export interface CreateDateTaskPayload {
  description: string;
  due: string;
  user: string;
}

export interface CreateGroupPayload {
  name: string;
  leader: string;
}

export interface CreateListPayload {
  name: string;
}

export interface UpdateTaskPayload {
  _id: string;
  description: string;
  done: boolean;
  user: string;
}

export interface UpdateDateTaskPayload {
  _id: string;
  description: string;
  done: boolean;
  due: string;
  user: string;
}

export interface UpdateGroupTaskPayload {
  _id: string;
  description: string;
  done: boolean;
  due: string;
  seen: boolean;
  appointed: User;
  group: string;
}

export interface UpdateListTaskPayload {
  _id: string;
  description: string;
  done: boolean;
}
