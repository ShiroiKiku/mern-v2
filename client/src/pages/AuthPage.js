import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";
import DarkForm from "../components/UI/form/DarkForm";
import MyButton from "../components/UI/button/MyButton";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const { loading, request, error, clearError } = useHttp();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const registerHandler = async () => {
        try {
            const data = await request("/api/auth/register", "POST", {
                ...form,
            });
            message(data.message);
        } catch (e) {}
    };

    const loginHandler = async () => {
        try {
            const data = await request("/api/auth/login", "POST", { ...form });
            auth.login(data.token, data.userId);
        } catch (e) {}
    };

    return (
        <div className='row'>
            <DarkForm
                title='Авторизация пользователя'
                cardTitle='Форма авторизация'>
                <div className='card-content white-text'>
                    <div>
                        <div className='input-field'>
                            <input
                                placeholder='Введите email'
                                id='email'
                                type='text'
                                name='email'
                                className='yellow-input'
                                value={form.email}
                                onChange={changeHandler}
                            />
                            <label htmlFor='email'>Email</label>
                        </div>

                        <div className='input-field'>
                            <input
                                placeholder='Введите пароль'
                                id='password'
                                type='password'
                                name='password'
                                className='yellow-input'
                                value={form.password}
                                onChange={changeHandler}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        loginHandler();
                                    }
                                }}
                            />
                            <label htmlFor='password'>Пароль</label>
                        </div>
                    </div>
                </div>
                <div className='card-action'>
                    <MyButton
                        style={{ marginRight: 10 }}
                        disabled={loading}
                        onClick={loginHandler}>
                        Войти
                    </MyButton>
                    <MyButton onClick={registerHandler} disabled={loading}>
                        Регистрация
                    </MyButton>
                </div>
            </DarkForm>
        </div>
    );
};
