const express = require("express");
const router = express.Router();

const { invite, viewAllInvitedUsers, userInviteUpdateData, InviteduserAccess } = require("../controller/inviteController");

router.post("/invite-user", invite);
router.get("/view-invite-user", viewAllInvitedUsers);
router.put("/user-invite-update/:id", userInviteUpdateData);
router.get("/user-invite-by-status", InviteduserAccess);

module.exports = router;