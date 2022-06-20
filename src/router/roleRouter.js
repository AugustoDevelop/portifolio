const express = require('express');
const router = express.Router();
const roleController = require('../controller/roleController');
const authencation = require("../middleware/authJwt");

router.get("/", authencation.authorize, roleController.getRoles);
router.get("/:name", authencation.authorize, roleController.getRole);
router.patch("/:name", authencation.authorize, roleController.updateRole);
router.post("/", authencation.authorize, roleController.createRole);
router.delete("/:name", authencation.authorize, roleController.deleteRole);

module.exports = router;