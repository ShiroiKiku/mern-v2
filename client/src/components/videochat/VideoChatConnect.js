import React from "react";
import io from "socket.io-client";
import Peer from "peerjs";
const VideoChatConnect = (ROOM_ID, form) => {
    const socket = io("http://localhost:5000", {
        reconnection: true,
    });
    const videoGrid = document.getElementById("video-grid"); // Find the Video-Grid element
    const myPeer = new Peer(); // Creating a peer element which represents the current user
    const myVideo = document.createElement("video"); // Create a new video tag to show our video
    myVideo.classList.add("myVideo");

    navigator.mediaDevices
        .getUserMedia({
            video: true,
            audio: true,
        })
        .then((stream) => {
            addVideoStream(myVideo, stream); // Display our video to ourselves

            myPeer.on("call", (call) => {
                // When we join someone's room we will receive a call from them
                call.answer(stream); // Stream them our video/audio
                const video = document.createElement("video"); // Create a video tag for them
                video.classList.add("col", "s4");
                video.id = call.peer;

                call.on("stream", (userVideoStream) => {
                    // When we recieve their stream
                    addVideoStream(video, userVideoStream); // Display their video to ourselves
                });
            });

            socket.on("user-connected", (userId, userName, orgName) => {
                // If a new user connect
                connectToNewUser(userId, stream, userName, orgName);
            });
            socket.on("user-disconnected", (userId) => {
                // If a new user disconnect
                disconnectToNewUser(userId, stream);
            });
        });

    myPeer.on("open", (id) => {
        // When we first open the app, have us join a room
        socket.emit("join-room", ROOM_ID, id, form.userName, form.orgName);
    });

    function connectToNewUser(userId, stream, userName, orgName) {
        // This runs when someone joins our room
        const call = myPeer.call(userId, stream); // Call the user who just joined
        // Add their video
        const divVideo = document.createElement("div");
        divVideo.classList.add("col", "s4", "block-video");
        divVideo.id = userId;
        const video = document.createElement("video");
        video.classList.add("user-video");
        const pName = document.createElement("p");
        const pOrg = document.createElement("p");
        call.on("stream", (userVideoStream) => {
            addVideoStreamNew(video, userVideoStream, divVideo);
            pName.innerHTML = userName;
            pOrg.innerHTML = orgName;
            divVideo.appendChild(pName);
            divVideo.appendChild(pOrg);
            videoGrid.appendChild(divVideo);
        });
    }
    function disconnectToNewUser(userId, stream) {
        // This runs when someone joins our room
        document.getElementById(userId).remove();
    }

    function addVideoStream(video, stream) {
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", () => {
            // Play the video as it loads
            if (video.classList.contains("myVideo")) {
                video.muted = true;
                video.play();
                video.classList.add("user-video");
                const myVideoBlock = document.getElementById("my-video-block");
                myVideoBlock.append(video); // Append video element to videoGrid
            } else {
                video.play();

                videoGrid.append(video); // Append video element to videoGrid
            }
        });
    }
    function addVideoStreamNew(video, stream, divVideo) {
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", () => {
            // Play the video as it loads
            if (video.classList.contains("myVideo")) {
                video.muted = true;

                video.play();
            } else {
                video.play();
            }
        });

        divVideo.append(video); // Append video element to videoGrid
    }
};

export default VideoChatConnect;
