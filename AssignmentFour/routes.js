const express = require("express");
const { isAuthenticated } = require("./middleware");
const router = express.Router();

const {
  postSignIn,
  postSignUp,
  getSignOut,
  getIndex,
  getHome,
  postHome,
} = require("./controller");

router.post("/home", isAuthenticated, postHome);
router.get("/home", isAuthenticated, getHome);
router.post("/signin", postSignIn);
router.post("/signup", postSignUp);
router.get("/signout", getSignOut);
router.get("/", getIndex);

module.exports = router;
