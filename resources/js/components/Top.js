import React, { useState, useEffect, useRef } from "react";
import Circle from "react-circle";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
    getUserisSignIn,
    getUsername,
    getUserpercent,
    getUsertoken,
    getUserId,
    getUserAnsweredIds,
} from "../redux/selectors";
import { SendPercent, SetPutUserAnsweredId } from "../redux/operations";

export const Top = () => {
    const [Questions, SetQuestions] = useState([""]);
    const [CompletedQuestions, SetCompletdQuestions] = useState([""]);

    const [Answers, SetAnswers] = useState([""]);
    const [AnsweredId, SetAnsweredId] = useState(0);
    const [ResAnsweredId, SetResAnsweredId] = useState([""]);
    const [AnotherAnsIds, SetAnotherAnsIds] = useState([""]);
    const [UserPercent, SetUserPercent] = useState("");
    const [UserOwnPercent, SetUserOwnPercent] = useState("");
    const [InputOneAnswer, SetInputOneAnswers] = useState("");

    //percentはreduxを使わず、localとdbに保存
    //初回は数値が計算されないことを利用し、一度のローディングなら値を保持できる。
    //localは前の値を保持するので、リアルタイムの値の変化に強くない(localを引数としてhttp通信を行う等）が、前の値の保持に向いている。

    const dispatch = useDispatch();
    const selector = useSelector((state) => state);

    const user = getUsername(selector);
    const isSignIn = getUserisSignIn(selector);
    const token = getUsertoken(selector);
    const percent = getUserpercent(selector);
    const UserId = getUserId(selector);
    const UserAnsweredIds = getUserAnsweredIds(selector);

    const inputRef = useRef(null);

    useEffect(() => {
        getNotCompletedQuestions();
        getQuestions();
    }, []);
    useEffect(() => {
        Sample();
        GetUserInfo();
        if (ResAnsweredId !== "") {
            dispatch(SetPutUserAnsweredId(ResAnsweredId, UserId));
        }
    }, [ResAnsweredId]);

    useEffect(() => {
        dispatch(SendPercent(UserPercent, UserId));
    }, [UserPercent]);

    const Questionlength = Questions.map((que) => que.id).length;

    const Sample = () => {
        // const obj = JSON.parse(UserAnsweredIds);

        // const a = AnsweredId.map((ob) => ob).length;
        // console.log(a, "AnsweredId");
        console.log(AnsweredId, "/", Questionlength);
        var result01 = AnsweredId / Questionlength;
        var n = 2;
        var result02 = Math.floor(result01 * Math.pow(10, n)) / Math.pow(10, n);
        const UPercent = result02 * 100;
        SetUserPercent(UPercent);
    };
    const InputAnswer = (e) => {
        SetInputOneAnswers(e.target.value);
    };

    const GetUserInfo = () => {
        axios.get("/api/user").then((res) => {
            const UserAnswerIds = res.data.users;
            const la = UserAnswerIds.map((use) => use.AnsweredIds);
            const UserOwnPercent = UserAnswerIds.map((own) => own.percent);
            SetUserOwnPercent(UserOwnPercent);
            const u = JSON.parse(la);
            console.log(u);
            let v = [];
            u.forEach((e, index) => {
                if (e === [null]) {
                    console.log("null");
                    return;
                }
                v += e.length;
            });
            console.log(AnsweredId);
            SetAnsweredId(v);
        });
    };

    const PostAnswer = (id) => {
        const data = { answer: InputOneAnswer };
        const secondData = { completed: 1 };
        axios
            .post("/api/answer", data, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                const ResponseData = res.data;

                const ResIds = ResponseData.map((a) => a.id);
                if (ResIds == id) {
                    ResIds.forEach((re) => {
                        SetResAnsweredId((prev) =>
                            [re, ...prev].filter((y) => y !== "[null]")
                        );
                    });
                    dispatch(SetPutUserAnsweredId(ResAnsweredId, UserId));
                    GetUserInfo();
                    axios
                        .put(`api/question/${id}`, secondData, {
                            headers: { "Content-Type": "application/json" },
                        })
                        .then((res) => console.log(res.data));
                    ShowAnswer();
                    getQuestions();
                    getNotCompletedQuestions();
                    SetInputOneAnswers("");
                    inputRef.current.value = "";
                }
            });
    };

    const getQuestions = () => {
        axios.get("api/questions").then((response) => {
            SetQuestions(response.data);
        });
    };

    const getNotCompletedQuestions = () => {
        axios.get("/api/notcompleted").then((res) => {
            console.log(res.data);
            SetCompletdQuestions(res.data);
        });
    };

    const ShowAnswer = () => {
        axios.get("/api/answer").then((res) => SetAnswers(res.data));
    };

    return (
        <div>
            <Circle
                animate={true} // アニメーションをつけるかどうか
                size={300} // 円の大きさ
                lineWidth={14} // 円の線の太さ
                progress={percent || UserOwnPercent} // 進捗（％）
                progressColor="cornflowerblue"
                進捗部分の色
                bgColor="whitesmoke" //円の進捗部分以外の色
                textColor="hotpink" //テキスト部分の色
                textStyle={{
                    font: "bold 5rem Helvetica, Arial, sans-serif", // テキスト部分のスタイル
                }}
                percentSpacing={10} // %と数値部分の余白
                roundedStroke={true} // 円の進捗部分に丸みをもたせるかどうか
                showPercentage={true} // 進捗数値部分を表示させるかどうか
                showPercentageSymbol={true} // 進捗の%部分を表示させるかどうか
            />
            <div>
                {/* answers.map completed で条件*/}
                {CompletedQuestions.map((question, index) => (
                    <div key={index}>
                        {Answers.map((answer, index) => (
                            <div key={index}>
                                {question.id == answer.id ? (
                                    <div>
                                        正解です！
                                        <div>解説：{answer.title}</div>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        ))}
                        <div>
                            Q:{question.id}
                            {question.question}
                        </div>
                        <button
                            type="Submit"
                            onClick={() => {
                                PostAnswer(question.id);
                            }}
                        >
                            Q:{question.id}の答えを 送信
                        </button>
                    </div>
                ))}
                <dir></dir>
                <div>
                    <input
                        type="text"
                        ref={inputRef}
                        placeholder="答えを半角英数字で入力してください"
                        onChange={InputAnswer}
                    />
                </div>
            </div>
        </div>
    );
};
