import * as ActionTypes from './ActionTypes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Notifications = (state = {
    isLoading: null,
    results: [],
    errMess: null,
}, action: any) => {
    switch (action.type) {
        case ActionTypes.NOTIFICATION_LOADING:
            return {
                ...state,
                isLoading: true,
                results: [],
                errMess: false
            };
        case ActionTypes.NOTIFICATION_SUCCESS:
            return {
                ...state,
                isLoading: null,
                results: action.payload,
                errMess: false
            };
        case ActionTypes.NOTIFICATION_ERROR:
            return {
                ...state,
                isLoading: null,
                results: [],
                errMess: action.ERR
            };


        default:
            return state
    }
}
