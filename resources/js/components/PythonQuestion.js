import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { useHistory } from "react-router";
import {
    SendPercent,
    SetPutUserAnsweredId,
    getUserinfo,
} from "../redux/operations";

const PythonQuestion = () => {
    const [questions, Setquestions] = useState([]);
    const [InputAnswer, SetInputAnswer] = useState("");
    const [ResAnsweredId, SetResAnsweredId] = useState([""]);

    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const history = useHistory();
    const user = getUsername(selector);
    const isSignIn = getUserisSignIn(selector);
    const token = getUsertoken(selector);
    const percent = getUserpercent(selector);
    const UserId = getUserId(selector);
    const UserAnsweredIds = getUserAnsweredIds(selector);

    useEffect(() => {
        axios.get("/api/question/python").then((res) => {
            Setquestions(res.data);
        });
    }, []);
    useEffect(() => {
        if (ResAnsweredId.length > 1) {
            console.log(ResAnsweredId, "を送りました。");
            dispatch(SetPutUserAnsweredId(ResAnsweredId, UserId)); //0を送ってしまう原因
        } else {
            console.log(ResAnsweredId, "はfalseyな値です");
        }
    }, [ResAnsweredId]);

    const Inputanswer = (e) => {
        SetInputAnswer(e.target.value);
    };

    const Postanswers = (id, subject) => {
        const data = { answer: InputAnswer };
        axios.post("/api/answer", data).then((res) => {
            console.log(res.data);
            const resData = res.data;
            const responseTodoId = resData.map((re, index) => re.id);
            if (responseTodoId == id) {
                responseTodoId.forEach((re, i) => {
                    SetResAnsweredId((prev) =>
                        [re, ...prev].filter((y) => y !== "[null]")
                    );
                });
                dispatch(SetPutUserAnsweredId(ResAnsweredId, UserId));
                console.log(ResAnsweredId);
                console.log("イコールです");
            } else {
                console.log("イコールではありません");
            }
        });
    };

    return (
        <div>
            <div>
                {questions.map((quest, index) => (
                    <div key={index}>
                        {quest.question}
                        <button
                            type="submit"
                            onClick={() => Postanswers(quest.id, quest.subject)}
                        >
                            送信
                        </button>
                    </div>
                ))}
                <input type="text" onChange={Inputanswer} />
            </div>
        </div>
    );
};

export default PythonQuestion;
