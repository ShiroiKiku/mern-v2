const { Router } = require("express");
const Navigate = require("../models/Nav");
const mongoose = require("mongoose");
const router = Router();

router.get("/getnavigate", async (req, res) => {
    try {
        const navArray = await Navigate.find({ Navigate: 1 });
        console.log(navArray);
        res.json(navArray);
    } catch (e) {
        res.status(500).json({ message: "ошибка создания навигации" });
    }
});
router.post("/addnavigate", async (req, res) => {
    try {
        const { navItemUrl, navItemName, navItemDropItems, navItemLvl } =
            req.body;
        const navItem = new Navigate({
            navItemUrl: navItemUrl,
            navItemName: navItemName,
            navItemDropItems: navItemDropItems,
            navItemLvl: navItemLvl,
        });
        await navItem.save();
    } catch (error) {
        res.status(500).json({ message: "ошибка добавления навигации" });
    }
});

module.exports = router;