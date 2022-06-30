var express = require("express");
var router  = express.Router();
const {isLoggedIn, isAdmin} = require("../controllers/auth");
const {addjobget, addjob, issuejob, findUser, issue, store, deleteFromStore, addStore, addStorejob, updatePrice, updatePricePost, fzon, deleteFromFzone, addfzone, addZonejob, deletefromlib, updateQuantity, updateQuantityPost,
        transaction, transactionUpdate, transactionUpdatePost, viewupdatestatus, updatefromlib, addstudentget, addstudent, viewStudents, viewStudbyId, deleteStudent
} = require("../controllers/admin");
const { application } = require("express");

router.get("/addstudent", isLoggedIn, isAdmin, addstudentget);
router.post("/addstudent", isLoggedIn, isAdmin, addstudent);

router.get("/addjob", isLoggedIn, isAdmin, addjobget);
router.post("/addjob", isLoggedIn, isAdmin, addjob);


router.get("/lib/delete/:id", isLoggedIn, isAdmin, deletefromlib);
router.get("/lib/update/:id", isLoggedIn, isAdmin, viewupdatestatus);
router.post("/lib/update/:id", isLoggedIn, isAdmin, updatefromlib);

router.get("/viewStudents", isLoggedIn, isAdmin, viewStudents);
router.get("/viewStudbyId/:id", isLoggedIn, isAdmin, viewStudbyId);
router.get("/lib/deleteStud/:id", isLoggedIn, isAdmin, deleteStudent)

module.exports = router;