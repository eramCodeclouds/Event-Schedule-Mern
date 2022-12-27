const express = require("express");
const router = express.Router();

const { userSignup, userLogin, userUpdateData } = require("../controller/userController");

router.post("/user-create", userSignup);
router.post("/user-login", userLogin);
router.put("/user-data-update/:id", userUpdateData);
module.exports = router;