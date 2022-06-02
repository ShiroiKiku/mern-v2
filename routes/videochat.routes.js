const { Router } = require("express");

const router = Router();
const { v4: uuidV4 } = require("uuid");

router.get("/", async (req, res) => {
    try {
        res.redirect(`/${uuidV4()}`);
    } catch (error) {
        console.log("ошибка редиректа");
    }
});

//If they join a specific room, then render that room
// router.get("/:room", (req, res) => {
//     console.log("123");
// });
module.exports = router;
