const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authencation = require("../middleware/authJwt");
const { check } = require('express-validator');

router.get('/', authencation.verifyToken, userController.users);
router.get('/:email', [check('email').isEmail(), authencation.verifyToken], userController.user);
router.patch('/:email', [check('email').isEmail(), authencation.verifyToken], userController.updateUser);
router.delete('/:id', authencation.verifyToken, userController.deleteUser)

module.exports = router;