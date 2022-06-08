import io from "socket.io-client";
import Peer from "peerjs";

const userConnect = (ROOM_ID, videoStream, screen, userName, orgName) => {
    // const { request } = useHttp();

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
                videoType: screen,
            };
            console.log(form);
            const formSave = JSON.stringify(form);
            console.log(formSave);
            await fetch("/api/videochatdata/savedata", {
                method: "POST",
                body: formSave,
                headers: { "Content-Type": "application/json" },
            });
        } catch (e) {
            console.log(e);
        }
    };

    videoStream.then((stream) => {
        addVideoStream(myVideo, stream); // Display our video to ourselves

        myPeer.on("call", (call) => {
            // When we join someone's room we will receive a call from them
            call.answer(stream); // Stream them our video/audio
            const video = document.createElement("video"); // Create a video tag for them
            video.id = call.peer;
            call.on("stream", (userVideoStream) => {
                // When we recieve their stream
                console.log(userVideoStream);
                addVideoStream(video, userVideoStream); // Display their video to ourselves
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
        console.log("досюда ты значит дошел");
        saveHandler(id);
        // ret = id;
        socket.emit("join-room", ROOM_ID, id);
    });

    function connectToNewUser(userId, stream) {
        // This runs when someone joins our room
        const call = myPeer.call(userId, stream); // Call the user who just joined
        // Add their video

        const video = document.createElement("video");
        video.id = userId;

        call.on("stream", (userVideoStream) => {
            if (screen === "video") {
                addVideoStream(video, userVideoStream);

                videoGrid.appendChild(video);
            }
        });
    }
    function disconnectToNewUser(userId, stream) {
        // This runs when someone joins our room
        document.getElementById(userId).remove();
    }
    function addVideoStream(video, stream) {
        if (screen === "video") {
            video.srcObject = stream;
            video.addEventListener("loadedmetadata", () => {
                // Play the video as it loads
                if (video.classList.contains("myVideo")) {
                    video.muted = true;
                    video.play();

                    videoGrid.append(video); // Append video element to videoGrid
                } else {
                    video.play();
                    videoGrid.append(video); // Append video element to videoGrid
                }
            });
        }
    }
};

export default userConnect;
