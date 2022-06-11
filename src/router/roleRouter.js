const express = require('express');
const router = express.Router();
const roleController = require('../controller/roleController');
const authencation = require("../middleware/authJwt");

//Roles
router.post("/role", authencation.verifyToken, roleController.createRole);

router.patch("/role/:name", authencation.verifyToken, roleController.updateRole);

router.delete("/role/:name", authencation.verifyToken, roleController.deleteRole);

router.get("/roles", authencation.verifyToken, roleController.getRoles);

module.exports = router;