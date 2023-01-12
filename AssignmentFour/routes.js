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
  postSignUpMongo,
} = require("./controller");

router.post("/home", isAuthenticated, postHome);
router.get("/home", isAuthenticated, getHome);
router.post("/signin", postSignIn);
router.post("/signup", postSignUpMongo);
router.get("/signout", getSignOut);
router.get("/", getIndex);

module.exports = router;
