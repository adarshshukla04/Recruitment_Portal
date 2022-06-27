var express= require('express');
var router = express.Router();
const {isLoggedIn, isAdmin} = require('../contollers/auth');
const {view, profile, hold, update, order} = require('../controllers/user');

router.get('/view', isLoogedIn, view);
router.get('/profile', isLoggedIn, profile);
router.get('hold/:jobid', isLoggedIn, hold);
router.post('update', isLoggedIn, update);

module.exports = router;