const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/getUsers', async function (req, res) {
  const users = await userController.getUsers();
  return res.json(users);
});

router.get('/:email', async function (req, res) {
  const users = await userController.getUser(req.params);
  return users ? res.status(200).json(users) : res.status(404).json({ errorMessage: 'User not found' });
});

router.patch('/:id', async function (req, res) {
  const users = await userController.updateUser(req.params, req.body);
  return users ? res.status(200).json(users) : res.status(404).json({ errorMessage: 'User not found' });
});

module.exports = router;