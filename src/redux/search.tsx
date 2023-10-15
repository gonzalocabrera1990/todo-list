import * as ActionTypes from './ActionTypes';
type State = {
    isLoading: boolean;
    errMess: string | null;
    search: any| null;
  }
export const SearchResult = (state:State = {
    isLoading: true,
    errMess: null,
    search: null
}, action:any) => {
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
}