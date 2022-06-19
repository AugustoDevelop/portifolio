const User = require("../models/user.model");
const { validationResult } = require('express-validator');
const MSG = require("./../util/en-EN.json")

exports.users = async function () {
  try {
    let resultDate = { _id, fullName, username, email, password, gender, phone, roles, created_at, updated_at, __v } = await User.find()
    let users = { fullName, username, email, gender, phone, roles, created_at, updated_at }
    let responseUser = []
    resultDate.map(user => {
      users.fullName = user.fullName
      users.username = user.username
      users.email = user.email
      users.gender = user.gender
      users.phone = user.phone
      users.roles = user.roles
      users.created_at = user.created_at
      users.updated_at = user.updated_at
      responseUser.push(users)
    })
    return responseUser;
  } catch (error) {

  }
};

exports.user = async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: MSG.EMAIL_PROVIDED });
    var resultDate = { _id, fullName, username, email, password, gender, phone, roles, created_at, updated_at, __v } = await User.findOne({ 'email': { '$regex': '^' + req.params.email } })
    var users = { fullName, username, email, gender, phone, roles, created_at, updated_at }
    users.fullName = resultDate.fullName
    users.username = resultDate.username
    users.email = resultDate.email
    users.gender = resultDate.gender
    users.phone = resultDate.phone
    users.roles = resultDate.roles
    users.created_at = resultDate.created_at
    users.updated_at = resultDate.updated_at

    return res.status(200).json({ user: users });
  } catch (error) {
    return res.status(404).json({ message: MSG.USER_NOT_FOUND });
  }
}

exports.updateUser = async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: MSG.EMAIL_PROVIDED });

    const user = await User.updateOne(req.params, req.body, { upsert: false })
    if (user.modifiedCount === 0) return res.status(404).send({ message: MSG.USER_UPDATE_FAIL, cause: MSG.USER_NOT_FOUND });
    if (user.modifiedCount === 1) return res.status(200).send({ message: MSG.USER_UPDATE_SUCESS });
  } catch (err) {
    return res.status(500).send({ message: MSG.USER_UPDATE_FAIL, error: err });
  }
};

exports.deleteUser = async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: MSG.EMAIL_PROVIDED });

    await User.deleteOne(req.params, (err, user) => {
      if (user.deletedCount === 0) return res.status(404).send({ message: MSG.USER_DELETE_FAIL, cause: MSG.USER_NOT_FOUND });
      if (user.deletedCount === 1) return res.status(200).send({ message: MSG.USER_DELETE_SUCESS });
    });
  } catch (error) {
    return res.status(500).send({ message: MSG.USER_DELETE_FAIL, error });
  }
};

