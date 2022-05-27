import React from "react";

export const Page = ({ page }) => {
    return (
        <>
            <h2>{page.linkUrl}</h2>
            <h3>{page.linkName}</h3>
            <p>{page.title}</p>
            <p>{page.body}</p>
        </>
    );
};
