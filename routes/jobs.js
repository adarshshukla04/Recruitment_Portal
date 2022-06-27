var express = require("express");
var router = express.Router();
const {isLoggedIn} = require("../controllers/auth")
const {viewjobs, viewjobbyid} = require("../controllers/job");

router.get("/view", viewjobs);

router.get('/viewbyid/:id', isLoggedIn, viewjobbyid)

module.exports = router;