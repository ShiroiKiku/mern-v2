const { Router } = require("express");
const Page = require("../models/Page");
const router = Router();
const mongoose = require("mongoose");

router.post("/pagecreate", async (req, res) => {
    try {
        const { linkUrl, linkName, title, body } = req.body;
        const page = new Page({
            linkUrl: linkUrl,
            linkName: linkName,
            title: title,
            body: body,
        });
        await page.save();
        res.status(201).json({ message: "Ссылка создана" });
    } catch (e) {
        res.status(500).json({ message: "Ошибка создания ссылки" });
    }
});
router.get("/pageid", async (req, res) => {
    console.log(req.params.linkUrl);
    try {
        const pageId = req.params.linkUrl;
        const page = await Page.findOne({ linkUrl: pageId });
        res.json(page);
    } catch (e) {
        res.status(201).json({ message: "ссылка не показана" });
    }
});
router.get("/pageroutes", async (req, res) => {
    try {
        const pages = await Page.find({});

        res.json(pages);
    } catch (e) {
        res.status(201).json({ message: "ссылкы не найдены" });
    }
});
router.post("/pagedelite", async (req, res) => {
    try {
        const candidate = await Page.findOneAndDelete({
            _id: "628fe9cef64ed83b64056031",
        });

        res.status(201).json({ message: "пользователь удален" });
        console.log(candidate);
    } catch (e) {
        res.status(201).json({ message: "Пользовател не создан" });
    }
});
module.exports = router;
