import React, { useState, useEffect } from "react";
import MyButton from "../components/UI/button/MyButton";

import DarkForm from "../components/UI/form/DarkForm";
import BlockVideoConference from "../components/videoconference/BlockVideoConference";
import "../style/videoconference.css";

const VideoСonferencePage = () => {
    const [ROOM_ID, setROOM_ID] = useState(null);
    const [form, setForm] = useState({
        userName: "Имя",
        orgName: "Организация",
    });
    const [formValidate, setFormValidate] = useState(true);

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };
    const getROOM_ID = async () => {
        const response = await fetch("/api/videochat");
        const data = await response.json();
        setROOM_ID(data);
    };
    useEffect(() => {
        if (form.orgName !== "" && !form.userName !== "") {
            setFormValidate(false);
        }
        if (form.orgName === "" || form.userName === "") {
            setFormValidate(true);
        }
    }, [form]);
    return (
        <div>
            {!ROOM_ID ? (
                <div className='row '>
                    <DarkForm
                        title='Авторизация в видеоконференции'
                        cardTitle='Форма авторизации'>
                        <div className='input-field'>
                            <input
                                id='userName'
                                type='text'
                                className='yellow-input'
                                name='userName'
                                value={form.userName}
                                onChange={changeHandler}
                                required
                            />
                            <label htmlFor='userName'>Введите Ваше имя</label>
                        </div>
                        <div className='input-field'>
                            <input
                                id='orgName'
                                type='text'
                                className='yellow-input'
                                value={form.orgName}
                                name='orgName'
                                onChange={changeHandler}
                                required
                            />
                            <label htmlFor='orgName'>
                                Введите название Вашей организации
                            </label>
                        </div>

                        <div className='card-action'>
                            <MyButton
                                disabled={formValidate}
                                onClick={getROOM_ID}>
                                Вход
                            </MyButton>
                        </div>
                    </DarkForm>
                </div>
            ) : (
                <BlockVideoConference
                    ROOM_ID={ROOM_ID}
                    userName={form.userName}
                    orgName={form.orgName}
                />
            )}
        </div>
    );
};

export default VideoСonferencePage;
