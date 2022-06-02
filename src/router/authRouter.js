const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const verifySignUp = require("../middleware/verifySignUp");
const authencation = require("../middleware/authJwt");

router.post("/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    authController.signup
);

router.post("/signin", authController.signin);

//Roles
router.post("/createRole", authencation.verifyToken, authController.createRole);

router.patch("/updateRole/:name", authencation.verifyToken, authController.updateRole);

router.delete("/deleteRole/:name", authencation.verifyToken, authController.deleteRole);

router.get("/getRoles", authController.getRoles);

module.exports = router;