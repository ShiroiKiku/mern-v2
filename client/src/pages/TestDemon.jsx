import React from "react";
import openScreenDemonstration from "../components/videoconference/openScreenDemonstration";

const TestDemon = () => {
    const enableScreenDemonstration = async () => {
        const screenId = await getScreenId();
        openScreenDemonstration(screenId);
    };
    const getScreenId = async () => {
        const response = await fetch("/api/videochat");
        const data = await response.json();
        return data;
    };
    return (
        <div>
            <button className='btn' onClick={enableScreenDemonstration}>
                Показать экран
            </button>
        </div>
    );
};

export default TestDemon;
