import React, { useEffect } from "react";

const BlockCamera = (props) => {
    const porno = async () => {
        const video = document.createElement("video");
        const wrapper = document.getElementById(props.userId);
        video.srcObject = props.stream.srcObject;
        console.log(video.srcObject);
        console.log(props.stream.srcObject);
        video.addEventListener("loadedmetadata", () => {
            video.play();
        });
        wrapper.appendChild(video);
    };

    return (
        <div id={props.userId} className='video-wrapper col s4 dark-text'>
            {/* <video className='video-wrapper__video'></video> */}
            <div className='video-wrapper__user-info'>
                <p>{props.userName}</p>
                <p>{props.orgName}</p>
                <button onClick={porno}>Порнуха ебаная</button>
            </div>
        </div>
    );
};

export default BlockCamera;
