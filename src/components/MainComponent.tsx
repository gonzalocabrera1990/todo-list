import { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { connect } from "react-redux";
import {
  loginUser,
  logoutUser,
  signupUser,
  fetchUser,
  createTask,
  createDateTask,
  createFavTask,
  addFavTask,
  dropFavTask,
  createGroup,
  createList,
  createTaskList,
  updateTaskList,
  deleteTaskList,
  imagenUser,
  changeBackgrounds,
  search,
  updateTask,
  checkTask,
  deleteTask,
  sendGroupTask,
  updateTaskGroup,
  checkGroupTask,
  deleteListGroup,
  deleteTaskGroup,
  addUserGroup,
  deleteUserGroup
} from "../redux/ActionCreators";

import Login from './Login'
import Signup from './Signup'
import Home from './Home';
import Index from './Index';
import PostSignUp from './postSignUp';
import Navbar from './Header';
import Backgrounds from './backgrounds';
import Importants from './Importants';
import MyTasks from './MyTasks';
import Tasks from './Tasks';
import TaskDate from './TasksDate';
import TodayTasks from './Today';
import GroupCreator from './GroupCreate';
import GroupView from './GroupViews';
import ListsCreator from './ListCreate';
import ListView from './ListViews';
import SearchResults from './SearchResults';
import { RootState } from '../types/redux/state';
import { AppAction } from '../types/redux/actions';
import { MainComponentProps } from '../types/components/props';
import { Dispatch } from 'redux';

const mapStateToProps = (state: RootState) => {
  return {
    auth: state.auth,
    user: state.user,
    tasks: state.tasks,
    signup: state.signup,
    backgrounds: state.backgrounds
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
  loginUser: (creds: { username: string; password: string }) => dispatch(loginUser(creds) as any),
  logoutUser: () => dispatch(logoutUser() as any),
  signupUser: (User: { username: string; password: string; repeatpassword: string; firstname: string; lastname: string; gender: string; date: string; country: string }) => dispatch(signupUser(User) as any),
  fetchUser: (id: string) => dispatch(fetchUser(id) as any),
  createTask: (task: any, id: string) => dispatch(createTask(task, id) as any),
  createDateTask: (task: any, id: string) => dispatch(createDateTask(task, id) as any),
  createFavTask: (task: any, id: string) => dispatch(createFavTask(task, id) as any),
  addFavTask: (taskk: any, userId: string, taskId: string) => dispatch(addFavTask(taskk, userId, taskId) as any),
  dropFavTask: (taskk: any, userId: string, taskId: string) => dispatch(dropFavTask(taskk, userId, taskId) as any),
  createGroup: (group: any, userId: string) => dispatch(createGroup(group, userId) as any),
  sendGroupTask: (userId: string, groupid: string, task: any) => dispatch(sendGroupTask(userId, groupid, task) as any),
  addUserGroup: (userId: string, groupId: string, adduserId: string) => dispatch(addUserGroup(userId, groupId, adduserId) as any),
  deleteUserGroup: (userId: string, deleted: string, groupId: string) => dispatch(deleteUserGroup(userId, deleted, groupId) as any),
  deleteTaskGroup: (userId: string, taskUser: string, groupId: string, taskId: string) => dispatch(deleteTaskGroup(userId, taskUser, groupId, taskId) as any),

  createList: (list: any, userId: string) => dispatch(createList(list, userId) as any),
  createTaskList: (userId: string, listId: string, data: any) => dispatch(createTaskList(userId, listId, data) as any),
  updateTaskList: (userId: string, listId: string, data: any) => dispatch(updateTaskList(userId, listId, data) as any),
  deleteTaskList: (userId: string, listId: string, taskId: string) => dispatch(deleteTaskList(userId, listId, taskId) as any),
  imagenUser: (id: string, img: FormData) => dispatch(imagenUser(id, img) as any),
  changeBackgrounds: (id: string, background: string) => dispatch(changeBackgrounds(id, background) as any),
  search: (id: string, data: any) => dispatch(search(id, data) as any),
  updateTask: (url: string, id: string, data: any) => dispatch(updateTask(url, id, data) as any),
  checkTask: (url: string, id: string, data: any) => dispatch(checkTask(url, id, data) as any),
  deleteTask: (url: string, id: string, taskid: string) => dispatch(deleteTask(url, id, taskid) as any),
  checkGroupTask: (url: string, userId: string, listId: string, taskId: string) => dispatch(checkGroupTask(url, userId, listId, taskId) as any),
  updateTaskGroup: (id: string, oldUser: string, data: any) => dispatch(updateTaskGroup(id, oldUser, data) as any),
  deleteListGroup: (url: string, userId: string, id: string) => dispatch(deleteListGroup(url, userId, id) as any)
});

function Main(props: MainComponentProps) {
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      const id = props.auth.user!.username;
      props.fetchUser(id);
    }
  }, [])

  const LoginPage = () => {
    return props.auth.isAuthenticated ? (
      <Navigate to="/home" />
    ) : (
      <Login loginUser={props.loginUser} />
    );
  };

  const SignupPage = () => {
    return props.auth.isAuthenticated ? (
      <Navigate to="/home" />
    ) : (
      <Signup signupUser={props.signupUser} />
    );
  };

  const PostSignUpAuth = () => {
    return props.auth.isAuthenticated ? (
      <Navigate to="/home" />
    ) : (
      <PostSignUp signup={props.signup} />
    );
  };

  const IndexPage = () => {
    return props.auth.isAuthenticated ? (
      <Navigate to="/home" />
    ) : (
      <Index />
    );
  };

  const NavbarPage = () => {
    return !props.auth.isAuthenticated ? (
      null
    ) : (
      <header>
        <Navbar user={props.user} tasks={props.tasks.tasks} logoutUser={props.logoutUser} imagenUser={props.imagenUser} search={props.search} />
      </header>
    );
  };

  const HomePage = () => {
    return !props.auth.isAuthenticated ? (
      <Navigate to="/" />
    ) : (
      <Home user={props.user} logoutUser={props.logoutUser} backgrounds={props.backgrounds.colors} />
    );
  };

  const ImportantsPage = () => {
    return !props.auth.isAuthenticated ? (
      <Navigate to="/" />
    ) : (
      <Importants tasks={props.tasks.tasks} createFavTask={props.createFavTask} dropFavTask={props.dropFavTask} updateTask={props.updateTask} checkTask={props.checkTask} deleteTask={props.deleteTask} backgrounds={props.backgrounds.colors} />
    );
  };

  const MyTasksPage = () => {
    return !props.auth.isAuthenticated ? (
      <Navigate to="/" />
    ) : (
      <MyTasks tasks={props.tasks.tasks} createTask={props.createTask} backgrounds={props.backgrounds.colors} checkTask={props.checkTask} />
    );
  };

  const TasksPage = () => {
    return !props.auth.isAuthenticated ? (
      <Navigate to="/" />
    ) : (
      <Tasks tasks={props.tasks.tasks} createTask={props.createTask} updateTask={props.updateTask} checkTask={props.checkTask} deleteTask={props.deleteTask} backgrounds={props.backgrounds.colors} />
    );
  };

  const TasksDatePage = () => {
    return !props.auth.isAuthenticated ? (
      <Navigate to="/" />
    ) : (
      <TaskDate tasks={props.tasks.tasks} createDateTask={props.createDateTask} updateTask={props.updateTask} checkTask={props.checkTask} deleteTask={props.deleteTask} backgrounds={props.backgrounds.colors} />
    );
  };

  const TodayTasksPage = () => {
    return !props.auth.isAuthenticated ? (
      <Navigate to="/" />
    ) : (
      <TodayTasks tasks={props.tasks.tasks} createTask={props.createTask} addFavTask={props.addFavTask} updateTask={props.updateTask} checkTask={props.checkTask} deleteTask={props.deleteTask} backgrounds={props.backgrounds.colors} />
    );
  };

  const GroupCreatorPage = () => {
    return !props.auth.isAuthenticated ? (
      <Navigate to="/" />
    ) : (
      <GroupCreator tasks={props.tasks.tasks} createGroup={props.createGroup} backgrounds={props.backgrounds.colors} />
    );
  };

  const GroupViewPage = () => {
    return !props.auth.isAuthenticated ? (
      <Navigate to="/" />
    ) : (
      <GroupView tasks={props.tasks.tasks} backgrounds={props.backgrounds.colors} deleteListGroup={props.deleteListGroup} updateTaskGroup={props.updateTaskGroup} deleteUserGroup={props.deleteUserGroup} checkTask={props.checkTask} deleteTaskGroup={props.deleteTaskGroup} addUserGroup={props.addUserGroup} sendGroupTask={props.sendGroupTask} />
    );
  };

  const ListsCreatorPage = () => {
    return !props.auth.isAuthenticated ? (
      <Navigate to="/" />
    ) : (
      <ListsCreator tasks={props.tasks.tasks} createList={props.createList} backgrounds={props.backgrounds.colors} />
    );
  };

  const ListViewPage = () => {
    return !props.auth.isAuthenticated ? (
      <Navigate to="/" />
    ) : (
      <ListView tasks={props.tasks.tasks} backgrounds={props.backgrounds.colors} createTaskList={props.createTaskList} updateTaskList={props.updateTaskList} deleteTaskList={props.deleteTaskList} checkGroupTask={props.checkGroupTask} deleteListGroup={props.deleteListGroup} />
    );
  };

  const SearchResultPage = () => {
    return !props.auth.isAuthenticated ? (
      <Navigate to="/" />
    ) : (
      <SearchResults />
    );
  };

  const BackgroundsDisplay = () => {
    return !props.auth.isAuthenticated ? (
      null
    ) : (
      <Backgrounds changeBackgrounds={props.changeBackgrounds} />
    );
  };

  return (
    <>
      <NavbarPage />
      <BackgroundsDisplay />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/post-signup" element={<PostSignUpAuth />} />
        <Route path="/home" element={<TodayTasksPage />} />
        <Route path="/importants" element={<ImportantsPage />} />
        <Route path="/mytasks" element={<MyTasksPage />} />
        <Route path="/alltasks" element={<TasksPage />} />
        <Route path="/whitdate" element={<TasksDatePage />} />
        <Route path="/all-tasks" element={<HomePage />} />
        <Route path="/groupcreator" element={<GroupCreatorPage />} />
        <Route path="/group-view/:groupId" element={<GroupViewPage />} />
        <Route path="/listcreator" element={<ListsCreatorPage />} />
        <Route path="/list-view/:listId" element={<ListViewPage />} />
        <Route path="/searchView" element={<SearchResultPage />} />
      </Routes>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Main as any)
