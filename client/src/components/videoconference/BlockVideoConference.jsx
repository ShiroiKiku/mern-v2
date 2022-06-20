import React, { useEffect, useState } from "react";
import userConnect from "./userConnect";
import screenConnect from "./screenConnect";
import MyButton from "../UI/button/MyButton";
import screenDisconnect from "./screenDisconnect";

import io from "socket.io-client";
import Peer from "peerjs";

const BlockVideoConference = (props) => {
    const [screenId, setScreenId] = useState(null);
    const [connectState, setConnectState] = useState(false);
    const [screenActiveState, setScreenActiveState] = useState(false);
    const [videoScreen, setVideoScreen] = useState(null);
    const [screenConnectId, setScreenConnectId] = useState(null);
    const [videoCam, setVideoCam] = useState(null);
    const [micBtnText, setMicBtnText] = useState("Выключить микрофон");
    const [videoBtnText, setVideoBtnText] = useState("Выключить камеру");

    const connectVideoChat = async () => {
        setConnectState(true);
        navigator.mediaDevices
            .enumerateDevices()
            .then((stream) => gotDevices(stream));
    };
    async function gotDevices(deviceInfo) {
        var videoDevise = 0;
        var audioDevise = 0;
        var video = null;
        var audio = null;
        for (var i = 0; i !== deviceInfo.length; ++i) {
            if (deviceInfo[i].kind === "audioinput") {
                audioDevise++;
            } else if (deviceInfo[i].kind === "videoinput") {
                videoDevise++;
            }
        }

        if (videoDevise > 0 && audioDevise > 0) {
            video = { width: 854, height: 480 };
            audio = true;
        } else if (videoDevise === 0 && audioDevise > 0) {
            video = false;
            audio = true;
        } else if (videoDevise > 0 && audioDevise === 0) {
            video = { width: 854, height: 480 };
            audio = false;
        } else if (videoDevise === 0 && audioDevise === 0) {
            video = false;
            audio = false;
        }
        const videoStream = await navigator.mediaDevices.getUserMedia({
            video: video,
            audio: audio,
        });

        setVideoCam(videoStream);
        userConnect(props.ROOM_ID, videoStream, props.userName, props.orgName);
    }
    const screenCapture = async () => {
        await navigator.mediaDevices
            .getDisplayMedia({
                video: { width: 1280, height: 720 },
                audio: true,
            })
            .then((stream) => {
                setVideoScreen(stream);

                screenConnect(
                    props.ROOM_ID,
                    stream,
                    props.userName,
                    props.orgName
                );
            });

        setScreenActiveState(true);
    };

    useEffect(() => {
        if (screenId) {
            screenCapture();
        }
    }, [screenId]);

    const getScreenId = async () => {
        const response = await fetch("/api/videochat");
        const data = await response.json();
        setScreenId(data);
    };

    const microMute = () => {
        if (videoCam.getAudioTracks()[0].enabled === true) {
            setMicBtnText("Включить микрофон");
            videoCam.getAudioTracks()[0].enabled = false;
        } else {
            setMicBtnText("Выключить микрофон");
            videoCam.getAudioTracks()[0].enabled = true;
        }
    };
    const videoMute = () => {
        if (videoCam.getVideoTracks()[0].enabled === true) {
            setVideoBtnText("Включить камеру");
            videoCam.getVideoTracks()[0].enabled = false;
        } else {
            setVideoBtnText("Выключить камеру");
            videoCam.getVideoTracks()[0].enabled = true;
        }
    };
    const socket = io("http://localhost:5000");
    const videoScreenStop = () => {
        //  socket.emit("disc", screenConnectId);
        socket.emit("disc", screenConnectId);
        io.sockets.connected[screenConnectId].disconnect();
    };
    //

    const screenConnect = (ROOM_ID, videoStream, userName, orgName) => {
        const myPeer = new Peer();

        const myVideo = document.createElement("video");
        myVideo.classList.add("myVideo");

        const saveHandler = async (id) => {
            try {
                const form = {
                    userName: userName,
                    orgName: orgName,
                    roomId: ROOM_ID,
                    userId: id,
                    videoType: "screen",
                };

                fetch("/api/videochatdata/savedata", {
                    method: "POST",
                    body: JSON.stringify(form),
                    headers: { "Content-Type": "application/json" },
                });
            } catch (e) {
                console.log(e);
            }
        };

        myPeer.on("call", async (call) => {
            // When we join someone's room we will receive a call from them
            call.answer(videoStream); // Stream them our video/audio

            const video = document.createElement("video"); // Create a video tag for them
            video.id = call.peer;

            call.on("stream", (userVideoStream) => {
                // When we recieve their stream
            });
        });
        socket.on("user-connected", (userId) => {
            // If a new user connect

            connectToNewUser(userId, videoStream);
        });

        myPeer.on("open", (id) => {
            // When we first open the app, have us join a room

            saveHandler(id);
            setScreenConnectId(id);
            // ret = id;
            socket.emit("join-room", ROOM_ID, id);
        });

        async function connectToNewUser(userId, stream) {
            // This runs when someone joins our room
            const call = myPeer.call(userId, stream); // Call the user who just joined
            // Add their video

            const video = document.createElement("video");
            video.id = userId;

            call.on("stream", (userVideoStream) => {});
        }
    };
    //
    return (
        <>
            <div className='row screen-btn center'>
                {!connectState ? (
                    <>
                        {/* <ion-icon name='cloud-download-outline'></ion-icon> */}
                        <MyButton onClick={connectVideoChat}>
                            Присоединиться к видеоконференции c микрофоном и
                            камерой
                        </MyButton>
                    </>
                ) : (
                    <>
                        <MyButton onClick={connectVideoChat}>
                            Отключиться от конференции
                        </MyButton>
                        <MyButton onClick={microMute}>{micBtnText}</MyButton>
                        <MyButton onClick={videoMute}>{videoBtnText}</MyButton>
                    </>
                )}
                {!screenActiveState && connectState && (
                    <MyButton onClick={getScreenId}>Показать экран</MyButton>
                )}
                {screenActiveState && connectState && (
                    <MyButton onClick={videoScreenStop}>
                        Прекратить демонстрацию
                    </MyButton>
                )}
            </div>
            <div id='video-grid' className=' video-grid'></div>
        </>
    );
};

export default BlockVideoConference;
