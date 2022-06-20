const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authencation = require("../middleware/authJwt");
const { check } = require('express-validator');

router.get('/', authencation.authorize, userController.users);
router.get('/:email', [check('email').isEmail(), authencation.authorize], userController.user);
router.patch('/:email', [check('email').isEmail(), authencation.authorize], userController.updateUser);
router.delete('/:email', [check('email').isEmail(), authencation.authorize], userController.deleteUser)

module.exports = router;