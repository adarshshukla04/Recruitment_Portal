var express = require("express");
var router = express.Router();
const {isLoggedIn, isAdmin} = require("../controllers/auth")
const {profile, update} = require("../controllers/user");

//router.get("/view", isLoggedIn, view);
router.get("/profile", isLoggedIn, profile);
//router.get("/hold/:jobid", isLoggedIn, hold);
router.post("/update", isLoggedIn, update);


module.exports = router;