import React, { useContext, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import M from "materialize-css";

export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = (event) => {
        event.preventDefault();
        auth.logout();
        history.push("/");
    };
    useEffect(() => {
        let dropdowns = document.querySelectorAll(".dropdown-trigger");
        let options = {
            inDuration: 1000,
            outDuration: 1000,
            hover: false, // Activate on hover
            coverTrigger: false,
            alignment: "right",
        };
        M.Dropdown.init(dropdowns, options);
    }, []);
    const navbarLinks = [
        {
            _id: 1,
            linkUrl: "links",
            linkName: "Ссылки",
            dropList: [],
        },
        {
            _id: 2,
            linkUrl: "stream",
            linkName: "Стрим",
            dropList: [
                { _id: 1, dropUrl: "stream1", dropLinkName: "Стрим1" },
                { _id: 2, dropUrl: "stream2", dropLinkName: "Стрим2" },
                { _id: 3, dropUrl: "stream3", dropLinkName: "Стрим3" },
            ],
        },
        {
            _id: 3,
            linkUrl: "stream4",
            linkName: "Стрим",
            dropList: [
                { _id: 1, dropUrl: "stream1", dropLinkName: "Стрим5" },
                { _id: 2, dropUrl: "stream2", dropLinkName: "Стрим6" },
                { _id: 3, dropUrl: "stream3", dropLinkName: "Стрим7" },
            ],
        },
    ];

    return (
        <div>
            <nav className='blue darken-2'>
                <div className='nav-wrapper'>
                    <span className='brand-logo'>ГУК СОСБС</span>
                    <ul id='nav-mobile' className='right hide-on-med-and-down'>
                        {navbarLinks.map((navLink) => {
                            if (navLink.dropList.length == 0) {
                                return (
                                    <li key={navLink._id} className='active'>
                                        <NavLink to={`/${navLink.linkUrl}`}>
                                            {navLink.linkName}123
                                        </NavLink>
                                    </li>
                                );
                            } else {
                                const nl = navLink.dropList;
                                return (
                                    <li key={navLink._id}>
                                        <a
                                            id='FirstDropDown'
                                            className='dropdown-trigger'
                                            data-target={navLink.linkUrl}
                                            onClick={(e) =>
                                                M.Dropdown.getInstance(e.target)
                                            }>
                                            {navLink.linkName}
                                            <i className='material-icons right'>
                                                arrow_drop_down
                                            </i>
                                        </a>
                                        <ul
                                            id={navLink.linkUrl}
                                            className='dropdown-content'>
                                            {nl.map((dropArray) => {
                                                return (
                                                    <li key={dropArray.dropUrl}>
                                                        <NavLink
                                                            to={`/${dropArray.dropUrl}`}>
                                                            {
                                                                dropArray.dropLinkName
                                                            }
                                                        </NavLink>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </li>
                                );
                            }
                        })}
                        {auth.isAuthenticated === true && (
                            <>
                                <li>
                                    <NavLink to='/create'>Создать</NavLink>
                                </li>
                                <li>
                                    <a href='/' onClick={logoutHandler}>
                                        Выйти
                                    </a>
                                </li>
                            </>
                        )}
                        {auth.isAuthenticated === false && (
                            <li>
                                <NavLink to='/authpage'>Войти</NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
    // return (
    //     <nav>
    //         <div
    //             className='nav-wrapper blue darken-1'
    //             style={{ padding: "0 2rem" }}>
    //             <span className='brand-logo'>ГУК СОСБС</span>
    //             <ul id='nav-mobile' className='right hide-on-med-and-down'>
    //                 {navbarLinks.map((navLink) => {
    //                     if (navLink.dropList.length == 0) {
    //                         return (
    //                             <li key={navLink._id} className='active'>
    //                                 <NavLink to={`/${navLink.linkUrl}`}>
    //                                     {navLink.linkName}123
    //                                 </NavLink>
    //                             </li>
    //                         );
    //                     } else {
    //                         return (
    //                             <li>
    //                                 <a
    //                                     id='FirstDropDown'
    //                                     className='dropdown-trigger'
    //                                     href='#!'
    //                                     data-target='dropdown1'
    //                                     onMouseEnter={(e) =>
    //                                         M.Dropdown.getInstance(e.target) &&
    //                                         M.Dropdown.getInstance(
    //                                             e.target
    //                                         ).open()
    //                                     }
    //                                     onMouseLeave={(e) =>
    //                                         M.Dropdown.getInstance(e.target) &&
    //                                         M.Dropdown.getInstance(
    //                                             e.target
    //                                         ).close()
    //                                     }>
    //                                     Dropdown{" "}
    //                                     <i className='material-icons right'>
    //                                         arrow_drop_down
    //                                     </i>
    //                                 </a>
    //                                 <ul
    //                                     style={{
    //                                         marginLeft: "500px",
    //                                         display: "none",
    //                                     }}
    //                                     id='dropdown1'
    //                                     className='dropdown-content'>
    //                                     <li
    //                                         style={{
    //                                             backgroundColor: "yellow",
    //                                         }}>
    //                                         <a href='#!'>one</a>
    //                                     </li>
    //                                     <li
    //                                         style={{
    //                                             backgroundColor: "red",
    //                                         }}>
    //                                         <a href='#!'>two</a>
    //                                     </li>
    //                                     <li className='divider'></li>
    //                                     <li
    //                                         style={{
    //                                             backgroundColor: "purple",
    //                                         }}>
    //                                         <a href='#!'>three</a>
    //                                     </li>
    //                                 </ul>
    //                             </li>
    //                         );
    //                     }
    //                 })}

    // {auth.isAuthenticated === true && (
    //     <>
    //         <li>
    //             <NavLink to='/create'>Создать</NavLink>
    //         </li>
    //         <li>
    //             <a href='/' onClick={logoutHandler}>
    //                 Выйти
    //             </a>
    //         </li>
    //     </>
    // )}
    // {auth.isAuthenticated === false && (
    //     <li>
    //         <NavLink to='/authpage'>Войти</NavLink>
    //     </li>
    // )}
    //             </ul>
    //         </div>
    //     </nav>
    // );
};
