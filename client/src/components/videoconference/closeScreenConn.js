import Peer from "peerjs";
import React from "react";
import { io } from "socket.io-client";
const closeScreenConn = () => {
    const socket = io("http://localhost:5000", {
        reconnection: true,
    });
    const myPeer = Peer();
    // myPeer.disconnect();
    console.log(myPeer);
};

export default closeScreenConn;
