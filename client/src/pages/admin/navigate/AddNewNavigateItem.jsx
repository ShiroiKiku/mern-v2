import React, { useState, useEffect } from "react";

const AddNewNavigateItem = () => {
    const [form, setForm] = useState({
        navItemUrl: "",
        navItemName: "",
        navItemDropItems: [],
        navItemDropLvl: "1",
    });
    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };
    useEffect(() => {
        console.log(form);
    }, [form]);
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
                    />
                    <label htmlFor='navItemUrl'>Только на английском</label>
                    <p>Введите название раздела</p>
                    <input
                        name='navItemName'
                        placeholder='Exemple'
                        value={form.navItemName}
                        onChange={changeHandler}
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
                                value={0}
                                onChange={changeHandler}
                            />
                            <span>Выпадающий список</span>
                        </label>
                    </p>
                    {/* <select
                        value={}
                        onChange={}>
                        <option value='grapefruit'>Grapefruit</option>
                        <option value='lime'>Lime</option>
                        <option value='coconut'>Coconut</option>
                        <option value='mango'>Mango</option>
                    </select> */}
                </form>
            </div>
        </div>
    );
};

export default AddNewNavigateItem;
