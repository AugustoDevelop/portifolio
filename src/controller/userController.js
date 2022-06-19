const userServices = require('../services/userService');

exports.users = function () {
  return userServices.users();
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

