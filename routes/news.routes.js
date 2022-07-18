const { Router } = require("express");
const News = require("../models/News");
const mongoose = require("mongoose");
const router = Router();

router.post("/add", async (req, res) => {
    console.log(req.body);
    try {
        const { contant } = req.body;

        const news = new News({
            contant: contant,
        });
        await news.save();
        res.status(201).json({ message: "Все заебис" });
    } catch (error) {
        res.status(500).json({ message: "ошибка добавления навигации" });
    }
});

module.exports = router;
