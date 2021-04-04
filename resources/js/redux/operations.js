import {
    getUserAction,
    signInAction,
    signOutAction,
    SendPercentAction,
    PutUserAnsweredId,
    GetuserInfo,
    catchMessage,
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
                        point: data.user.point,
                    })
                );
                dispatch(push("/about"));
            });
    };
};

export const SendPercent = (UserPercent, UserId, UserPoint) => {
    return async (dispatch) => {
        const SendUserData = {
            percent: UserPercent,
            id: UserId,
            point: UserPoint,
        };
        axios
            .post("/api/userpercent", SendUserData, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                const userdata = res.data;
                dispatch(
                    SendPercentAction({
                        percent: userdata.percent,
                        point: userdata.point,
                    })
                );
            });
    };
};

export const SetPutUserAnsweredId = (ResAnsweredId, UserId) => {
    return async (dispatch, getState) => {
        const postAnsweredData = getState().users.AnsweredIds;
        const lastAnswered = JSON.parse(postAnsweredData);
        let lastAnsweredId = "";
        lastAnswered.forEach((last) => {
            lastAnsweredId = last.filter((las) => las !== null);
        });
        console.log(lastAnsweredId, "lastA");
        let lastAnsweredid = "";

        lastAnsweredId.forEach((re) => {
            lastAnsweredid = re;
        });

        const nextAnsweredId = ResAnsweredId.filter((rr) => rr !== "");

        console.log(lastAnsweredid, "eceptnull");
        console.log(nextAnsweredId, "next");
        const sendData = [...lastAnsweredId, ...nextAnsweredId];
        const b = sendData.filter(function (x, i, self) {
            return sendData.indexOf(x) === i;
        });
        console.log(b, "sendData");
        axios
            .put(
                `/api/setAnswerId/${UserId}`,
                { AnsweredIds: [b] },
                { headers: { "Content-Type": "application/json" } }
            )
            .then((res) => {
                const Res = res.data;
                axios.get(`/api/user/${UserId}`).then((response) => {
                    const UsersInfo = response.data.user;
                    dispatch(
                        PutUserAnsweredId({
                            isSignIn: true,
                            id: UsersInfo.id,
                            name: UsersInfo.name,
                            token: UsersInfo.token,
                            percent: UsersInfo.percent,
                            AnsweredIds: UsersInfo.AnsweredIds,
                            point: UsersInfo.point,
                        })
                    );
                });
            });
    };
};

export const getUserinfo = () => {
    return async (dispatch, getState) => {
        const UserId = getState().users.id;
        axios.get(`/api/user/${UserId}`).then((response) => {
            const Userstatus = response.data.user;
            dispatch(
                GetuserInfo({
                    isSignIn: true,
                    id: Userstatus.id,
                    name: Userstatus.name,
                    token: Userstatus.token,
                    percent: Userstatus.percent,
                    AnsweredIds: Userstatus.AnsweredIds,
                    point: Userstatus.point,
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
