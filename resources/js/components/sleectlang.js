import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/selectLang.css";
import {
    getUserisSignIn,
    getUsername,
    getUserpercent,
    getUsertoken,
    getUserId,
    getUserPoint,
} from "../redux/selectors";
import {
    SendPercent,
    SetPutUserAnsweredId,
    getUserinfo,
} from "../redux/operations";
import { useDispatch, useSelector } from "react-redux";

export const selectlang = () => {
    const [Users, setUsers] = useState([""]);
    const [UsersAnsweredId, setUsersAnsweredId] = useState([""]);
    const [UserPoint, setUserPoint] = useState([""]);

    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const UserId = getUserId(selector);
    const userPoint = getUserPoint(selector);

    useEffect(() => {
        getUsers();
        dispatch(getUserinfo());
        console.log(UserPoint);
    }, []);

    const getUsers = () => {
        axios.get(`/api/user/${UserId}`).then((response) => {
            let UsersInfo = response.data.user;
            setUsers([UsersInfo]);
            const userinfo = UsersInfo.AnsweredIds;
            const userpoint = UsersInfo.point;
            setUserPoint([userpoint]);
            const userinf = JSON.parse(userinfo);
            userinf.forEach((userin) => {
                const EceptNull = userin.filter((user) => user !== null).length;
                setUsersAnsweredId([EceptNull]);
            });
        });
    };

    return (
        <div className="select-lang-area">
            <div className="select-lang-text">言語選択画面です</div>
            <div className="typescript-question-area">
                <Link to={"/selectlang/typescript"}>TypeScriptへ</Link>
            </div>
            {userPoint >= 1000 || UserPoint >= 1000 ? (
                <div className="python-question-area">
                    <Link to={"/selectlang/python"}>Pythonへ</Link>
                </div>
            ) : (
                <div className="python-question-area">
                    <div className="python-question-text">Pythonへ</div>
                </div>
            )}
        </div>
    );
};
