import { createStore, combineReducers, applyMiddleware } from "redux";
import { Auth } from "./auth";
import { User } from "./user";
// import { Users } from "./usersget";
import { Signup } from "./signup";
import { Tasks } from "./tasks";
import { Backgrounds } from "./backgrounds";
// import { Notifications } from './notification';
import { SearchResult } from './search';
import thunk from "redux-thunk";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      auth: Auth,
      user: User,
      tasks: Tasks,
      signup: Signup,
      backgrounds: Backgrounds,
      // notifications: Notifications,
      searchResult: SearchResult
    }),
    applyMiddleware(thunk)
  );

  return store;
};
