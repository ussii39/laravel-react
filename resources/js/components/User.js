import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const User = () => {
    const [Users, setUsers] = useState([""]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get("/api/user");
        console.log(response.data.users);
        setUsers(response.data.users);
    };

    return (
        <div>
            <h1>Userページ</h1>
            <ul>
                {Users.map((user, index) => (
                    <div key={index}>
                        <li key={index}>{user.name}</li>

                        <Link to={`/user/${user.id}`}>詳細</Link>
                    </div>
                ))}
            </ul>
        </div>
    );
};
