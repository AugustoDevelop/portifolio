const Role = require("../models/role.model");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");

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
          res.send({ message: "User was registered successfully!" });
        });
      });
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) return res.status(500).send({ message: err });

        user.roles = [role._id];
        user.save(err => {
          if (err) return res.status(500).send({ message: err });
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).populate("roles", "-__v").exec((err, user) => {
    if (err) return res.status(500).send({ message: err });
    if (!user) return res.status(401).send({ message: "Failed to authenticate token." });

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }
    let aux = !!config.secret ? config.secret : process.env.secret
    var token = jwt.sign({ id: user.id }, aux, {
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


exports.createRole = (req, res) => {
  const role = new Role(req.body);

  role.save((err, role) => {
    if (err) return res.status(500).send({ message: err });
    res.send({ message: "Role was registered successfully!" });
  });
}
