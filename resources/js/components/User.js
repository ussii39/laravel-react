import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/user.css";
import img from "../../img/taihen.png";
import typescript from "../../img/typescript.png";
import python from "../../img/python.png";

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
    const [count, setCount] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    const selector = useSelector((state) => state);

    const UserId = getUserId(selector);

    useEffect(() => {
        getUsers();
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((c) => c + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        console.log(count);
        if (count == 4 && UserPoint > 100 && UserPoint < 200) {
            setIsOpen(true);
            console.log("モーダルが表示されました");
        } else if (count == 4 && UserPoint >= 1000 && UserPoint < 1100) {
            setIsOpen(true);
            console.log("モーダルが表示されました");
        }
    });

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
    function Modal() {
        return (
            <div id="overlay" onClick={() => setIsOpen(false)}>
                <div id="content">
                    <div className="modal-item">アイテムを獲得しました!</div>
                    <div className="modal-stamp-img-area">
                        {UserPoint >= 1000 ? (
                            <img
                                className="modal-typescript-stamp"
                                src={python}
                            />
                        ) : (
                            <img
                                className="modal-typescript-stamp"
                                src={typescript}
                            />
                        )}
                    </div>
                    <button
                        className="modal-button"
                        onClick={() => setIsOpen(false)}
                    >
                        close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            {modalIsOpen ? <Modal></Modal> : <div></div>}
            <div className="user-page">
                <div className="user-info">ユーザー情報</div>
                <div className="date">三月</div>
                <div className="stamp-area-container">
                    <div className="stamp-area">
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 100 ? (
                                    user < 200 ? (
                                        <div className="stamp">
                                            <div className="stamp-img-area">
                                                <img
                                                    className="typescript-stamp"
                                                    src={typescript}
                                                />
                                                <img
                                                    className="stamp2"
                                                    src={img}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="stamp">
                                            <div className="stamp-img-area">
                                                <img
                                                    className="typescript-stamp"
                                                    src={typescript}
                                                />
                                                <img
                                                    className="stamp2-non-animation"
                                                    src={img}
                                                />
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img
                                                className="typescript-stamp"
                                                src={typescript}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 500 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">500ポイント</div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 700 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">
                                        700Pでスタンプ獲得
                                    </div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 900 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">
                                        900Pでスタンプ獲得
                                    </div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user >= 1000 ? (
                                    user < 1100 ? (
                                        <div className="stamp">
                                            <div className="stamp-img-area">
                                                <img
                                                    className="typescript-stamp"
                                                    src={python}
                                                />
                                                <img
                                                    className="stamp2"
                                                    src={img}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="stamp">
                                            <div className="stamp-img-area">
                                                <img
                                                    className="typescript-stamp"
                                                    src={python}
                                                />
                                                <img
                                                    className="stamp2-non-animation"
                                                    src={img}
                                                />
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img
                                                className="typescript-stamp"
                                                src={python}
                                            />
                                        </div>
                                    </div>
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
                                    <div className="stamp">
                                        1500Pでスタンプ獲得
                                    </div>
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
                                    <div className="stamp">
                                        1600Pでスタンプ獲得
                                    </div>
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
                                    <div className="stamp">
                                        1700Pでスタンプ獲得
                                    </div>
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
                                    <div className="stamp">
                                        1800Pでスタンプ獲得
                                    </div>
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
                                    <div className="stamp">
                                        1900Pでスタンプ獲得
                                    </div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 2000 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img className="stamp2" src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">
                                        2000Pでスタンプ獲得
                                    </div>
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
                                    <div className="stamp">
                                        2100Pでスタンプ獲得
                                    </div>
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
                                    <div className="stamp">
                                        2200Pでスタンプ獲得
                                    </div>
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
                                    <div className="stamp">
                                        2300Pでスタンプ獲得
                                    </div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 2400 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img className="stamp2" src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">
                                        2400Pでスタンプ獲得
                                    </div>
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
                                    <div className="stamp">
                                        2500Pでスタンプ獲得
                                    </div>
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
                                    <div className="stamp">
                                        2600Pでスタンプ獲得
                                    </div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 2700 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img className="stamp2" src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">
                                        2700Pでスタンプ獲得
                                    </div>
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
                                    <div className="stamp">
                                        2800Pでスタンプ獲得
                                    </div>
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
                                    <div className="stamp">
                                        2900Pでスタンプ獲得
                                    </div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 3000 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img className="stamp2" src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">
                                        3000Pでスタンプ獲得
                                    </div>
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
                                    <div className="stamp">
                                        3200Pでスタンプ獲得
                                    </div>
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
                                    <div className="stamp">
                                        3400Pでスタンプ獲得
                                    </div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 3500 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img className="stamp2" src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">
                                        3500Pでスタンプ獲得
                                    </div>
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
                                    <div className="stamp">
                                        3600Pでスタンプ獲得
                                    </div>
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
                                    <div className="stamp">
                                        3700Pでスタンプ獲得
                                    </div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 4000 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img className="stamp2" src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">
                                        4000Pでスタンプ獲得
                                    </div>
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
                                    <div className="stamp">
                                        4100Pでスタンプ獲得
                                    </div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 4440 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img className="stamp2" src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">
                                        4400Pでスタンプ獲得
                                    </div>
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
                                    <div className="stamp">
                                        4600Pでスタンプ獲得
                                    </div>
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
                                    <div className="stamp">
                                        4800Pでスタンプ獲得
                                    </div>
                                )}
                            </div>
                        ))}
                        {UserPoint.map((user, index) => (
                            <div key={index}>
                                {user > 5000 ? (
                                    <div className="stamp">
                                        <div className="stamp-img-area">
                                            <img className="stamp2" src={img} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="stamp">
                                        5000Pでスタンプ獲得
                                    </div>
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
