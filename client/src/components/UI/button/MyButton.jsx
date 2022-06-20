import React from "react";

const MyButton = ({ children, ...props }) => {
    return (
        <button className='btn indigo lighten-5 black-text ' {...props}>
            {children}
        </button>
    );
};

export default MyButton;
