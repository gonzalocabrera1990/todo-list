import { createStore, combineReducers, applyMiddleware } from "redux";
import { Auth } from "./auth";
import { User } from "./user";
// import { Users } from "./usersget";
import { Signup } from "./signup";
// import { Settings } from "./settings";
// import { Notifications } from './notification';
// import { Imagen } from './imagen';
import thunk from "redux-thunk";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      auth: Auth,
      user: User,
      // users: Users,
      signup: Signup
      // setings: Settings,
      // notifications: Notifications,
      // imagen: Imagen
    }),
    applyMiddleware(thunk)
  );

  return store;
};
