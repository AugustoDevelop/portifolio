const userServices = require('../services/userService');

exports.users = function (req, res) {
  return userServices.users(req, res);
};

exports.user = function (req, res) {
  return userServices.user(req, res);
};

exports.updateUser = function (req, res) {
  return userServices.updateUser(req, res);
};

exports.deleteUser = function (req, res) {
  return userServices.deleteUser(req, res);
};

