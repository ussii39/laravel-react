import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserisSignIn, getUsername, getUsertoken } from "../redux/selectors";
import { GetloginUser, signIn, signout } from "../redux/operations";
import { useHistory } from "react-router";
import "../../css/navbar.css";

export const Navbar = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const history = useHistory();

    const user = getUsername(selector);
    const isSignIn = getUserisSignIn(selector);
    const token = getUsertoken(selector);

    useEffect(() => {
        if (token === "") {
            history.push("/login");
        }
    });

    return (
        <div className="container">
            <div className="content">
                <div className="nav">
                    <Link to="/about">
                        <div className="subject-bar">TypeScript</div>
                    </Link>
                    <Link to="/user">
                        <div className="user">User</div>
                    </Link>
                </div>
            </div>
            <div className="logout-area">
                <div className="logout">
                    {isSignIn === true ? (
                        <div
                            onClick={() => {
                                dispatch(signout());
                            }}
                        >
                            ログアウト
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    );
};
