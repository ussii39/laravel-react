import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const CompletedQuestions = () => {
    const [CompletedQuestions, SetCompletdQuestions] = useState([""]);

    useEffect(() => {
        ShowCompletdQuestions();
    }, []);

    useEffect(() => {
        return () => {
            console.log("unmount");
        };
    }, []);

    const ShowCompletdQuestions = () => {
        axios.get("/api/completed").then((res) => {
            SetCompletdQuestions(res.data);
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
