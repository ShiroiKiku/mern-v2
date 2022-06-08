import React, { useState, useEffect, useRef } from "react";

import "../style/videochat.css";

import VideoChatConnect from "../components/videochat/VideoChatConnect";
import VideoChatScreen from "../components/videochat/VideoChatScreen";

const VideoChat = () => {
    const [ROOM_ID, setROOM_ID] = useState(null);
    const [screenId, setScreenId] = useState(null);
    const [form, setForm] = useState({ userName: "", orgName: "" });
    const [screenStream, setScreenStream] = useState(null);
    const stateValue = useRef(null);

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };
    const getROOM_ID = async () => {
        const response = await fetch("/api/videochat");
        const data = await response.json();
        setROOM_ID(data);
    };
    const getScreenId = async () => {
        const response = await fetch("/api/videochat");
        const id = await response.json();
        setScreenId(id);
    };

    useEffect(() => {
        if (ROOM_ID) {
            VideoChatConnect(ROOM_ID, form);
        }
    }, [ROOM_ID]);

    const demScreen = async () => {
        try {
            const blockDivDcreen = document.getElementById("screen");
            blockDivDcreen.classList.add("col", "s4", "block-video");
            const videoGreed = document.getElementById("video-grid");
            const dem = document.createElement("video");
            dem.classList.add("dem", "user-video");

            dem.setAttribute("id", "dem");
            const boolScreen = async () => {
                try {
                    let mediaStream =
                        await navigator.mediaDevices.getDisplayMedia({
                            video: true,
                            audio: true,
                        });

                    return mediaStream;
                } catch (error) {
                    stateValue.current = false;
                    setScreenStream(stateValue.current);
                }
            };
            const mediaStream = boolScreen();
            dem.srcObject = await mediaStream;
            dem.play();
            videoGreed.appendChild(blockDivDcreen);
            blockDivDcreen.appendChild(dem);
            console.log(1);
            screenVideoConnect();
        } catch (e) {
            console.log("Unable to acquire screen capture: " + e);
        }
    };

    //отправка демонстрации
    const screenVideoConnect = async () => {
        try {
            console.log(2);
            await getScreenId();
            VideoChatScreen(screenId);
        } catch (e) {
            console.log(e);
        }
    };

    const screenClose = () => {
        const dem = document.getElementById("dem");
        dem.remove();
    };

    useEffect(() => {
        if (screenStream === true) {
            demScreen();
        } else if (screenStream === false) {
            screenClose();
        } else {
            console.log("нет демонстрации");
        }
    }, [stateValue.current]);
    const stateScreen = async (value) => {
        stateValue.current = value;
        setScreenStream(stateValue.current);
    };
    return (
        <>
            {!ROOM_ID ? (
                <div className='row'>
                    <div className='col'>
                        <h2>Авторизация в видеоконференции</h2>
                        <div className='card blue darken-1'>
                            <div className='card-content white-text'>
                                <div>
                                    <div className='input-field'>
                                        <input
                                            id='userName'
                                            type='text'
                                            className='yellow-input'
                                            name='userName'
                                            value={form.userName}
                                            onChange={changeHandler}
                                        />
                                        <label htmlFor='userName'>
                                            Введите Ваше имя
                                        </label>
                                    </div>
                                    <div className='input-field'>
                                        <input
                                            id='orgName'
                                            type='text'
                                            className='yellow-input'
                                            value={form.orgName}
                                            name='orgName'
                                            onChange={changeHandler}
                                        />
                                        <label htmlFor='orgName'>
                                            Введите название Вашей организации
                                        </label>
                                    </div>

                                    <div className='card-action'>
                                        <button
                                            className='btn green lighten-1 black-text'
                                            onClick={getROOM_ID}>
                                            Вход
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div id='video-grid' className='row'>
                        <div
                            className='col s4 block-video'
                            id='my-video-block'></div>
                    </div>
                    <div id='screen'></div>
                    {screenStream !== true ? (
                        <button onClick={() => stateScreen(true)}>
                            Показать экран
                        </button>
                    ) : (
                        <button onClick={() => stateScreen(false)}>
                            Прекратить демонстрацию
                        </button>
                    )}
                </>
            )}
        </>
    );
};

export default VideoChat;
