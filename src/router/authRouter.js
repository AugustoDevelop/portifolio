const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const authencation = require("../middleware/authJwt");

//Roles
router.post("/createRole", authencation.verifyToken, authController.createRole);

router.patch("/updateRole/:name", authencation.verifyToken, authController.updateRole);

router.delete("/deleteRole/:name", authencation.verifyToken, authController.deleteRole);

router.get("/getRoles", authencation.verifyToken, authController.getRoles);

module.exports = router;