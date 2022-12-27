const express = require("express");
const router = express.Router();

const { adminLogin, adminSignup, update_data, viewAllUsers, viewSingelUser, viewAdmin } = require("../controller/AdminController");

router.post("/adminsignup", adminSignup);
router.post("/adminlogin", adminLogin);
router.put('/admin_update', update_data)
router.get("/view-all-users", viewAllUsers);
router.get("/view-single-user/:id", viewSingelUser);
router.get("/view-admin", viewAdmin);
module.exports = router;