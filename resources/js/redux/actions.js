export const SIGN_IN = "SIGN_IN";

export const signInAction = (userState) => {
    return {
        type: "SIGN_IN",
        payload: {
            isSignIn: true,
            name: userState.name,
            id: userState.id,
            token: userState.token,
            percent: userState.percent,
            AnsweredIds: userState.AnsweredIds,
        },
    };
};

export const SEND_PERCENT = "SEND_PERCENT";
export const SendPercentAction = (userState) => {
    return {
        type: "SEND_PERCENT",
        payload: {
            percent: userState.percent,
        },
    };
};
export const PUT_USER_ANSWERED_ID = "PUT_USER_ANSWERED_ID";
export const PutUserAnsweredId = (userState) => {
    return {
        type: "PUT_USER_ANSWERED_ID",
        payload: {
            AnsweredIds: userState.AnsweredIds,
        },
    };
};

export const SIGN_OUT = "SIGN_OUT";

export const signOutAction = () => {
    return {
        type: "SIGN_OUT",
        payload: {
            isSignIn: false,
            name: "",
            id: "",
            token: "",
            percent: "0",
            AnsweredIds: [],
        },
    };
};
