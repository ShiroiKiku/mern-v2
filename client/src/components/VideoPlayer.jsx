import React from "react";
import { ReactFlvPlayer } from "react-flv-player";

const VideoPlayer = () => {
    const eventName = "Мой дом";
    return (
        <div className='row '>
            <div className='col s11'>
                <h2 className='center-align'>Трансляция мероприятия</h2>
                <h3 className='center-align'>{eventName}</h3>
                <ReactFlvPlayer
                    className='center-align'
                    url='http://localhost:8000/live/test_test.flv'
                    heigh='100%'
                    width='100%'
                    isMuted={false}
                    showControls={false}
                    isLive={true}
                    enableStashBuffer={true}
                    stashInitialSize={384}
                />
            </div>
        </div>
    );
};

export default VideoPlayer;
