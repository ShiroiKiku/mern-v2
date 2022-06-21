import React from "react";

const BlockCamera = (props) => {
    return (
        <div id={props.userId}>
            {/* <video src={props.linkVideo}></video> */}
            <div>
                <p>{props.userName}</p>
                <p>{props.orgName}</p>
            </div>
        </div>
    );
};

export default BlockCamera;
