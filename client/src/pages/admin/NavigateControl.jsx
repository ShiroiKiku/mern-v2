import React from "react";
import { Link } from "react-router-dom";
import "../../style/admin.sass";

const NavigateControl = () => {
    return (
        <div className='row admin-panel '>
            <div className='col s6 offset-s3 admin-panel__title '>
                <h2>Управление панелью навигации</h2>
            </div>
            <div className='col s6 offset-s3 admin-panel__menu center'>
                <Link to='/admin/navigate/add'>
                    <p>Добавление новой ссылки</p>
                </Link>
                <Link to='/admin/navigate/update'>
                    <p>Изменение ссылки</p>
                </Link>
                <Link to='/admin/navigate/delite'>
                    <p>Удаление ссылки</p>
                </Link>
                <Link to='/admin'>
                    <p>Вернуться назад</p>
                </Link>
            </div>
        </div>
    );
};

export default NavigateControl;
