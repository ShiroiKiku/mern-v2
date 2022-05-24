import React from "react";
import { NavLink } from "react-router-dom";
export const NavbarDropList = ({ dropListId, navbarLinks }) => {
    console.log(navbarLinks);
    // console.log(dropListId);

    return navbarLinks[dropListId].dropList.map((dropNav) => {
        <li key={dropNav._id}>
            <NavLink to={`/${dropNav.dropUrl}`}>{dropNav.dropLinkName}</NavLink>
        </li>;
    });
};
