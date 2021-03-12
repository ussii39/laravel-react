import { createSelector } from "reselect";

const usersSelector = (state) => state.users;

export const getUserId = createSelector([usersSelector], (state) => state.id);

export const getUserisSignIn = createSelector(
    [usersSelector],
    (state) => state.isSignIn
);

export const getUsername = createSelector(
    [usersSelector],
    (state) => state.name
);

export const getUsertoken = createSelector(
    [usersSelector],
    (state) => state.token
);

export const getUserpercent = createSelector(
    [usersSelector],
    (state) => state.percent
);
