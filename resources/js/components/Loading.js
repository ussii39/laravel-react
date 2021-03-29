import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ProgressBar from "@ramonak/react-progress-bar";

export const Loading = () => {
    const history = useHistory();
    const [count, setCount] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            const randomvalue = 25;
            setCount((c) => c + randomvalue);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (count > 100) {
            return () => {
                history.push("/select");
            };
        }
    });

    console.log(count);
    return (
        <div>
            {count < 30 && count < 40 ? <div>loading...</div> : <div></div>}
            {count >= 50 && count < 99 ? (
                <div>...データを読み込んでいます</div>
            ) : (
                <div></div>
            )}
            {count >= 100 ? (
                <div>インストール完了</div>
            ) : (
                <ProgressBar completed={count} bgcolor="#58e476ea" />
            )}
        </div>
    );
};
