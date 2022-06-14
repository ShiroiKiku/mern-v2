import io from "socket.io-client";
import Peer from "peerjs";

const userConnect = (ROOM_ID, videoStream, screen, userName, orgName) => {
    // const { request } = useHttp();

    const socket = io("http://localhost:5000", {
        reconnection: true,
    });
    const myPeer = new Peer();
    console.log(videoStream);
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
                videoType: screen,
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
    videoStream.then((stream) => {
        addVideoStream(myVideo, stream); // Display our video to ourselves

        myPeer.on("call", async (call) => {
            console.log(22);
            // When we join someone's room we will receive a call from them
            call.answer(stream); // Stream them our video/audio
            console.log(222);
            const video = document.createElement("video"); // Create a video tag for them
            video.id = call.peer;

            call.on("stream", (userVideoStream) => {
                // When we recieve their stream
                console.log(2);
                addVideoStream(video, userVideoStream, call.peer); // Display their video to ourselves
            });
        });

        socket.on("user-connected", (userId) => {
            // If a new user connect

            connectToNewUser(userId, stream);
        });
        socket.on("user-disconnected", (userId) => {
            // If a new user disconnect

            disconnectToNewUser(userId, stream);
        });
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
        console.log(33);
        const video = document.createElement("video");
        video.id = userId;

        call.on("stream", (userVideoStream) => {
            if (screen === "video") {
                console.log(3);
                addVideoStream(video, userVideoStream, userId);

                videoGrid.appendChild(video);
            }
        });
    }
    function disconnectToNewUser(userId, stream) {
        // This runs when someone joins our room
        document.getElementById(userId).remove();
    }
    async function addVideoStream(video, stream, userId) {
        if (screen === "video") {
            video.srcObject = stream;
            video.addEventListener("loadedmetadata", () => {
                // Play the video as it loads
                if (video.classList.contains("myVideo")) {
                    video.muted = true;
                }
                video.play();
                videoGrid.append(video);
            });
            const data = await userInfo(userId);
            console.log(data);
        }
    }
};

export default userConnect;
