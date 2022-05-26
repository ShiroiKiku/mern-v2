const { Router } = require("express");
const req = require("express/lib/request");
const Page = require("../models/Page");
const router = Router();

router.get("/pagecreate", (req, res) => {
    res.status(404).json("Ссылка не найдена");
});
