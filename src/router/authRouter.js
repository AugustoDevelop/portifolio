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

router.post("/createRole", authController.createRole);

module.exports = router;