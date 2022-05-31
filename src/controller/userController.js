const userServices = require('../services/userService');

exports.getUsers = function () {
  return userServices.getUsers();
};

exports.getUser = function (req) {
  return userServices.getUser(req);
};

exports.updateUser = function (id, body) {
  return userServices.updateUser(id, body);
};

