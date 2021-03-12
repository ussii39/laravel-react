import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserisSignIn, getUsername, getUsertoken } from "../redux/selectors";
import { GetloginUser, signIn, signout } from "../redux/operations";

export const Navbar = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);

    const user = getUsername(selector);
    const isSignIn = getUserisSignIn(selector);
    const token = getUsertoken(selector);

    return (
        <div>
            <nav>
                <ul className="nav">
                    <Link to="/about">
                        <li>About</li>
                    </Link>
                    <Link to="/user">
                        <li>User</li>
                    </Link>
                </ul>
            </nav>
            <div>
                {isSignIn === true ? (
                    <button
                        type="submit"
                        onClick={() => {
                            dispatch(signout());
                        }}
                    >
                        ログアウトする
                    </button>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
};
