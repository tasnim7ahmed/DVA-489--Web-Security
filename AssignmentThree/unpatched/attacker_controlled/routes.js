const express = require("express");

const router = express.Router();

const {
    getIndex,
    postAttack,
} = require("./controller");

router.post("/attack", postAttack);
router.get("/", getIndex);

module.exports = router;
