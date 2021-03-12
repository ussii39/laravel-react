import React, { useState, useEffect } from "react";
import Circle from "react-circle";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
    getUserisSignIn,
    getUsername,
    getUserpercent,
    getUsertoken,
    getUserId,
} from "../redux/selectors";
import { SendPercent } from "../redux/operations";

export const Top = () => {
    const [Questions, SetQuestions] = useState([""]);
    const [Answers, SetAnswers] = useState([""]);
    const [InputOneAnswer, SetInputOneAnswers] = useState("");

    const dispatch = useDispatch();
    const selector = useSelector((state) => state);

    const user = getUsername(selector);
    const isSignIn = getUserisSignIn(selector);
    const token = getUsertoken(selector);
    const percent = getUserpercent(selector);
    const UserId = getUserId(selector);

    useEffect(() => {
        getQuestions();
        ShowAnswer();
        console.log(percent);
    }, []);

    const ansersLength = Answers.filter((answer) => answer.id).length;
    console.log(ansersLength);

    const QuestionLength = Questions.filter((question) => question.id).length;
    console.log(QuestionLength);
    var result01 = ansersLength / QuestionLength;
    var n = 2;
    var result02 = Math.floor(result01 * Math.pow(10, n)) / Math.pow(10, n);
    const UserPercent = result02 * 100;
    console.log(UserPercent);

    const InputAnswer = (e) => {
        SetInputOneAnswers(e.target.value);
    };

    const PostUserAnswerPercent = () => {
        const SendUserData = { percent: UserPercent, id: UserId };
        axios
            .post("/api/userpercent", SendUserData, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => console.log(res.data));
    };

    const PostAnswer = () => {
        const data = { answer: InputOneAnswer };
        axios
            .post("/api/answer", data, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => console.log(res.data));
    };

    const getQuestions = () => {
        axios.get("/api/questions").then((res) => SetQuestions(res.data));
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
                progress={percent} // 進捗（％）
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
                {Questions.map((question, index) => (
                    <div key={index}>
                        <div>{question.question}</div>
                        <input
                            type="text"
                            placeholder="答えを半角英数字で入力してください"
                            onChange={InputAnswer}
                        />
                        <button type="submit" onClick={PostAnswer}>
                            送信
                        </button>
                    </div>
                ))}
                <button type="submit" onClick={ShowAnswer}>
                    答えを表示する
                </button>
                <div>
                    {Answers.map((answer, index) => (
                        <div key={index}>
                            <div className="answer-area">
                                答えは{answer.answer}
                            </div>
                            <div className="description-area">
                                解説{answer.title}
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    type="submit"
                    onClick={() => {
                        dispatch(SendPercent(UserPercent, UserId));
                    }}
                >
                    結果を送信する
                </button>
            </div>
        </div>
    );
};
