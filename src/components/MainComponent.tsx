import { useEffect } from 'react'
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Navigate,
//  BrowserRouter,
//   BrowserRouter
// } from "react-router-dom";
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

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
    user: state.user,
    tasks: state.tasks,
    signup: state.signup,
    backgrounds: state.backgrounds
    // notifications: state.notifications,
    // imagen: state.imagen
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  loginUser: (creds: any) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  signupUser: (User: any) => dispatch(signupUser(User)),
  fetchUser: (id: any) => dispatch(fetchUser(id)),
  createTask: (id: any, task: any) => dispatch(createTask(id, task)),
  createDateTask: (id: any, task: any) => dispatch(createDateTask(id, task)),
  createFavTask: (id: any, task: any) => dispatch(createFavTask(id, task)),
  addFavTask: (taskk: any, userId: string, taskId: any) => dispatch(addFavTask(taskk, userId, taskId)),
  dropFavTask: (taskk: any, userId: string, taskId: any) => dispatch(dropFavTask(taskk, userId, taskId)),
  createGroup: (group: any, userId: string) => dispatch(createGroup(group, userId)),
  sendGroupTask: (userId:string, groupid: string, task: any) => dispatch(sendGroupTask(userId, groupid, task)),
  addUserGroup: (userId: string, groupId: string, adduserId: string) => dispatch(addUserGroup(userId,groupId, adduserId)),
  deleteUserGroup: (userId: string, deleted: string,  groupId: string) => dispatch(deleteUserGroup(userId, deleted,  groupId)),
  deleteTaskGroup: (userId: string, taskUser: string,  groupId: string, taskId: string) => dispatch(deleteTaskGroup(userId, taskUser,  groupId, taskId)),

  createList: (list: any, userId: string) => dispatch(createList(list, userId)),
  createTaskList: (userId: string, listId: any, data: any) => dispatch(createTaskList(userId, listId, data)),
  updateTaskList: (userId: string, listId: any, data: any) => dispatch(updateTaskList(userId, listId, data)),
  deleteTaskList: (userId: string, listId: string, taskId: string) => dispatch(deleteTaskList(userId, listId, taskId)),
  imagenUser: (id: string, img: any) => dispatch(imagenUser(id, img)),
  changeBackgrounds: (id: string, background: any) => dispatch(changeBackgrounds(id, background)),
  search: (id: string, data: any) => dispatch(search(id, data)),
  updateTask: (url: string, id: string, data: any) => dispatch(updateTask(url, id, data)),
  checkTask: (url: string, id: string, data: any) => dispatch(checkTask(url, id, data)),
  deleteTask: (url: string, id: string, taskid: any) => dispatch(deleteTask(url, id, taskid)),
  checkGroupTask: (url: string, userId: string, listId: string, taskId: string) => dispatch(checkGroupTask(url, userId, listId, taskId)),
  updateTaskGroup: ( id: string, oldUser: string, data: any) => dispatch(updateTaskGroup(id, oldUser, data)),
  deleteListGroup: (url: string, userId: string, id: string) => dispatch(deleteListGroup(url, userId, id))
});

function Main(props: any) {
  useEffect(() => {
    // const username = JSON.parse(localStorage.getItem("creds")|| '{}') 
    if (props.auth.isAuthenticated) {
      const id = props.auth.user.username;
      console.log('id', id);

      props.fetchUser(id);
    }
    // props.fetchuser(username.username)
  }, [])
  useEffect(() => {
    <Navigate to="/home" />
  }, [props.auth.isAuthenticated])
  //const isAuthenticated = false
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
        <Navbar user={props.user} tasks={props.tasks.tasks} logoutUser={props.logoutUser} imagenUser={props.imagenUser}  search={props.search}/>
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
      <GroupView tasks={props.tasks.tasks} backgrounds={props.backgrounds.colors} deleteListGroup={props.deleteListGroup} updateTaskGroup={props.updateTaskGroup} deleteUserGroup={props.deleteUserGroup} checkTask={props.checkTask} deleteTaskGroup={props.deleteTaskGroup} addUserGroup={props.addUserGroup} sendGroupTask={props.sendGroupTask}/>
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
      <ListView tasks={props.tasks.tasks} backgrounds={props.backgrounds.colors} createTaskList={props.createTaskList} updateTaskList={props.updateTaskList} deleteTaskList={props.deleteTaskList} checkGroupTask={props.checkGroupTask} deleteListGroup={props.deleteListGroup}/>
    );
  };
  const SearchResultPage = () => {
    return !props.auth.isAuthenticated ? (
      <Navigate to="/" />
    ) : (
      <SearchResults  />
    );
  };
  const BackgroundsDisplay = () => {
    return !props.auth.isAuthenticated ? (
      null
    ) : (
      <Backgrounds changeBackgrounds={props.changeBackgrounds} />
    );
  };
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <IndexPage />
  //   },
  //   {
  //     path: "login",
  //     element: <LoginPage />,
  //   },
  //   {
  //     path: "signup",
  //     element: <SignupPage />
  //   },
  //   {
  //     path: "post-signup",
  //     element: <PostSignUpAuth />
  //   },
  //   {
  //     path: "home",
  //     element: <HomePage />
  //   },
  //   {
  //     path: "importants",
  //     element: <ImportantsPage />
  //   },
  //   {
  //     path: "my-tasks",
  //     element: <MyTasksPage />
  //   },
  //   {
  //     path: "tasks",
  //     element: <TasksPage />
  //   },
  //   {
  //     path: "tasks-date",
  //     element: <TasksDatePage />
  //   },
  //   {
  //     path: "tasks",
  //     element: <TodayTasksPage />
  //   }
  // ]);<RouterProvider router={router} />
  return (
    <>
      <NavbarPage />
      <BackgroundsDisplay />
      <Routes>
        <Route path="/"
          element={<IndexPage />}
        ></Route>
        <Route path="/login"
          element={<LoginPage />}
        ></Route>
        <Route path="/signup"
          element={<SignupPage />}
        ></Route>
        <Route path="/post-signup"
          element={<PostSignUpAuth />}
        ></Route>
        <Route path="/home"
          element={<TodayTasksPage />}
        ></Route>
        <Route path="/importants"
          element={<ImportantsPage />}
        ></Route>
        <Route path="/mytasks"
          element={<MyTasksPage />}
        ></Route>
        <Route path="/alltasks"
          element={<TasksPage />}
        ></Route>
        <Route path="/whitdate"
          element={<TasksDatePage />}
        ></Route>
        <Route path="/all-tasks"
          element={<HomePage />}
        ></Route>
        <Route path="/groupcreator"
          element={<GroupCreatorPage />}
        ></Route>
        <Route path="/group-view/:groupId"
          element={<GroupViewPage />}
        ></Route>
        <Route path="/listcreator"
          element={<ListsCreatorPage />}
        ></Route>
        <Route path="/list-view/:listId"
          element={<ListViewPage />}
        ></Route>
        <Route path="/searchView"
          element={<SearchResultPage />}
        ></Route>
      </Routes>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
// const Login = () => {
//   return this.props.auth.isAuthenticated ? (
//     <Login
//       auth={this.props.auth}
//       inbox={this.props.inbox}
//     />

//   ) :
//     this.props.location.pathname === "/" ? null
//       : <RegisterFormHeader />
// };

// const Headers = () => {
//   return this.props.auth.isAuthenticated ? (
//     <Header
//       auth={this.props.auth}
//       inbox={this.props.inbox}
//     />

//   ) :
//     this.props.location.pathname === "/" ? null
//       : <RegisterFormHeader />
// };