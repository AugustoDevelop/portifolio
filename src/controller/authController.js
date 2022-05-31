const authService = require('../services/authService');

exports.signin = function (req, res) {
  return authService.signin(req, res);
};

exports.signup = function (req, res) {
  return authService.signup(req, res);
};

exports.createRole = function (req, res) {
  return authService.createRole(req, res);
}