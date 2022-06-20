import io from "socket.io-client";
import Peer from "peerjs";

const screenConnect = (ROOM_ID, videoStream, userName, orgName) => {
    const socket = io("http://localhost:5000", {
        reconnection: true,
    });

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

export default screenConnect;
