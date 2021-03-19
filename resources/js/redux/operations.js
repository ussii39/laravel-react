import {
    getUserAction,
    signInAction,
    signOutAction,
    SendPercentAction,
    PutUserAnsweredId,
} from "./actions";
import { push } from "connected-react-router";
import axios from "axios";

export const signIn = (email, password) => {
    return async (dispatch) => {
        if (email === "" || password === "") {
            return false;
        }
        const data = { email: email, password: password };
        axios
            .post("/api/login", data, {
                headers: { "Content-Type": "application/json" },
            })

            .then((res) => {
                console.log(res.data);
                const data = res.data;

                dispatch(
                    signInAction({
                        isSignIn: true,
                        id: data.user.id,
                        name: data.user.name,
                        token: data.user.token,
                        percent: data.user.percent,
                        AnsweredIds: data.user.AnsweredIds,
                    })
                );
            });
    };
};

export const SendPercent = (UserPercent, UserId) => {
    return async (dispatch) => {
        const SendUserData = { percent: UserPercent, id: UserId };
        axios
            .post("/api/userpercent", SendUserData, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                const userdata = res.data;
                dispatch(
                    SendPercentAction({
                        percent: userdata.percent,
                    })
                );
            });
    };
};

export const SetPutUserAnsweredId = (ResAnsweredId, UserId) => {
    return async (dispatch, getState) => {
        axios
            .put(
                `api/setAnswerId/${UserId}`,
                { AnsweredIds: [ResAnsweredId] },
                { headers: { "Content-Type": "application/json" } }
            )
            .then((res) => {
                const ResAnswerIdsLength = res.data;
                console.log(ResAnswerIdsLength);
                dispatch(
                    PutUserAnsweredId({
                        AnsweredIds: ResAnswerIdsLength.AnsweredIds,
                    })
                );
            });
    };
};

export const signout = () => {
    return async (dispatch, getState) => {
        const token = getState().users.token;
        axios
            .post("/api/logout", "", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                dispatch(signOutAction());
                dispatch(push("/login"));
                console.log(res.data, "ログアウトしました");
            });
    };
};
