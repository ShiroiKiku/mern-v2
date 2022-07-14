const { Router } = require("express");

const router = Router();

router.post("/uploadFile", (req, res) => {
    console.log(res);
});
router.post("/fetchUrl", (req, res) => {
    console.log(res);
});

module.exports = router;
