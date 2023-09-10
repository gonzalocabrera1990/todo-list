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
  fetchUser
} from "../redux/ActionCreators";

import Login from './Login'
import Signup from './Signup'
import Home from './Home';
import Index from './Index';
import PostSignUp from './postSignUp';
import Navbar from './Header';
import Backgrounds from './backgrounds';
import Importants from './Importants';
import MyTaks from './MyTasks';
import Tasks from './Tasks';
import TaskDate from './TasksDate';
import EmailTasks from './EmailTasks';
import TodayTasks from './Today';


const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
    user: state.user,
    // users: state.users,
    signup: state.signup
    // settings: state.settings,
    // notifications: state.notifications,
    // imagen: state.imagen
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  loginUser: (creds: any) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  signupUser: (User: any) => dispatch(signupUser(User)),
  fetchUser: (id: any) => dispatch(fetchUser(id))
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
  // const isAuthenticated = props.auth.isAuthenticated 
  const isAuthenticated = false
  const LoginPage = () => {
    return isAuthenticated ? (
      <Navigate to="/home" />
    ) : (
      <Login loginUser={props.loginUser} />
    );
  };
  const SignupPage = () => {
    return isAuthenticated ? (
      <Navigate to="/home" />
    ) : (
      <Signup signupUser={props.signupUser} />
    );
  };
  const PostSignUpAuth = () => {
    return isAuthenticated ? (
      <Navigate to="/home" />
    ) : (
      <PostSignUp signup={props.signup} />
    );
  };
  const IndexPage = () => {
    return isAuthenticated ? (
      <Navigate to="/home" />
    ) : (
      <Index />
    );
  };



  const NavbarPage = () => {
    return !isAuthenticated ? (
      null
    ) : (
      <header>
        <Navbar user={props.user} logoutUser={props.logoutUser} />
      </header>
    );
  };
  const HomePage = () => {
    return !isAuthenticated ? (
      <Navigate to="/" />
    ) : (
      <Home user={props.user} logoutUser={props.logoutUser} />
    );
  };
  const ImportantsPage = () => {
    return !isAuthenticated ? (
      <Navigate to="/" />
    ) : (
      <Importants />
    );
  };
  const MyTasksPage = () => {
    return !isAuthenticated ? (
      <Navigate to="/" />
    ) : (
      <MyTaks />
    );
  };
  const TasksPage = () => {
    return !isAuthenticated ? (
      <Navigate to="/" />
    ) : (
      <Tasks />
    );
  };
  const TasksDatePage = () => {
    return !isAuthenticated ? (
      <Navigate to="/" />
    ) : (
      <TaskDate />
    );
  };
    const TodayTasksPage = () => {
    return !isAuthenticated ? (
      <Navigate to="/" />
    ) : (
      <TodayTasks />
    );
  };
  const EmailTasksPage = () => {
    return !isAuthenticated ? (
      <Navigate to="/" />
    ) : (
      <EmailTasks />
    );
  };
  const BackgroundsDisplay = () => {
    return !isAuthenticated ? (
      null
    ) : (
      <Backgrounds />
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
  //   },
  //   {
  //     path: "with-email",
  //     element: <EmailTasksPage />
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
          <Route path="/my-tasks"
            element={<MyTasksPage />}
          ></Route>
           <Route path="/tasks"
            element={<TasksPage />}
          ></Route>
           <Route path="/tasks-date"
            element={<TasksDatePage />}
          ></Route>
          <Route path="/with-email"
            element={<EmailTasksPage />}
          ></Route>
          <Route path="/alltasks"
            element={<HomePage />}
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