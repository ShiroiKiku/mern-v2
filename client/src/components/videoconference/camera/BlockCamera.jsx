import React, { useEffect, useState } from "react";

const BlockCamera = (props) => {
    const [renderChek, setRenderChek] = useState(false);
    const [videoControl, setVideoControl] = useState(null);
    const porno = async () => {
        const video = document.createElement("video");
        const wrapper = document.getElementById(props.userId);

        video.srcObject = props.stream.srcObject;

        video.addEventListener("loadedmetadata", () => {
            video.play();
            if (props.videoType === "my-video") {
                video.muted = true;
            }
            setVideoControl(video);
        });
        wrapper.appendChild(video);
    };

    useEffect(() => {
        if (renderChek === false) {
            setRenderChek(true);
            porno();
        }
    }, [renderChek]);

    function mute(id) {
        const btnMute = document.getElementById("btn-mute" + id);
        if (videoControl.muted === true) {
            videoControl.muted = false;

            btnMute.classList.remove("btn-control__active");
        } else {
            videoControl.muted = true;

            btnMute.classList.add("btn-control__active");
        }
    }
    function fullscreen() {
        videoControl.requestFullscreen();
    }

    return (
        <div id={props.userId} className='video-wrapper  dark-text'>
            {/* <video className='video-wrapper__video'></video> */}
            <div className='video-wrapper__user-info'>
                <p>{props.userName}</p>
                <p>{props.orgName}</p>
                {props.videoType !== "my-video" && (
                    <>
                        <button
                            className='btn-control'
                            id={"btn-mute" + props.userId}
                            onClick={() => mute(props.userId)}>
                            Mute
                        </button>
                        <button className='btn-control' onClick={fullscreen}>
                            Fullscreen
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default BlockCamera;
