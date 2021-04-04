import React from "react";
import { Link } from "react-router-dom";
import "../../css/select.css";

export const select = () => {
    return (
        <div className="title">
            <p>モード選択画面です。</p>
            <div className="maincontainer">
                <div className="tryquestion">
                    <Link to={"/"}>問題を解く</Link>
                </div>
                <div className="selectlang">
                    <Link to={"/selectlang"}>言語別に問題を解く</Link>
                </div>
                <div className="selectlevel">
                    <Link to={"/selectlevel"}>難易度別に問題を解く</Link>
                </div>
                <div className="view">
                    <Link to={"/user"}>成績を見る</Link>
                </div>
                <div className="viewquetions">
                    <Link to={"/CompletedQuestions"}>正解した問題を見る</Link>
                </div>
            </div>
        </div>
    );
};
