const express = require("express");
const {isAuthenticated} = require("./middleware")
const router = express.Router();

const {
  postSignIn,
  postSignUp,
  getSignOut,
  getIndex,
  getHome
} = require("./controller");


router.get("/home", isAuthenticated, getHome);
router.post("/signin", postSignIn);
router.post("/signup", postSignUp);
router.get("/signout", getSignOut);
router.get("/", getIndex);


module.exports = router;