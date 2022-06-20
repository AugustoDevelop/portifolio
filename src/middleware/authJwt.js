const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");
const MSG = require("../util/en-EN.json");
const bcrypt = require("bcryptjs");

generateHash = async (data) => {
  return bcrypt.hashSync(data, 10)
}

generateToken = (data) => {
  return jwt.sign(data, process.env.secret || config.secret, { expiresIn: 1200 });
}

decodedToken = async (req) => {
  const token = req.headers.authorization.split(" ")[1];
  return jwt.verify(token, process.env.secret || config.secret);
}

compareToken = (password, hash) => {
  return bcrypt.compareSync(password, hash);
}

authorize = function (req, res, next) {
  var token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: MSG.PROVIDED_TOKEN, accessToken: MSG.INVALID_TOKEN });
  } else {
    jwt.verify(token, process.env.secret || config.secret, function (error, decoded) {
      if (error) res.status(401).json({ message: MSG.PROVIDED_TOKEN, accessToken: MSG.INVALID_TOKEN });
      next();
    });
  }
};

isAdmin = function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    res.status(401).json({
      message: 'Token Inválido'
    });
  } else {
    jwt.verify(token, global.SALT_KEY, function (error, decoded) {
      if (error) {
        res.status(401).json({
          message: 'Token Inválido'
        });
      } else {
        if (decoded.roles.includes('admin')) {
          next();
        } else {
          res.status(403).json({
            message: 'Esta funcionalidade é restrita para administradores'
          });
        }
      }
    });
  }
};

const security = {
  generateHash,
  generateToken,
  decodedToken,
  compareToken,
  authorize,
  isAdmin
}

module.exports = security