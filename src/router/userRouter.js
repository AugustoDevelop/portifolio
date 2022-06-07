const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const MSG = require("./../shared/en-EN.json")
const authencation = require("../middleware/authJwt");

router.get('/getUsers', authencation.verifyToken, async function (req, res) {
  const users = await userController.getUsers();
  return res.status(200).json(users);
});

router.get('/getUser/:email', authencation.verifyToken, async function (req, res) {
  const users = await userController.getUser(req.params);
  return users ? res.status(200).json(users) : res.status(400).json({ errorMessage: MSG.USER_NOT_FOUND });
});

router.patch('/:email', authencation.verifyToken, async function (req, res) {
  const users = await userController.updateUser(req.params, req.body);
  return users ? res.status(200).json(users) : res.status(400).json({ errorMessage: MSG.USER_NOT_FOUND });
});

module.exports = router;