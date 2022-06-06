const loginService = require('../services/loginService');

exports.signin = function (req, res) {
  return loginService.signin(req, res);
};

exports.signup = function (req, res) {
  return loginService.signup(req, res);
};
