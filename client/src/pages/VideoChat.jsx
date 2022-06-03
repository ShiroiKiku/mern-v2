import React, { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import Peer from "peerjs";
import { useHttp } from "../hooks/http.hook";

const VideoChat = () => {
    // const { request, loading } = useHttp();
    // const [roomid, setRoomid] = useState(null);
    // const getRoomid = useCallback(async () => {
    //     const fetched = await request(`/api/videochat`, "GET");
    //     console.log(fetched);
    //     setRoomid(fetched);
    // }, [request]);
    // const qwe = getRoomid();
    // useEffect(() => {
    //     getRoomid();
    // }, [qwe]);
    // const ROOM_ID = () => {
    //     if (!loading) {
    //         return roomid;
    //     }
    // };

    const [state, setState] = useState();

    const getState = async () => {
        const response = await fetch("/api/videochat");
        const data = await response.json();
        console.log("data", data);
        setState(data);
        console.log(state.data);
    };
    useEffect(() => {
        getState();
        return console.log(state);
    }, []);

    // const ROOM_ID = "roomtsoss";
    // const socket = io("http://localhost:5000");
    // const videoGrid = document.getElementById("video-grid"); // Find the Video-Grid element
    // const myPeer = new Peer(); // Creating a peer element which represents the current user
    // const myVideo = document.createElement("video"); // Create a new video tag to show our video
    // myVideo.classList.add("col", "s4");

    // navigator.mediaDevices
    //     .getUserMedia({
    //         video: true,
    //         audio: true,
    //     })
    //     .then((stream) => {
    //         addVideoStream(myVideo, stream); // Display our video to ourselves

    //         myPeer.on("call", (call) => {
    //             // When we join someone's room we will receive a call from them
    //             call.answer(stream); // Stream them our video/audio
    //             const video = document.createElement("video"); // Create a video tag for them
    //             video.classList.add("col", "s5");
    //             call.on("stream", (userVideoStream) => {
    //                 // When we recieve their stream
    //                 addVideoStream(video, userVideoStream); // Display their video to ourselves
    //             });
    //         });

    //         socket.on("user-connected", (userId) => {
    //             // If a new user connect
    //             connectToNewUser(userId, stream);
    //         });
    //     });

    // myPeer.on("open", (id) => {
    //     // When we first open the app, have us join a room
    //     socket.emit("join-room", ROOM_ID, id);
    //     console.log(id);
    // });

    // function connectToNewUser(userId, stream) {
    //     // This runs when someone joins our room
    //     const call = myPeer.call(userId, stream); // Call the user who just joined
    //     // Add their video
    //     const video = document.createElement("video");
    //     call.on("stream", (userVideoStream) => {
    //         addVideoStream(video, userVideoStream);
    //         video.classList.add("col", "s4");
    //     });
    //     // If they leave, remove their video
    //     call.on("close", () => {
    //         video.remove();
    //     });
    // }

    // function addVideoStream(video, stream) {
    //     video.srcObject = stream;
    //     video.addEventListener("loadedmetadata", () => {
    //         // Play the video as it loads
    //         video.play();
    //     });
    //     videoGrid.append(video); // Append video element to videoGrid
    // }

    // socket.emit("test", {
    //     message: "oh hi",
    // });
    return (
        <div className='container'>
            <div id='video-grid' className='row'></div>
        </div>
    );
};

export default VideoChat;
