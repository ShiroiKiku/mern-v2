import React from "react";

const addToDatabase = (form) => {
    try {
        fetch("/api/navigate/add", {
            method: "POST",
            body: JSON.stringify(form),
            headers: { "Content-Type": "application/json" },
        });
        return "добавление прошло успешно";
    } catch (e) {
        console.log(e);
        return "добавление неудалось";
    }
};

export default addToDatabase;
