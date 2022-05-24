import React, { useContext, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { NavbarDropList } from "./navbar/NavbarDropList";
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

        // eslint-disable-next-line
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
                { _id: 1, dropUrl: "stream", dropLinkName: "Стрим" },
                { _id: 2, dropUrl: "stream", dropLinkName: "Стрим" },
                { _id: 3, dropUrl: "stream", dropLinkName: "Стрим" },
            ],
        },
    ];

    return (
        <div>
            <nav className='blue darken-2'>
                <div className='nav-wrapper'>
                    <a className='brand-logo'>SwimTechNL</a>
                    <ul id='nav-mobile' className='right hide-on-med-and-down'>
                        <li>
                            <a>About</a>
                        </li>
                        <li>
                            <a
                                id='FirstDropDown'
                                className='dropdown-trigger'
                                href='#!'
                                data-target='dropdown1'
                                onClick={(e) =>
                                    M.Dropdown.getInstance(e.target)
                                }>
                                Dropdown
                                <i className='material-icons right'>
                                    arrow_drop_down
                                </i>
                            </a>
                            <ul id='dropdown1' className='dropdown-content'>
                                <li>
                                    <a href='#!'>one</a>
                                </li>
                                <li>
                                    <a href='#!'>two</a>
                                </li>
                                <li className='divider'></li>
                                <li>
                                    <a href='#!'>three</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a>About</a>
                        </li>
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

    //                 {auth.isAuthenticated === true && (
    //                     <>
    //                         <li>
    //                             <NavLink to='/create'>Создать</NavLink>
    //                         </li>
    //                         <li>
    //                             <a href='/' onClick={logoutHandler}>
    //                                 Выйти
    //                             </a>
    //                         </li>
    //                     </>
    //                 )}
    //                 {auth.isAuthenticated === false && (
    //                     <li>
    //                         <NavLink to='/authpage'>Войти</NavLink>
    //                     </li>
    //                 )}
    //             </ul>
    //         </div>
    //     </nav>
    // );
};
