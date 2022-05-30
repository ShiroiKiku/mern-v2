import React from "react";
import "../style/otherPage.css";
export const OtherPage = (page) => {
    const data = page.page;
    return (
        <div className='row '>
            <div className='col s12 '>
                <div className='z-depth-3'>
                    <h1 className='center-align'>{data.linkName}</h1>
                </div>
                <div className='z-depth-3 center-align'>
                    <p>{data.title}</p>
                </div>
                <div className='z-depth-3 text-content'>
                    <p className='flow-text'>{data.body}</p>
                </div>
            </div>
        </div>
    );
};
