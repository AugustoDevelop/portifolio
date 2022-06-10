const Role = require("../models/role.model");
const User = require("../models/user.model");

checkDuplicateEmail = (req, res, next) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    try {
      if (user && user.email === req.body.email) return res.status(400).send({ message: "Failed! Email is already in use!" });
      next();
    } catch (error) {
      return res.status(500).send({ message: "Failed" });
    }
  });
};

checkDuplicatePhone = (req, res, next) => {
  User.findOne({ phone: req.body.phone }).exec((err, user) => {
    try {
      if (user && user.phone === req.body.phone) return res.status(400).send({ message: "Failed! phone is already in use!" })
      next();
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  })
}

checkDuplicateUsername = (req, res, next) => {
  User.findOne({ username: req.body.username }).exec((err, user) => {
    try {
      if (user && user.username === req.body.username) return res.status(400).send({ message: "Failed! username is already in use!" })
      next();
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  })
}

checkRolesExisted = (req, res, next) => {
  Role.find({ _id: { $in: req.body.roles } }).exec((error, roles) => {
    try {
      if (roles.length > 0) return next();
      return res.status(400).send({ message: "Failed! Roles is not existed!" });
    } catch (err) {
      return res.status(400).send({ messageErrorrr: error.message });
    }
  });
};

const verifySignUp = {
  checkDuplicateEmail,
  checkRolesExisted,
  checkDuplicatePhone,
  checkDuplicateUsername
};

module.exports = verifySignUp;