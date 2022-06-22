const express = require("express");
const router = express.Router();
const {
  postSignIn,
  getIndex,
  getHome
} = require("./controller");

router.get("/", getIndex);
router.get("/home", getHome);
router.post("/signin", postSignIn);

module.exports = router;