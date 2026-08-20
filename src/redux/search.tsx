import * as ActionTypes from './ActionTypes';
import { AppAction } from '../types/redux/actions';
import { SearchState } from '../types/redux/state';

export const SearchResult = (
  state: SearchState = {
    isLoading: true,
    errMess: null,
    search: null
  },
  action: AppAction
): SearchState => {
  switch (action.type) {
    case ActionTypes.SEARCH_SUCCESS:
      return { ...state, isLoading: false, errMess: null, search: action.payload };

    case ActionTypes.SEARCH_LOADING:
      return { ...state, isLoading: true, errMess: null, search: null };

    case ActionTypes.SEARCH_FAILED:
      return { ...state, isLoading: false, errMess: action.payload, search: null };

    default:
      return state;
  }
};
