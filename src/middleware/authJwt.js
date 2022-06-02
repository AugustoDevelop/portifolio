const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");
const User = require("../models/user.model");
const Role = require("../models/role.model");

verifyToken = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];

  if (!token) return res.status(403).send({ message: "No token provided!" });

  jwt.verify(token, process.env.secret || config.secret, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Unauthorized!" });
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

      return res.status(403).send({ message: "Require Admin Role!" });;
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
      return res.status(403).send({ message: "Require Moderator Role!" });
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