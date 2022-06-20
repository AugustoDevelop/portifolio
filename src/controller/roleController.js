const roleService = require('../services/roleService');

exports.createRole = function (req, res) {
  return roleService.createRole(req, res);
}

exports.updateRole = function (req, res) {
  return roleService.updateRole(req, res);
}

exports.deleteRole = function (req, res) {
  return roleService.deleteRole(req, res);
}

exports.getRoles = function (req, res) {
  return roleService.getRoles(req, res);
}

exports.getRole = function (req, res) {
  return roleService.getRole(req, res);
}