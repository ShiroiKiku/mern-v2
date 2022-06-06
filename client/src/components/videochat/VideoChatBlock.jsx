import React from "react";

const VideoChatBlock = (req) => {
    console.log(`пользователь ${req.userId} зашел`);
    req.video.srcObject = req.stream;
    req.video.classList.add("user-video");
    const divVideo = document.createElement("div");
    divVideo.classList.add("block-video");
    divVideo.id = req.userId;
    const pName = document.createElement("p");
    const pOrg = document.createElement("p");
    req.video.addEventListener("loadedmetadata", () => {
        // Play the video as it loads
        if (req.video.classList.contains("myVideo")) {
            req.video.muted = true;
            req.video.play();
        } else {
            req.video.play();
        }
    });
    divVideo.classList.add("col");

    pName.innerHTML = req.userName;
    pOrg.innerHTML = req.orgName;
    req.videoGrid.appendChild(divVideo);
    divVideo.appendChild(pName);
    divVideo.appendChild(pOrg);
    divVideo.appendChild(req.video); // Append video element to videoGrid
};

export default VideoChatBlock;
