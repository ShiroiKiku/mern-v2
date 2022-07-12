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
    const [item, setItem] = useState(null);

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const createItem = () => {
        addToDatabase(form, "navigate");

        if (form.navItemLvl == 2) {
            fetch(`/api/navigate/updatedroplist`, {
                method: "POST",
                body: JSON.stringify({
                    dropUp: item,
                    dropDown: { name: form.navItemName, link: form.navItemUrl },
                }),
                headers: { "Content-Type": "application/json" },
            });
        }
    };
    const queryFindLvlOne = async () => {
        try {
            const find = await findToDatabase("navigate").then();
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
                                name='navItemLvl'
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
                                name='navItemLvl'
                                type='radio'
                                value={2}
                                onChange={changeHandler}
                                onClick={queryFindLvlOne}
                            />
                            <span>Выпадающий список</span>
                        </label>
                    </p>
                    {findlvlOne && (
                        <select
                            onClick={(event) => {
                                setItem(event.target.value);
                            }}
                            className='browser-default'>
                            <option defaultValue='' disabled>
                                Choose your option
                            </option>
                            {findlvlOne.map((oneItem) => {
                                return (
                                    <option
                                        value={oneItem.navItemUrl}
                                        key={oneItem.navItemUrl}
                                        name={oneItem.navItemUrl}>
                                        {oneItem.navItemName}
                                    </option>
                                );
                            })}
                        </select>
                    )}
                    <button onClick={createItem}>Создать</button>
                </form>
            </div>
        </div>
    );
};

export default AddNewNavigateItem;
