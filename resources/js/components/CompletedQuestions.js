import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
    getUserisSignIn,
    getUsername,
    getUserpercent,
    getUsertoken,
    getUserId,
    getUserAnsweredIds,
    getResMessage,
} from "../redux/selectors";
import { useDispatch, useSelector } from "react-redux";

export const CompletedQuestions = () => {
    const [CompletedQuestions, SetCompletdQuestions] = useState([""]);
    const selector = useSelector((state) => state);
    const UserId = getUserId(selector);

    useEffect(() => {
        ShowCompletdQuestions();
    }, []);

    useEffect(() => {
        return () => {
            console.log("unmount");
        };
    }, []);

    const ShowCompletdQuestions = () => {
        axios.get("/api/questions").then((res) => {
            axios.get(`/api/user/${UserId}`).then((response) => {
                let UserData = response.data.user;
                const UserAnswerIds = UserData.AnsweredIds;
                const eceptjson = JSON.parse(UserAnswerIds);
                let flatArray = eceptjson.flat();
                const questionIds = res.data;
                const FilteredQuestions = questionIds.filter(
                    (question, i) => flatArray.indexOf(question.id) !== -1
                );
                SetCompletdQuestions(FilteredQuestions);
            });
        });
    };

    return (
        <div>
            <div>
                <div>正解した問題は以下です</div>
                {CompletedQuestions.map((completed, index) => (
                    <div key={index}>
                        <div>Q:{completed.id}</div>
                        <div>{completed.question}</div>
                    </div>
                ))}
            </div>
            <Link to={"/"}>メインページに戻る</Link>
        </div>
    );
};
