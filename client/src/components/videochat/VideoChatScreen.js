import React from "react";
import io from "socket.io-client";
import Peer from "peerjs";
const VideoChatScreen = (ROOM_ID) => {
    console.log(3);
    const socket = io("http://localhost:5000", {
        reconnection: true,
    });
    const videoGrid = document.getElementById("video-grid"); // Find the Video-Grid element
    const myPeer = new Peer(); // Creating a peer element which represents the current user
    const showScreen = document.createElement("video"); // Create a new video tag to show our video

    navigator.mediaDevices
        .getUserMedia({
            video: true,
            audio: true,
        })
        .then((stream) => {
            console.log(4);
            myPeer.on("call", (call) => {
                console.log(5);
                // When we join someone's room we will receive a call from them
                call.answer(stream); // Stream them our video/audio
            });
        });

    myPeer.on("open", (id) => {
        // When we first open the app, have us join a room
        socket.emit("join-room", ROOM_ID, id, "screen", "screen");
        console.log(6);
    });
};

// function addVideoStream(video, stream) {
//     video.srcObject = stream;
//     video.addEventListener("loadedmetadata", () => {
//         // Play the video as it loads
//         if (video.classList.contains("myVideo")) {
//             video.muted = true;
//             video.play();
//             video.classList.add("user-video");
//             const myVideoBlock = document.getElementById("my-video-block");
//             myVideoBlock.append(video); // Append video element to videoGrid
//         } else {
//             video.play();

//             videoGrid.append(video); // Append video element to videoGrid
//         }
//     });
// }
// function addVideoStreamNew(video, stream, divVideo) {
//     video.srcObject = stream;
//     video.addEventListener("loadedmetadata", () => {
//         // Play the video as it loads
//         if (video.classList.contains("myVideo")) {
//             video.muted = true;

//             video.play();
//         } else {
//             video.play();
//         }
//     });

//     divVideo.append(video); // Append video element to videoGrid
// }
export default VideoChatScreen;
