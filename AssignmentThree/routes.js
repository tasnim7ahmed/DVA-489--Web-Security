const express = require("express");
const router = express.Router();
const {
  postSignIn,
  postSignUp,
  getIndex,
  getHome
} = require("./controller");

router.get("/", getIndex);
router.get("/home", getHome);
router.post("/signin", postSignIn);
router.post("/signup", postSignUp);


module.exports = router;