import React, { useState } from "react";
import MyButton from "../../UI/button/MyButton";
import io from "socket.io-client";
import Peer from "peerjs";

const ScreenSharing = (props) => {
    const [screenActiveState, setScreenActiveState] = useState(false);
    const [videoScreen, setVideoScreen] = useState(null);
    const [screenSocketId, setScreenSocketId] = useState(null);
    const socket = io("http://localhost:5000");

    const screenSharing = async () => {
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

    const videoScreenStop = () => {
        socket.emit("disc", screenSocketId);

        videoScreen.getTracks().forEach((track) => track.stop());
        setScreenActiveState(false);
    };

    const screenConnect = (ROOM_ID, videoStream, userName, orgName) => {
        const myPeer = new Peer();

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
            setScreenSocketId(id);
            // ret = id;
            socket.emit("join-room", ROOM_ID, id);
        });

        async function connectToNewUser(userId, stream) {
            // This runs when someone joins our room
            const call = myPeer.call(userId, stream); // Call the user who just joined
            // Add their video

            call.on("stream", (userVideoStream) => {});
        }
    };

    return (
        <div>
            {!screenActiveState ? (
                <MyButton onClick={screenSharing}>Показать экран</MyButton>
            ) : (
                <MyButton onClick={videoScreenStop}>
                    Прекратить демонстрацию
                </MyButton>
            )}
        </div>
    );
};

export default ScreenSharing;
