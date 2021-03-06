import React, { useState, useEffect, useRef } from "react";
import Circle from "react-circle";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/top.css";
import { useHistory } from "react-router";
import ProgressBar from "@ramonak/react-progress-bar";

import {
    getUserisSignIn,
    getUsername,
    getUserpercent,
    getUsertoken,
    getUserId,
    getUserAnsweredIds,
    getResMessage,
} from "../redux/selectors";
import {
    SendPercent,
    SetPutUserAnsweredId,
    getUserinfo,
} from "../redux/operations";

if (process.env.NODE_ENV !== "production") {
    const { whyDidYouUpdate } = require("why-did-you-update");
    whyDidYouUpdate(React);
}
export const Top = () => {
    const [Questions, SetQuestions] = useState([""]);
    const [Questionlength, SetQuestionLength] = useState([""]);
    const [CompletedQuestions, SetCompletdQuestions] = useState([""]);
    const [message, Setmessage] = useState(false);
    const [Answers, SetAnswers] = useState([""]);
    const [AnsweredId, SetAnsweredId] = useState([]);
    const [ResAnsweredId, SetResAnsweredId] = useState([""]);
    const [AnotherAnsIds, SetAnotherAnsIds] = useState([""]);
    const [SecondAnsIds, SetSecondAnsIds] = useState([""]);

    const [UserPercent, SetUserPercent] = useState("");
    const [UserPoint, SetUserPoint] = useState(0);
    const [NowUserPoint, SetNowUserPoint] = useState("");

    const [UserOwnPercent, SetUserOwnPercent] = useState("");
    const [InputOneAnswer, SetInputOneAnswers] = useState("");

    //percentはreduxを使わず、localとdbに保存
    //初回は数値が計算されないことを利用し、一度のローディングなら値を保持できる。
    //localは前の値を保持するので、リアルタイムの値の変化に強くない(localを引数としてhttp通信を行う等）が、前の値の保持に向いている。

    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const history = useHistory();
    const user = getUsername(selector);
    const isSignIn = getUserisSignIn(selector);
    const token = getUsertoken(selector);
    const percent = getUserpercent(selector);
    const UserId = getUserId(selector);
    const UserAnsweredIds = getUserAnsweredIds(selector);

    const inputRef = useRef(null);

    useEffect(() => {
        GetUserInfo();
        getNotCompletedQuestions();
        getQuestions();
        GetQuestionLength();
    }, []);
    useEffect(() => {
        const userAnswer = JSON.parse(UserAnsweredIds);
        let ll = [];
        userAnswer.forEach((answer) => {
            ll = answer.filter((l) => l !== null);
        });
        const u = ll.join("");
        const uu = [...u];
        console.log(uu, "uu");
        SetSecondAnsIds(uu);
        // dispatch(getUserinfo());
    }, []);
    useEffect(() => {
        // if (window.performance) {
        //     if (performance.navigation.type === 1) {
        //         if (UserPercent == 100 || "100.00") {
        //             history.push("/user");
        //         }
        //     } else {
        //         console.log("リロードされていません");
        //     }
        // }
        dispatch(getUserinfo());
        GetUserInfo();
        Sample();
        if (
            ResAnsweredId.length > 1 ||
            AnsweredId.length === ResAnsweredId.length
        ) {
            console.log(ResAnsweredId, "を送りました。");
            dispatch(SetPutUserAnsweredId(ResAnsweredId, UserId)); //0を送ってしまう原因
        } else {
            console.log(ResAnsweredId, "はfalseyな値です");
        }
        GetUserInfo();
        Sample();
    }, [ResAnsweredId]);

    useEffect(() => {
        if (UserPercent > 0) {
            console.log("0以外です。", UserPercent);
            dispatch(SendPercent(UserPercent, UserId, UserPoint));
        } else {
            console.log("0です", UserPercent);
        }
    }, [UserPercent]);

    useEffect(() => {
        return () => {
            console.log("unmount");
        };
    }, []);

    const Questionleng = Questionlength.map((que) => que.id).length;
    const Sample = () => {
        console.log(Questionleng, "Questionleng");
        // const obj = JSON.parse(UserAnsweredIds);

        // const a = AnsweredId.map((ob) => ob).length;
        // console.log(a, "AnsweredId");
        const last = ResAnsweredId.filter((res) => res !== "").length;

        // const last3 = AnotherAnsIds.map((anot) => anot).filter(
        //     (ano) => ano !== null
        // );

        // console.log(last3, "last3");
        // const yyy = last3.filter((res) => res !== null);

        // console.log("last2の正解数は", `中身は${yyy}`);

        if (last !== 0) {
            const number = AnsweredId.length;
            console.log("answeredは", number);
            console.log("lastは", last);
            console.log(number, "/", Questionleng);

            console.log("正解数は", last);
            var result01 = number / Questionleng;
            var n = 2;
            var result02 =
                Math.floor(result01 * Math.pow(10, n)) / Math.pow(10, n);
            const UPercent = result02 * 100;
            console.log(UPercent);
            SetUserPercent(UPercent);
        }
    };

    const InputAnswer = (e) => {
        SetInputOneAnswers(e.target.value);
    };

    const GetUserInfo = () => {
        axios.get(`/api/user/${UserId}`).then((res) => {
            let UserAnswerIds = res.data.user;
            const la = UserAnswerIds.AnsweredIds;
            // const la = UserAnswerIds.map((use) => use.AnsweredIds);
            const UserOwnPercent = UserAnswerIds.percent;
            const UserPoint = UserAnswerIds.point;
            SetNowUserPoint(UserPoint);
            SetUserOwnPercent(UserOwnPercent);
            const u = JSON.parse(la);
            SetAnotherAnsIds(u);
            console.log(`uは${u}です`);
            let v = [];
            u.forEach((e, index) => {
                if (e === [[null]]) {
                    console.log("null");
                    return;
                }
                v = e.filter((o) => o !== null);
            });
            const y = v.filter((ttt) => ttt !== null);
            console.log("y", y);
            SetAnsweredId([UserAnsweredIds, ...y]);
        });
    };

    // const PostUserPoint = (subjects) => {
    //     axios.get(`/api/user/${UserId}`).then((res) => {
    //         let UserAnswerIds = res.data.user;
    //         // const la = UserAnswerIds.AnsweredIds;
    //         const Userspoint = UserAnswerIds.point;
    //         const subject = Questions.filter(
    //             (question) => question.subjects === "javascript"
    //         );
    //         console.log(subjects, "subject");
    //         // const u = JSON.parse(la);

    //         // let j = "";
    //         // u.forEach((e, index) => {
    //         //     j = e.filter((o) => o !== null).length;
    //         // });
    //         // console.log(j, "j2");

    //         if (subjects !== "") {
    //             const point = Userspoint + 1 * 30;
    //             // SetUserPoint(point);
    //             axios
    //                 .post("/api/userpoint/", { id: UserId, point: point })
    //                 .then((res) => {
    //                     const UserPointData = res.data;
    //                     SetUserPoint(UserPointData.point);
    //                 });
    //         }
    //     });
    // };

    const PostAnswer = (id, subjects) => {
        inputRef.current.value = "";
        SetInputOneAnswers("");
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
                    Setmessage(true);
                    ResIds.forEach((re) => {
                        SetResAnsweredId((prev) =>
                            [re, ...prev].filter((y) => y !== "[null]")
                        );
                    });
                    console.log("正解です");
                    dispatch(SetPutUserAnsweredId(ResAnsweredId, UserId));
                    GetUserInfo();
                    axios
                        .put(`api/question/${id}`, secondData, {
                            headers: { "Content-Type": "application/json" },
                        })
                        .then((res) => console.log(res.data));
                    if (subjects === "javascript") {
                        axios.get(`/api/user/${UserId}`).then((res) => {
                            let UserAnswerIds = res.data.user;
                            // const la = UserAnswerIds.AnsweredIds;
                            const Userspoint = UserAnswerIds.point;
                            const point = Userspoint + 1 * 30;
                            axios
                                .post("/api/userpoint", {
                                    id: UserId,
                                    point: point,
                                })
                                .then((res) => {
                                    const UserPointData = res.data;
                                    SetUserPoint(UserPointData.point);
                                });
                        });
                    }
                    if (subjects === "typescript") {
                        axios.get(`/api/user/${UserId}`).then((res) => {
                            let UserAnswerIds = res.data.user;
                            // const la = UserAnswerIds.AnsweredIds;
                            const Userspoint = UserAnswerIds.point;
                            const point = Userspoint + 1 * 60;
                            axios
                                .post("/api/userpoint/", {
                                    id: UserId,
                                    point: point,
                                })
                                .then((res) => {
                                    const UserPointData = res.data;
                                    SetUserPoint(UserPointData.point);
                                });
                        });
                    }
                    if (subjects === "python") {
                        axios.get(`/api/user/${UserId}`).then((res) => {
                            let UserAnswerIds = res.data.user;
                            // const la = UserAnswerIds.AnsweredIds;
                            const Userspoint = UserAnswerIds.point;
                            const point = Userspoint + 1 * 60;
                            axios
                                .post("/api/userpoint", {
                                    id: UserId,
                                    point: point,
                                })
                                .then((res) => {
                                    const UserPointData = res.data;
                                    SetUserPoint(UserPointData.point);
                                });
                        });
                    }
                    ShowAnswer();
                    inputRef.current.value = "";
                    SetInputOneAnswers("");
                    getNotCompletedQuestions();
                    Sample();
                }
            });
    };

    const getQuestions = () => {
        axios.get("api/random/question").then((response) => {
            axios.get(`/api/user/${UserId}`).then((res) => {
                let UserAnswerIds = res.data.user;
                const jsonUserAnswerIds = JSON.parse(UserAnswerIds.AnsweredIds);

                let UserAnsweredArray = [];
                jsonUserAnswerIds.forEach((json) => {
                    UserAnsweredArray = json;
                });
                const UserPoint = UserAnswerIds.point;
                const Resquestion = response.data;

                let filterUserAnsweredIds = [];
                let id = "id";
                UserAnsweredArray.forEach((arr, i) => {
                    filterUserAnsweredIds[i] = { [id]: arr };
                });

                const filterUserAnsweredId = filterUserAnsweredIds.map(
                    (fillter) => fillter.id
                );

                const array3 = Resquestion.filter(
                    (i) => filterUserAnsweredId.indexOf(i.id) == -1
                ); //送られてくる問題のIDと既に正解した問題のIDの差分の問題だけ取る処理
                if (UserPoint > 100 && UserPoint < 1000) {
                    const FilterTypeScript = array3.filter(
                        (ressub) => ressub.subjects !== "python"
                    );
                    console.log(FilterTypeScript, "FilterTypeScript");
                    SetQuestions(FilterTypeScript);
                } else if (UserPoint >= 1000) {
                    console.log(array3, "array3");
                    SetQuestions(array3);
                } else {
                    console.log("UserPoint is 100以下です");
                    const ResSubject = array3.filter(
                        (ressub) => ressub.subjects === "javascript"
                    );
                    console.log(ResSubject, "ResSubject");
                    SetQuestions(ResSubject);
                }
            });
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
    const GetQuestionLength = () => {
        axios.get("/api/questions").then((res) => SetQuestionLength(res.data));
    };

    return (
        <div className="top-container">
            <div className="circle">
                <Circle
                    animate={true} // アニメーションをつけるかどうか
                    size={300} // 円の大きさ
                    lineWidth={14} // 円の線の太さ
                    progress={UserPercent || UserOwnPercent} // 進捗（％）
                    progressColor="cornflowerblue" //進捗部分の色
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
                    <div className="score-area">
                        <div className="score">{NowUserPoint}</div>
                    </div>
                    {Questions.map((question, index) => (
                        <div key={index}>
                            <div className="question-area">
                                <div className="question">
                                    <div className="question-subjects">
                                        {question.subjects === "python" ? (
                                            <div className="python">
                                                {question.subjects}
                                            </div>
                                        ) : (
                                            <div></div>
                                        )}
                                        {question.subjects === "javascript" ? (
                                            <div className="javascript">
                                                {question.subjects}
                                            </div>
                                        ) : (
                                            <div></div>
                                        )}
                                        {question.subjects === "typescript" ? (
                                            <div className="typescript">
                                                {question.subjects}
                                            </div>
                                        ) : (
                                            <div></div>
                                        )}
                                    </div>
                                    <div>
                                        {question.level === "基礎" ? (
                                            <div className="basic">
                                                {question.level}
                                            </div>
                                        ) : (
                                            <div></div>
                                        )}
                                        {question.level === "標準" ? (
                                            <div className="normal">
                                                {question.level}
                                            </div>
                                        ) : (
                                            <div></div>
                                        )}
                                        {question.level === "応用" ? (
                                            <div className="advance">
                                                {question.level}
                                            </div>
                                        ) : (
                                            <div></div>
                                        )}
                                        {question.id}
                                        {question.question}
                                    </div>
                                    {SecondAnsIds.map((answer, index) => (
                                        <div key={index}>
                                            {answer == question.id ? (
                                                <div>正解です</div>
                                            ) : (
                                                <div></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="form-area">
                                <input
                                    type="text"
                                    ref={inputRef}
                                    placeholder="答えを半角英数字で入力してください"
                                    onChange={InputAnswer}
                                />
                            </div>
                            <button
                                type="Submit"
                                onClick={() => {
                                    PostAnswer(question.id, question.subjects);
                                }}
                            >
                                答えを 送信
                            </button>
                        </div>
                    ))}
                    <dir></dir>
                    <div className="input-area">
                        {/* <input
                            type="text"
                            ref={inputRef}
                            placeholder="答えを半角英数字で入力してください"
                            onChange={InputAnswer}
                        /> */}
                    </div>
                </div>
            </div>
            <div className="show-answer">
                <Link to={"/CompletedQuestions"}>正解した問題を見る</Link>
            </div>
        </div>
    );
};
