import io from "socket.io-client";
import Peer from "peerjs";

const userConnect = (ROOM_ID, peer) => {
    console.log("123");
    const socket = io("http://localhost:5000", {
        reconnection: true,
    });
    const myPeer = new Peer();

    myPeer.on("call", async (call) => {
        // When we join someone's room we will receive a call from them
        call.answer(); // Stream them our video/audio

        call.on("stream", (userVideoStream) => {
            socket.broadcast.emit("user-disconnected", call.id);
        });
    });
    myPeer.on("open", (id) => {
        // When we first open the app, have us join a room

        // ret = id;
        socket.emit("join-room", ROOM_ID, id);
    });
};

export default userConnect;
