const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const verifySignUp = require("../middleware/verifySignUp");

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

module.exports = router;