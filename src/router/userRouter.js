const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authencation = require("../middleware/authJwt");
const { check, body } = require('express-validator');

router.get('/', authencation.verifyToken, userController.users);

router.get('/:email', [
  check('email').isEmail(),
  authencation.verifyToken
], userController.user);

router.patch('/:email', authencation.verifyToken, userController.updateUser);


module.exports = router;