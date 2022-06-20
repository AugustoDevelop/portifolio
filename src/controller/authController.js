const authService = require('../services/authService');

exports.signin = function (req, res) {
  return authService.signin(req, res);
};

exports.signup = function (req, res) {
  return authService.signup(req, res);
};

exports.refreshToken = function (req, res, next) {
  return authService.refreshToken(req, res, next);
}
