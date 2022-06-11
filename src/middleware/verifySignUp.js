const Role = require("../models/role.model");
const User = require("../models/user.model");
const MSG = require("../util/en-EN.json")

checkDuplicateEmail = (req, res, next) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    try {
      if (user && user.email === req.body.email) return res.status(400).send({ message: MSG.ALREADY_EMAIL });
      next();
    } catch (error) {
      return res.status(500).send({ message: MSG.ERROR_CHECKING_EMAIL });
    }
  });
};

checkDuplicatePhone = (req, res, next) => {
  User.findOne({ phone: req.body.phone }).exec((err, user) => {
    try {
      if (user && user.phone === req.body.phone) return res.status(400).send({ message: MSG.ALREADY_PHONE })
      next();
    } catch (error) {
      return res.status(500).send({ message: MSG.ERROR_CHECKING_PHONE });
    }
  })
}

checkDuplicateUsername = (req, res, next) => {
  User.findOne({ username: req.body.username }).exec((err, user) => {
    try {
      if (user && user.username === req.body.username) return res.status(400).send({ message: MSG.ALREADY_USERNAME })
      next();
    } catch (error) {
      return res.status(500).send({ message: MSG.ERROR_CHECKING_USERNAME });
    }
  })
}

checkRolesExisted = (req, res, next) => {
  Role.find({ _id: { $in: req.body.roles } }).exec((error, roles) => {
    try {
      if (roles.length > 0) return next();
    } catch (err) {
      if (error.value.length !== 24) return res.status(400).send({ message: MSG.ROLE_INVALID });
      return res.status(500).send({ message: MSG.ERROR_CHECKING_ROLE });
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