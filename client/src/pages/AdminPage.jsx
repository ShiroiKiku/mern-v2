import React from "react";
import { Link } from "react-router-dom";
import "../style/admin.sass";
import { ADMIN_NEWS_ADD } from "../utils/routes";

const AdminPage = () => {
    return (
        <div className='row admin-panel'>
            <div className='col s12 admin-panel__title'>
                <h2>Панель управления</h2>
            </div>

            <div className='col s12 admin-panel__menu'>
                <h4>Добавление новостей</h4>
                <Link to={ADMIN_NEWS_ADD}>
                    <p>Добавление новости</p>
                </Link>

                <Link to='/create'>
                    <p>Изменение новости</p>
                </Link>

                <Link to='/create'>
                    <p>Удаление новости</p>
                </Link>
            </div>
            <div className='col s12 admin-panel__menu'>
                <h4>Остальное управление</h4>

                <Link to='/admin/navigate'>
                    <p>Изменение навигационной панели</p>
                </Link>

                <Link to='/create'>
                    <p>Создание кастомной ссылки</p>
                </Link>

                <Link to='/create'>
                    <p>Изменение слайдера</p>
                </Link>
            </div>
        </div>
    );
};

export default AdminPage;
