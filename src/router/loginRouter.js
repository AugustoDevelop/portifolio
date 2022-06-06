const express = require('express');
const router = express.Router();
const loginController = require('../controller/loginController');
const verifySignUp = require("../middleware/verifySignUp");

router.post("/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    loginController.signup
);

router.post("/signin", loginController.signin);

module.exports = router;