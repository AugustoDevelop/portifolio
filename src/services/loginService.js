const Role = require("../models/role.model");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");
const MSG = require("../shared/en-EN.json")

exports.signup = (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 8)
  const user = new User(req.body);

  user.save((err, user) => {
    if (err) return res.status(500).send({ message: err });

    if (req.body.roles) {
      Role.find({ name: { $in: req.body.roles } }, (err, roles) => {
        if (err) return res.status(500).send({ message: err });

        user.roles = roles.map(role => role._id);
        user.save(err => {
          if (err) return res.status(500).send({ message: err });
          res.send({ message: MSG.USER_SUCESS });
        });
      });
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) return res.status(500).send({ message: err });

        user.roles = [role._id];
        user.save(err => {
          if (err) return res.status(500).send({ message: err });
          res.send({ message: MSG.USER_SUCESS });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).populate("roles", "-__v").exec((err, user) => {
    if (err) return res.status(500).send({ message: err });

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) return res.status(401).send({ accessToken: null, message: MSG.PASSWORD_NOT_MATCH });

    var token = jwt.sign({ id: user.id }, process.env.secret || config.secret, {
      expiresIn: 600
    });

    var authorities = [];

    for (let i = 0; i < user.roles.length; i++) {
      authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    }
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token
    });
  });
};