import React, { useState, useEffect } from "react";
import axios from "axios";

export const Login = () => {
    const [email, Setemail] = useState("");
    const [password, Setpassword] = useState("");

    const handleChange = (e) => {
        Setemail(e.target.value);
    };
    const InputPassword = (e) => {
        Setpassword(e.target.value);
    };
    const Submit = () => {
        const data = { email: email, password: password };
        axios.post("/api/login", data).then((res) => console.log(res.data));
    };
    return (
        <div>
            <input type="email" onChange={handleChange} />
            <input type="password" onChange={InputPassword} />

            <button type="submit" onClick={() => Submit()}>
                送信
            </button>
        </div>
    );
};
