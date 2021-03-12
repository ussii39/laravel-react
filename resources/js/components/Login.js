import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserisSignIn, getUsername, getUsertoken } from "../redux/selectors";
import { GetloginUser, signIn, signout } from "../redux/operations";

export const Login = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);

    const user = getUsername(selector);
    const isSignIn = getUserisSignIn(selector);
    const token = getUsertoken(selector);

    const [email, Setemail] = useState("");
    const [password, Setpassword] = useState("");

    useEffect(() => {}, []);

    const handleChange = (e) => {
        Setemail(e.target.value);
    };
    const InputPassword = (e) => {
        Setpassword(e.target.value);
    };
    // const Submit = () => {
    //     const data = { email: email, password: password };
    //     axios.post("/api/login", data).then((res) => console.log(res.data));
    // };

    return (
        <div>
            <input type="email" onChange={handleChange} />
            <input type="password" onChange={InputPassword} />

            <button
                type="submit"
                onClick={() => {
                    dispatch(signIn(email, password));
                }}
            >
                送信
            </button>
            <div>{user}さんはログイン状態です。</div>
        </div>
    );
};
