import React from "react";

const DarkForm = ({ children, ...props }) => {
    return (
        <div className='col s8 offset-m2 center-align '>
            <h2>{props.title}</h2>
            <div className='card  cyan accent-4'>
                <div className='card-content white-text'>
                    <span className='card-title'>{props.cardTitle}</span>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DarkForm;
