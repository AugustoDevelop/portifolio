const ROLES = require("../models/role.model");
const User = require("../models/user.model");

checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) return res.status(500).send({ message: err });
    if (user) return res.status(400).send({ message: "Failed! email is already in use!" });

    User.findOne({ phone: req.body.phone }).exec((err, user) => {
      if (err) return res.status(500).send({ message: err });
      if (user) return res.status(400).send({ message: "Failed! phone is already in use!" });
      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) res.status(400).send({ message: `Failed! Role ${req.body.roles[i]} does not exist!` });
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;