const { Router } = require("express");

const router = Router();
const mongoose = require("mongoose");
const VideoChat = require("../models/VideoChat");
router.post("/savedata", async (req, res) => {
    try {
        const { userName, orgName, roomId, userId, videoType } = req.body;
        console.log(userName, orgName, roomId, userId, videoType);
        const userData = new VideoChat({
            userName: userName,
            orgName: orgName,
            roomId: roomId,
            userId: userId,
            videoType: videoType,
        });

        await userData.save();
        console.log(`пользователь ${userName} сохранен в базу`);
    } catch (e) {
        console.log("ошибка", e);
    }
});
module.exports = router;
