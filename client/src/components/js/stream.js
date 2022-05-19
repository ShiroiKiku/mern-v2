import flvjs from "flv.js";

if (flvjs.isSupported()) {
    const myContainer = useRef();
    console.log(videoElement);

    const flvPlayer = flvjs.createPlayer({
        type: "flv",
        url: "http://localhost:8000/live/test_test.flv",
    });
    console.log("1");

    flvPlayer.attachMediaElement(videoElement);
    flvPlayer.load();
    flvPlayer.play();
}
