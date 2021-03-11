import React, { useEffect, useState } from "react";
import axios from "axios";

function UserDetail(props) {
    const [user, setUser] = useState([]);

    useEffect(() => {
        getUser();
    }, []);

    console.log(user);
    const getUser = async () => {
        console.log(props.match);
        const response = await axios.get(`/api/user/${props.match.params.id}`);
        console.log(response);
        setUser(response.data.user);
    };
    return (
        <div>
            <h1>User詳細ページ</h1>
            {/* <p>{user.id}</p> */}
            <p>{user.name}</p>
            <p>{user.email}</p>
        </div>
    );
}

export default UserDetail;
