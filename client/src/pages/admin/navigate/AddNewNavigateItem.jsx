import React, { useState, useEffect } from "react";

import addToDatabase from "../../../services/admin/addToDatabase";
import findToDatabase from "../../../services/admin/findToDatabase";

const AddNewNavigateItem = () => {
    const [form, setForm] = useState({
        navItemUrl: "",
        navItemName: "",
        navItemDropItems: [],
        navItemLvl: "1",
    });
    const [findlvlOne, setFindlvlOne] = useState(null);
    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
        console.log(form);
    };

    const createItem = () => {
        let addCheck = addToDatabase(form, "navigate");
        console.log(addCheck);
    };
    const queryFindLvlOne = async () => {
        try {
            const find = await findToDatabase().then();
            setFindlvlOne(find);
        } catch (error) {
            console.log(error);
        }
        console.log(findlvlOne);
    };

    return (
        <div className='row admin-panel'>
            <div className='col s12 admin-panel__title'>
                <h3>Создание новой ссылки в панеле навигации</h3>
            </div>
            <div className='col s12  admin-panel__control'>
                <form className='form-control'>
                    <p>Введите Url будущей ссылки</p>
                    <input
                        placeholder='/exemple'
                        name='navItemUrl'
                        value={form.navItemUrl}
                        onChange={changeHandler}
                        required
                        pattern='/[a-z]+$'
                    />
                    <label htmlFor='navItemUrl'>Только на английском</label>
                    <p>Введите название раздела</p>
                    <input
                        name='navItemName'
                        placeholder='Exemple'
                        value={form.navItemName}
                        onChange={changeHandler}
                        required
                    />
                    <label htmlFor='navItemName'>Только на английском</label>
                    <p>Уровень ссылки</p>
                    <p>
                        <label>
                            <input
                                name='navItemDropLvl'
                                type='radio'
                                defaultChecked
                                value={1}
                                onChange={changeHandler}
                            />
                            <span>Основная</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input
                                name='navItemDropLvl'
                                type='radio'
                                value={2}
                                onChange={changeHandler}
                                onClick={queryFindLvlOne}
                            />
                            <span>Выпадающий список</span>
                        </label>
                    </p>
                    {findlvlOne && (
                        <div>
                            {findlvlOne.map((oneItem) => {
                                return (
                                    <div key={oneItem.navItemUrl}>
                                        <p>{oneItem.navItemUrl}</p>
                                        <p>{oneItem.navItemName}</p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    <button onClick={createItem}>Создать</button>
                </form>
            </div>
        </div>
    );
};

export default AddNewNavigateItem;
