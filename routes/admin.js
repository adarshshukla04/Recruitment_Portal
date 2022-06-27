var express = require("express");
var router  = express.Router();
const {isLoggedIn, isAdmin} = require("../controllers/auth");
const {addjobget, addjob, issuejob, findUser, issue, store, deleteFromStore, addStore, addStorejob, updatePrice, updatePricePost, fzon, deleteFromFzone, addfzone, addZonejob, deletefromlib, updateQuantity, updateQuantityPost,
        transaction, transactionUpdate, transactionUpdatePost
} = require("../controllers/admin");

router.get("/addjob", isLoggedIn, isAdmin, addjobget);
router.post("/addjob", isLogged, isAdmin, addjob);

router.get("/lib/delete/:id", isLoggedIn, isAdmin, deletefromlib);

module.exports = router;