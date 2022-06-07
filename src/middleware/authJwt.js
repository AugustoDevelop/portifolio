const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");
const User = require("../models/user.model");
const Role = require("../models/role.model");
const MSG = require("../shared/en-EN.json");

verifyToken = (req, res, next) => {
  let token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : res.status(400).send({ message: MSG.PROVIDED_TOKEN });

  if (!token) return res.status(403).send({ message: MSG.PROVIDED_TOKEN });

  jwt.verify(token, process.env.secret || config.secret, (err, decoded) => {
    if (err) return res.status(401).send({ accessToken: null, message: MSG.Unauthorized });
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) return res.status(500).send({ message: err });

    Role.find({ _id: { $in: user.roles } }, (err, roles) => {
      if (err) return res.status(500).send({ message: err });

      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") return next();
      }

      return res.status(403).send({ message: MSG.ROLE_ADMIN });;
    });
  });
};

isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) return res.status(500).send({ message: err });

    Role.find({ _id: { $in: user.roles } }, (err, roles) => {
      if (err) return res.status(500).send({ message: err });

      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") return next();
      }
      return res.status(403).send({ message: MSG.ROLE_MOD });
    }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};
module.exports = authJwt;