import React from "react";
import flvjs from "flv.js";
const StreamVideo = (id) => {
    if (flvjs.isSupported()) {
        console.log(id);
        const videoElement = document.getElementById(id);

        const flvPlayer = flvjs.createPlayer({
            type: "flv",
            url: "http://localhost:8000/live/test_test.flv",
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
    }
};

export default StreamVideo;
