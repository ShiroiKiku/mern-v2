import io from "socket.io-client";
import Peer from "peerjs";
import novideo from "../images/novideo.jpg";

const userConnect = (ROOM_ID, videoStream, userName, orgName) => {
    const socket = io("http://localhost:5000", {
        reconnection: true,
    });

    const myPeer = new Peer();
    const videoGrid = document.getElementById("video-grid");
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

    addVideoStream(myVideo, videoStream); // Display our video to ourselves
    videoStream.getAudioTracks().enable = false;

    console.log(videoStream);
    myPeer.on("call", async (call) => {
        // When we join someone's room we will receive a call from them
        call.answer(videoStream); // Stream them our video/audio

        const video = document.createElement("video"); // Create a video tag for them
        video.id = call.peer;

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

        disconnectToNewUser(userId, videoStream);
    });

    myPeer.on("open", (id) => {
        // When we first open the app, have us join a room

        saveHandler(id);
        // ret = id;
        socket.emit("join-room", ROOM_ID, id);
    });

    async function connectToNewUser(userId, stream) {
        // This runs when someone joins our room

        const call = myPeer.call(userId, stream); // Call the user who just joined
        // Add their video

        const video = document.createElement("video");
        video.id = userId;

        call.on("stream", (userVideoStream) => {
            addVideoStream(video, userVideoStream, userId);

            videoGrid.appendChild(video);
        });
    }
    function disconnectToNewUser(userId, stream) {
        // This runs when someone joins our room
        document.getElementById(userId).remove();
        if (document.getElementById("image" + userId)) {
            document.getElementById("image" + userId).remove();
        }
    }
    async function addVideoStream(video, stream, userId) {
        const boolVideo = stream.getVideoTracks();

        if (boolVideo.length === 1) {
            video.srcObject = stream;
            video.addEventListener("loadedmetadata", () => {
                // Play the video as it loads
                if (video.classList.contains("myVideo")) {
                    video.muted = true;
                }
                video.play();
                videoGrid.append(video);
            });
        } else {
            video.srcObject = stream;
            video.classList.add("noVideo");
            video.addEventListener("loadedmetadata", () => {
                // Play the video as it loads
                if (video.classList.contains("myVideo")) {
                    video.muted = true;
                }
                video.play();

                videoGrid.append(video);
            });
            const videoImage = document.createElement("IMG");
            videoImage.src = novideo;
            videoImage.id = "image" + userId;

            videoGrid.append(videoImage);
        }
        const data = await userInfo(userId);
        console.log(data);
    }
};

export default userConnect;
