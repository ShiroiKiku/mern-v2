import React from "react";
import io from "socket.io-client";
import Peer from "peerjs";
const openScreenDemonstration = async (screenId, openScreen) => {
    const socket = io("http://localhost:5000", {
        reconnection: true,
    });
    const myPeer = new Peer();
    const videoGrid = document.getElementById("video-grid");
    //блок демонстрации
    const myVideo = document.createElement("video");
    myVideo.classList.add("myVideo");
    await openScreen.then((stream) => {
        console.log(1);
        //демонгстрация себе
        // addVideoStream(myVideo, stream); // Display our video to ourselves
        myPeer.on("call", (call) => {
            console.log(2);
            call.answer(stream);
            const video = document.createElement("video");
            video.id = call.peer;
            call.on("stream", (userVideoStream) => {
                console.log(21);
                // When we recieve their stream
            });
        });
        socket.on("user-connected", (userId) => {
            //отправка видео новому пользователю
            console.log(22);
            connectToNewUser(userId, stream);
        });
    });
    myPeer.on("open", (id) => {
        console.log(3);
        socket.emit("join-room", screenId, id);
        console.log(31);
    });
    //отправка демонстрации новым пользователям
    function connectToNewUser(userId, stream) {
        // This runs when someone joins our room
        console.log(4);
        const call = myPeer.call(userId, stream); // Call the user who just joined
        // Add their video
        console.log(4);
        call.on("stream", (userVideoStream) => {});
    }
    //демонстрация себе
    function addVideoStream(video, stream) {
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", () => {
            if (video.classList.contains("myVideo")) {
                video.muted = true;
                video.play();
                videoGrid.append(video);
            } else {
                video.play();
                videoGrid.append(video); // Append video element to videoGrid
            }
        });
    }
    return true;
};

export default openScreenDemonstration;
