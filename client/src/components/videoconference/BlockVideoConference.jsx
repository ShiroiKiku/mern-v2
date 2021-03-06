import React, { useState, useEffect } from "react";
import MyButton from "../UI/button/MyButton";
import ScreenSharing from "./screen/ScreenSharing";
import io from "socket.io-client";
import Peer from "peerjs";
import BlockCamera from "./camera/BlockCamera";
// import "materialize-css/dist/css/materialize.min.css";
import "../../style/videochat.css";
const BlockVideoConference = (props) => {
    const [connectState, setConnectState] = useState(false);
    const [videoCam, setVideoCam] = useState(null);
    const [micBtnText, setMicBtnText] = useState("Выключить микрофон");
    const [videoBtnText, setVideoBtnText] = useState("Выключить камеру");
    const [usersVideo, setUsersVideo] = useState([null]);
    const [myPeerId, setMyPeerId] = useState(null);
    const usersIdEquals = [];
    const socket = io("http://localhost:5000", {
        reconnection: true,
    });
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

    //

    const userConnect = (ROOM_ID, videoStream, userName, orgName) => {
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
                    videoType: "video",
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

        addVideoStream(myVideo, videoStream); // Display our video to ourselves
        videoStream.getAudioTracks().enable = false;

        myPeer.on("call", async (call) => {
            // When we join someone's room we will receive a call from them
            call.answer(videoStream); // Stream them our video/audio

            const video = document.createElement("video"); // Create a video tag for them

            call.on("stream", (userVideoStream) => {
                // When we recieve their stream

                addVideoStream(video, userVideoStream, call.peer); // Display their video to ourselves
            });
        });

        socket.on("user-connected", (userId) => {
            // If a new user connect

            connectToNewUser(userId, videoStream);
        });
        socket.on("user-disconnected", (userId) => {
            // If a new user disconnect
            console.log("user disconnect ", userId);
            disconnectToNewUser(userId, videoStream);
        });

        myPeer.on("open", (id) => {
            // When we first open the app, have us join a room
            setMyPeerId(id);
            saveHandler(id);
            // ret = id;
            socket.emit("join-room", ROOM_ID, id);
        });

        async function connectToNewUser(userId, stream) {
            // This runs when someone joins our room

            const call = myPeer.call(userId, stream); // Call the user who just joined
            // Add their video

            const video = document.createElement("video");

            call.on("stream", (userVideoStream) => {
                addVideoStream(video, userVideoStream, userId);
            });
        }
        function disconnectToNewUser(userId) {
            // This runs when someone joins our room
            if (document.getElementById(userId)) {
                document.getElementById(userId).remove();
            }
        }
        async function addVideoStream(video, stream, userId) {
            video.srcObject = stream;

            if (!video.classList.contains("myVideo")) {
                await userInfoReturn(userId, video);
            } else {
                await userInfoReturn("my-id", video);
            }
        }
    };

    const userInfoReturn = async (userId, stream) => {
        const userData = await userInfo(userId);
        const boolshit = usersIdEquals.includes(userId);
        if (userId === "my-id") {
            const newUserElement = {
                userId: userId,
                userName: props.userName,
                orgName: props.orgName,
                stream: stream,
                videoType: "my-video",
            };
            if (!boolshit) {
                usersIdEquals.push(userId);
                setUsersVideo((oldArray) => [...oldArray, newUserElement]);
            }
        } else {
            const newUserElement = {
                userId: userId,
                userName: userData.userName,
                orgName: userData.orgName,
                stream: stream,
                videoType: userData.videoType,
            };
            if (!boolshit) {
                usersIdEquals.push(userId);
                setUsersVideo((oldArray) => [...oldArray, newUserElement]);
            }
        }
    };
    const findUser = async (id) => {
        try {
            return await fetch("/api/videochatdata/finduser", {
                method: "POST",
                body: JSON.stringify({ userId: id }),
                headers: { "Content-Type": "application/json" },
            });
        } catch (e) {
            console.log(e);
        }
    };
    const userInfo = async (userId) => {
        try {
            const userInfo = await findUser(userId)
                .then((response) => response.json())
                .catch((err) => {
                    console.log("fetch ошибка ", err);
                });

            return userInfo;
        } catch (error) {}
    };
    const stopConference = () => {
        socket.emit("disc", myPeerId);

        videoCam.getTracks().forEach((track) => track.stop());

        window.location.reload();
    };
    const openBigVideo = () => {
        const openVideoDiv = document.getElementsByClassName("open-video");
        const openVideo = document.createElement("video");
        openVideo.classList.add("open-video__video");
        openVideo.srcObject = videoCam;
        openVideo.addEventListener("loadedmetadata", () => {
            openVideo.play();
            openVideo.muted = true;
        });
        openVideoDiv.append(openVideo);
    };

    return (
        <>
            <div className='row screen-btn center'>
                <div className='col s12 '>
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
                            <div id='video-grid' className='video-grid '>
                                {usersVideo.map((userVideo) => {
                                    if (userVideo) {
                                        return (
                                            <BlockCamera
                                                key={userVideo.userId}
                                                userName={userVideo.userName}
                                                orgName={userVideo.orgName}
                                                userId={userVideo.userId}
                                                stream={userVideo.stream}
                                                videoType={userVideo.videoType}
                                            />
                                        );
                                    }
                                })}
                            </div>
                            {/* <div className='open-video'></div> */}
                            {/* <button onClick={openBigVideo}>Открыть</button> */}
                            <ScreenSharing
                                ROOM_ID={props.ROOM_ID}
                                userName={props.userName}
                                orgName={props.orgName}
                            />
                            <MyButton onClick={stopConference}>
                                Отключиться от конференции
                            </MyButton>
                            <MyButton onClick={microMute}>
                                {micBtnText}
                            </MyButton>
                            <MyButton onClick={videoMute}>
                                {videoBtnText}
                            </MyButton>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default BlockVideoConference;
