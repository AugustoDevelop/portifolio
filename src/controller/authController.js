const authService = require('../services/authService');

exports.createRole = function (req, res) {
  return authService.createRole(req, res);
}

exports.updateRole = function (req, res) {
  return authService.updateRole(req, res);
}

exports.deleteRole = function (req, res) {
  return authService.deleteRole(req, res);
}

exports.getRoles = function (req, res) {
  return authService.getRoles(req, res);
}