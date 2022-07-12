const { Router } = require("express");
const Navigate = require("../models/Nav");
const mongoose = require("mongoose");
const router = Router();

router.get("/get", async (req, res) => {
    try {
        const navArray = await Navigate.find({ navItemLvl: "1" });

        res.json(navArray);
    } catch (e) {
        res.status(500).json({ message: "ошибка создания навигации" });
    }
});
router.post("/updatedroplist", async (req, res) => {
    console.log(req.body);
    try {
        const { dropUp, dropDown } = req.body;

        const navArray = await Navigate.findOne({ navItemUrl: dropUp });
        let dropNavArray = navArray.navItemDropItems;

        dropNavArray.push({
            dropItemName: dropDown.name,
            dropItemLink: dropDown.link,
        });
        console.log(dropNavArray);
        Navigate.updateOne(
            { navItemUrl: dropUp },
            { $set: { navItemDropItems: dropNavArray } },
            function (err, docs) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Updated Docs : ", docs);
                }
            }
        );
        console.log("выполнено");
    } catch (e) {
        res.status(500).json({ message: "ошибка создания навигации" });
    }
});
router.post("/add", async (req, res) => {
    console.log(req.body);
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
