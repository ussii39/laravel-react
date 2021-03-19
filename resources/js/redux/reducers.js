import * as Actions from "./actions";

import initialState from "../store/initialState";

export const UsersReducer = (state = initialState.users, action) => {
    switch (action.type) {
        case Actions.SIGN_IN:
            return {
                ...state,
                ...action.payload,
            };
        case Actions.SIGN_OUT:
            return {
                ...state,
                ...action.payload,
            };
        case Actions.SEND_PERCENT:
            return {
                ...state,
                ...action.payload,
            };
        case Actions.PUT_USER_ANSWERED_ID:
            return {
                ...state,
                ...action.payload,
            };
        case Actions.GET_LOGIN_USER:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
