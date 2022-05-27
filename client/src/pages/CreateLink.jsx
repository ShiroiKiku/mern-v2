import React, { useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const CreateLink = () => {
    const { loading, request, error, clearError } = useHttp();
    const message = useMessage();
    const [form, setForm] = useState({
        linkUrl: "",
        linkName: "",
        title: "",
        body: "",
    });
    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };
    const createHandler = async () => {
        try {
            const data = await request("/api/page/pagecreate", "POST", {
                ...form,
            });
            message(data.message);
        } catch (e) {}
    };
    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);
    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    return (
        <div className='row'>
            <div className='col s6 offset-s3'>
                <h1>Создать ссылку</h1>
                <div className='card blue darken-1'>
                    <div className='card-content white-text'>
                        <div>
                            <div className='input-field'>
                                <input
                                    id='linkUrl'
                                    type='text'
                                    name='linkUrl'
                                    className='yellow-input'
                                    value={form.linkUrl}
                                    onChange={changeHandler}
                                />
                                <label htmlFor='linkUrl'>URL</label>
                            </div>

                            <div className='input-field'>
                                <input
                                    id='linkName'
                                    type='text'
                                    name='linkName'
                                    className='yellow-input'
                                    value={form.linkName}
                                    onChange={changeHandler}
                                />
                                <label htmlFor='linkName'>Название</label>
                            </div>
                            <div className='input-field'>
                                <input
                                    id='title'
                                    type='text'
                                    name='title'
                                    className='yellow-input'
                                    value={form.title}
                                    onChange={changeHandler}
                                />
                                <label htmlFor='title'>Титульник</label>
                            </div>
                            <div className='input-field'>
                                <input
                                    id='body'
                                    type='text'
                                    name='body'
                                    className='yellow-input'
                                    value={form.body}
                                    onChange={changeHandler}
                                />
                                <label htmlFor='title'>Тело страницы</label>
                            </div>
                        </div>
                    </div>
                    <div className='card-action'>
                        <button
                            className='btn green lighten-1 black-text'
                            onClick={createHandler}
                            disabled={loading}>
                            Создать
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
