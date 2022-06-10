const Role = require("../models/role.model");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");
const MSG = require("../shared/en-EN.json")

exports.signup = (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 8)
  const user = new User(req.body);
  try {
    user.save((err, user) => {
      if (user) return res.status(200).send({ message: MSG.USER_SUCESS });
    })
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
  //   user.save((err, user) => {
  //     if (err) return res.status(500).send({ message: err });
  //     // Role.find({ name: { $in: req.body.roles } }, (err, roles) => {
  //     //   user.roles = roles.map(role => role._id);
  //     // });

  //     // Role.findOne({ name: "user" }, (err, role) => {


  //     //   user.roles = [role._id];
  //     //   user.save(err => {
  //     //     if (err) return res.status(500).send({ message: err });
  //     //     res.send({ message: MSG.USER_SUCESS });
  //     //   });
  //     // });

  //   });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).populate("roles", "-__v").exec((err, user) => {
    if (err) return res.status(500).send({ message: err, accessToken: MSG.TOKEN_NOT_GENERATED });
    if (!user) return res.status(401).send({ message: MSG.INVALID_EMAIL, accessToken: MSG.TOKEN_NOT_GENERATED });
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ message: MSG.PASSWORD_NOT_MATCH, accessToken: MSG.TOKEN_NOT_GENERATED });

    var authorities = [];
    for (let i = 0; i < user.roles.length; i++) {
      authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    }

    var token = jwt.sign({ email: user.email, roles: authorities }, process.env.secret || config.secret, { expiresIn: 600 });

    res.status(200).send({
      message: MSG.LOGIN_SUCCESS,
      accessToken: token
    });
  });

};