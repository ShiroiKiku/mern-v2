import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = (event) => {
        event.preventDefault();
        auth.logout();
        history.push("/");
    };

    return (
        <nav>
            <div
                className='nav-wrapper blue darken-1'
                style={{ padding: "0 2rem" }}>
                <span className='brand-logo'>Сокращение ссылок</span>
                <ul id='nav-mobile' className='right hide-on-med-and-down'>
                    <li>
                        <NavLink to='/links'>Ссылки</NavLink>
                    </li>
                    <li>
                        <NavLink to='/stream'>Стрим</NavLink>
                    </li>
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
    );
};
