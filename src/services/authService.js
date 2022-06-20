const User = require("../models/user.model");
const MSG = require("../util/en-EN.json")
const security = require("../middleware/authJwt");

exports.signup = async (req, res) => {
  let token = security.generateHash(req.body.password)
  await token.then(toke => { req.body.password = toke; });
  const user = new User(req.body);
  try {
    user.save((err, user) => {
      if (user) return res.status(201).send({ message: MSG.USER_SUCESS });
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

      const token = security.generateToken({ _id: user._id, email: user.email, roles: authorities })

      return res.status(200).send({ message: MSG.LOGIN_SUCCESS, accessToken: token });
    });
  } catch (error) {
    return res.status(500).send({ message: MSG.INTERNAL_ERROR, cause: error.message });
  }

};

exports.refreshToken = async (req, res, next) => {
  try {
    const data = await security.decodedToken(req);
    const user = await User.findById(data._id);

    if (!user) return res.status(404).send({ message: MSG.REFRESH_TOKEN_FAIL, cause: MSG.TOKEN_INVALID });

    const newToken = await security.generateToken({
      _id: user._id,
      email: user.email,
      roles: user.roles
    });

    res.status(201).send({ message: MSG.REFRESH_TOKEN_SUCCESS, token: newToken });

  } catch (e) {
    return res.status(500).send({ message: MSG.INTERNAL_ERROR, cause: e.message });
  }
};