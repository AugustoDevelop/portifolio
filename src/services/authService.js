const Role = require("../models/role.model");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");
const MSG = require("./../shared/en-EN.json")

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

exports.createRole = async (req, res) => {
  Role.findOne({ name: req.body.name }, (err, role) => {
    if (err) return res.status(500).send({ message: MSG.INTERNAL_ERROR });
    if (role) return res.status(400).send({ message: MSG.ROLE_EXIST });

    const newRole = new Role(req.body);

    newRole.save((err, role) => {
      if (err) return res.status(500).send({ message: MSG.INTERNAL_ERROR });
      res.send({ message: MSG.ROLE_SUCESS, role: role });
    });
  });
}

exports.updateRole = async (req, res) => {
  try {
    const filter = { name: req.params.name };
    const update = { name: req.body.name };
    const options = { new: true };
    await Role.updateOne(filter, update, options, (err, role) => {
      if (err) return res.status(500).send({ message: err });
      if (role.modifiedCount === 0) return res.status(400).send({ message: "Role not found!" });
      if (role.modifiedCount === 1) return res.status(200).send({ message: "Role was updated successfully!", role: update });
    });
  } catch (error) {

  }
}

exports.deleteRole = async (req, res) => {
  try {
    const filter = { name: req.params.name };
    await Role.deleteOne(filter, (err, role) => {
      if (err) return res.status(500).send({ message: err });
      if (role.deletedCount === 0) return res.status(400).send({ message: "Role not found!" });
      if (role.deletedCount === 1) return res.status(200).send({ message: "Role was deleted successfully!" });
    });
  } catch (error) {

  }
}

exports.getRoles = async (req, res) => {
  try {
    await Role.find((err, roles) => {
      if (err) return res.status(500).send({ message: err });
      if (roles.length === 0) return res.status(400).send({ message: "Roles not found!" });
      return res.status(200).send({ message: "Roles found!", roles });
    });
  } catch (error) {

  }
}
