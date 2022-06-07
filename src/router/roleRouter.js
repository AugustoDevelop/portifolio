const express = require('express');
const router = express.Router();
const roleController = require('../controller/roleController');
const authencation = require("../middleware/authJwt");

//Roles
router.post("/createRole", authencation.verifyToken, roleController.createRole);

router.patch("/updateRole/:name", authencation.verifyToken, roleController.updateRole);

router.delete("/deleteRole/:name", authencation.verifyToken, roleController.deleteRole);

router.get("/getRoles", authencation.verifyToken, roleController.getRoles);

module.exports = router;