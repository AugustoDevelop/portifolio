const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const verifySignUp = require("../middleware/verifySignUp");

router.post("/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    authController.signup
);

router.post("/signin", authController.signin);

//Roles
router.post("/createRole", authController.createRole);

router.patch("/updateRole/:name", authController.updateRole);

router.delete("/deleteRole/:name", authController.deleteRole);

router.get("/getRoles", authController.getRoles);

module.exports = router;