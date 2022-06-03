const { Router } = require("express");

const router = Router();
const { v4: uuidV4 } = require("uuid");

router.get("/", (req, res) => {
    const room = uuidV4();
    // res.redirect(`/api/vch/${room}`);
    res.json(room);
});

module.exports = router;
