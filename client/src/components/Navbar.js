import React, { useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../style/navbar.css";
import M from "materialize-css";
import findToDatabase from "../services/admin/findToDatabase";

export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const navbarLinks = [
        {
            _id: 1,
            navItemUrl: "links",
            navItemName: "Ссылки",
            navItemDropItems: [],
        },
        {
            _id: 2,
            navItemUrl: "stream2",
            navItemName: "дроп1",
            navItemDropItems: [
                { dropItemLink: "stream1", dropItemName: "Стрим1" },
            ],
        },
        {
            _id: 3,
            navItemUrl: "stream4",
            navItemName: "дроп2",
            navItemDropItems: [
                { dropItemLink: "stream1", dropItemName: "Стрим5" },
                { dropItemLink: "stream2", dropItemName: "Стрим6" },
                { dropItemLink: "stream3", dropItemName: "Стрим7" },
            ],
        },
        {
            _id: 4,
            navItemUrl: "videochat",
            navItemName: "Видеоконференция",
            navItemDropItems: [],
        },

        {
            _id: 6,
            navItemUrl: "createlink",
            navItemName: "Создание страницы",
            navItemDropItems: [],
        },
    ];
    findToDatabase("navigate").then((res) => {
        for (let key of res) {
            navbarLinks.push(key);
        }
    });

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

    return (
        <nav className='blue-grey darken-2'>
            <div className='nav-wrapper'>
                <span className='brand-logo'>Дипломное приложение</span>
                <ul id='nav-mobile' className='right hide-on-med-and-down'>
                    {navbarLinks.map((navLink) => {
                        if (navLink.navItemDropItems.length === 0) {
                            // console.log(navLink);
                            return (
                                <li key={navLink.navItemUrl}>
                                    <NavLink to={`${navLink.navItemUrl}`}>
                                        {navLink.navItemName}
                                    </NavLink>
                                </li>
                            );
                        } else {
                            const nl = navLink.navItemDropItems;
                            // console.log(navLink);
                            return (
                                <li key={navLink.navItemUrl}>
                                    <a
                                        id='FirstDropDown'
                                        className='dropdown-trigger'
                                        data-target={navLink.navItemUrl}
                                        onClick={(e) =>
                                            M.Dropdown.getInstance(e.target)
                                        }>
                                        {navLink.navItemName}
                                        <i className='material-icons right'>
                                            arrow_drop_down
                                        </i>
                                    </a>
                                    <ul
                                        id={navLink.navItemUrl}
                                        className='dropdown-content'>
                                        {nl.map((dropArray) => {
                                            return (
                                                <li
                                                    key={
                                                        dropArray.dropItemLink
                                                    }>
                                                    <NavLink
                                                        to={`${dropArray.dropItemLink}`}>
                                                        {dropArray.dropItemName}
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
                                <NavLink to='/admin'>Управнение</NavLink>
                            </li>
                            <li>
                                <NavLink to='/' onClick={logoutHandler}>
                                    Выйти
                                </NavLink>
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
    );
};
