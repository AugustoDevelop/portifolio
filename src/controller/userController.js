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

exports.deluser = function (req) {
  return userServices.deluser(req);
};

