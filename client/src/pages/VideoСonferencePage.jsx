import React, { useState, useEffect } from "react";
import userConnect from "../components/videoconference/userConnect";
import "../style/videoconference.css";

const VideoСonferencePage = () => {
    const [ROOM_ID, setROOM_ID] = useState(null);

    const [screenId, setScreenId] = useState(null);
    const [screenReady, setScreenReady] = useState(null);
    const [form, setForm] = useState({
        userName: "",
        orgName: "",
    });
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
        const data = await response.json();
        setScreenId(data);
        console.log(data);
    };
    useEffect(() => {
        if (ROOM_ID) {
            const videoStream = navigator.mediaDevices.getUserMedia({
                video: { width: 854, height: 480 },
                audio: true,
            });
            userConnect(
                ROOM_ID,
                videoStream,
                "video",
                form.userName,
                form.orgName
            );
        }
    }, [ROOM_ID]);
    useEffect(() => {
        if (screenReady !== null) {
            console.log(screenReady);
            userConnect(
                screenId,
                screenReady,
                "screen",
                form.userName,
                form.orgName
            );
        }
    }, [screenReady]);
    useEffect(() => {
        if (screenId) {
            async function startCapture() {
                let captureStream = null;

                try {
                    captureStream =
                        await navigator.mediaDevices.getDisplayMedia({
                            video: { width: 1280, height: 720 },
                            audio: true,
                        });
                } catch (err) {
                    console.error("Error: " + err);
                }
                return captureStream;
            }
            // const ready = async () => {
            //     const videoScreen = navigator.mediaDevices.getDisplayMedia({
            //         video: { width: 1280, height: 720 },
            //         audio: true,
            //     });
            //     return await videoScreen;
            // };

            startCapture().then((result) => {
                setScreenReady(startCapture());
            });
        }
    }, [screenId]);

    return (
        <>
            {!ROOM_ID ? (
                <div className='row '>
                    <div className='col s8 offset-m2 center-align'>
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
                                            required
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
                                            required
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
                    <div id='video-grid' className='row video-grid'></div>
                    <div className='row screen-btn'>
                        <button className='btn' onClick={getScreenId}>
                            Показать экран
                        </button>

                        <button className='btn'>Прекратить демонстрацию</button>
                    </div>
                </>
            )}
        </>
    );
};

export default VideoСonferencePage;
