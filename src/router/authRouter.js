const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const verifySignUp = require("../middleware/verifySignUp");
const authencation = require("../middleware/authJwt");

router.post("/signup",
  [
    verifySignUp.checkDuplicateEmail,
    verifySignUp.checkRolesExisted,
    verifySignUp.checkDuplicatePhone,
    verifySignUp.checkDuplicateUsername
  ],
  authController.signup
);

router.post("/signin", authController.signin);
router.post("/refreshToken", authencation.authorize, authController.refreshToken);

module.exports = router;