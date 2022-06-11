const userServices = require('../services/userService');
const { validationResult } = require('express-validator');
const MSG = require("./../util/en-EN.json")

exports.users = function () {
  return userServices.users();
};

exports.user = function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ message: MSG.EMAIL_NOT_SENT });
  return userServices.user(req);
};

exports.updateUser = function (id, body) {
  return userServices.updateUser(id, body);
};

exports.deluser = function (req) {
  return userServices.deluser(req);
};

