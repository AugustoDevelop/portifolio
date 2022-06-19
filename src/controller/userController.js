const userServices = require('../services/userService');

exports.users = function () {
  return userServices.users();
};

exports.user = function (req, res) {
  return userServices.user(req, res);
};

exports.updateUser = function (id, body) {
  return userServices.updateUser(id, body);
};

exports.deleteUser = function (req, res) {
  return userServices.deleteUser(req, res);
};

