import { createStore, combineReducers, applyMiddleware } from "redux";
import { Auth } from "./auth";
import { User } from "./user";
import { Signup } from "./signup";
import { Tasks } from "./tasks";
import { Backgrounds } from "./backgrounds";
import { SearchResult } from './search';
import thunk from "redux-thunk";
import { RootState } from "../types/redux/state";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers<RootState>({
      auth: Auth,
      user: User,
      tasks: Tasks,
      signup: Signup,
      backgrounds: Backgrounds,
      searchResult: SearchResult
    }),
    applyMiddleware(thunk)
  );

  return store;
};
