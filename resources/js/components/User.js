import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/user.css";
import img from "../../img/taihen.png";
import {
    getUserisSignIn,
    getUsername,
    getUserpercent,
    getUsertoken,
    getUserId,
} from "../redux/selectors";
import { useDispatch, useSelector } from "react-redux";

export const User = () => {
    const [Users, setUsers] = useState([""]);
    const [UsersAnsweredId, setUsersAnsweredId] = useState([""]);
    const [UserPoint, setUserPoint] = useState([""]);

    const dispatch = useDispatch();
    const selector = useSelector((state) => state);

    const UserId = getUserId(selector);

    useEffect(() => {
        getUsers();
    }, []);
    useEffect(() => {});

    const getUsers = () => {
        axios.get(`/api/user/${UserId}`).then((response) => {
            let UsersInfo = response.data.user;
            setUsers([UsersInfo]);
            const userinfo = UsersInfo.AnsweredIds;
            const userpoint = UsersInfo.point;
            setUserPoint([userpoint]);
            const userinf = JSON.parse(userinfo);
            userinf.forEach((userin) => {
                const EceptNull = userin.filter((user) => user !== null).length;
                setUsersAnsweredId([EceptNull]);
            });
        });
    };
    return (
        <div>
            <div className="user-page">
                <div className="user-info">ユーザー情報</div>
                <div className="date">三月</div>
                <div className="stamp-area-container">
                    <div className="stamp-area">
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 100 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 1000 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 1200 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 1300 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 1400 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 1500 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 1600 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 1700 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 1800 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 1900 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 2000 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 2100 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 2200 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 2300 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 2400 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 2500 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 2600 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 2700 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 2800 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 2900 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 3000 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 3200 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 3400 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 3500 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 3600 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 3700 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 4000 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 4100 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 4440 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 4600 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 4800 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 5000 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">ス</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {Users.map((user, index) => (
                <div key={index}>
                    <li key={index}>{user.email}</li>

                    <Link to={`/user/${user.id}`}>詳細</Link>
                </div>
            ))}
        </div>
    );
};
