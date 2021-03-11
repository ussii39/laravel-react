import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
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
        </div>
    );
};
