const User = require("../models/user.model");
const MSG = require("../util/en-EN.json")
const security = require("../middleware/authJwt");

exports.signup = (req, res) => {
  req.body.password = security.generateHash(req.body.password);
  const user = new User(req.body);
  try {
    user.save((err, user) => {
      if (user) return res.status(201).send({ message: MSG.USER_SUCESS });
      if (err) return res.status(500).send({ message: err.message });
    })
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signin = (req, res) => {
  try {
    User.findOne({ email: req.body.email }).populate("roles", "-__v").exec((err, user) => {
      if (!user) return res.status(401).send({ message: MSG.INVALID_EMAIL, accessToken: MSG.TOKEN_NOT_GENERATED });
      var passwordIsValid = security.compareToken(req.body.password, user.password)
      if (!passwordIsValid) return res.status(401).send({ message: MSG.PASSWORD_NOT_MATCH, accessToken: MSG.TOKEN_NOT_GENERATED });

      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      var token = security.generateToken({ email: user.email, roles: authorities })

      return res.status(200).send({
        message: MSG.LOGIN_SUCCESS,
        accessToken: token
      });
    });
  } catch (error) {
    return res.status(500).send({ message: err, accessToken: MSG.TOKEN_NOT_GENERATED });
  }

};