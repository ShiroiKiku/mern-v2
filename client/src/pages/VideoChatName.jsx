import React, { useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { Link, useHistory } from "react-router-dom";

const VideoChatName = () => {
    // const { loading, request, error, clearError } = useHttp();
    // const message = useMessage();
    const [form, setForm] = useState({
        username: "",
        orgname: "",
    });
    const history = useHistory();
    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };
    // const createHandler = async () => {
    //     history.push({
    //         pathname: "/testpage",
    //         props: { username: "dqwdqwdqwd", orgname: "form.orgname" },
    //     });
    // };
    // useEffect(() => {
    //     message(error);
    //     clearError();
    // }, [error, message, clearError]);
    // useEffect(() => {
    //     window.M.updateTextFields();
    // }, []);
    return (
        <div className='row'>
            <div className='col s6 offset-s3'>
                <h1>Авторизация для видео чата</h1>
                <div className='card blue darken-1'>
                    <div className='card-content white-text'>
                        <div>
                            <div className='input-field'>
                                <input
                                    id='username'
                                    type='text'
                                    name='username'
                                    className='yellow-input'
                                    value={form.username}
                                    onChange={changeHandler}
                                />
                                <label htmlFor='username'>
                                    Введите ваше имя
                                </label>
                            </div>

                            <div className='input-field'>
                                <input
                                    id='orgname'
                                    type='text'
                                    name='orgname'
                                    className='yellow-input'
                                    value={form.orgname}
                                    onChange={changeHandler}
                                />
                                <label htmlFor='orgname'>
                                    Введите название вашей организации
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='card-action'>
                        <Link
                            className='btn green lighten-1 black-text'
                            to='/testpage'
                            res={{ username: "13123123" }}>
                            Присоединиться
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoChatName;
