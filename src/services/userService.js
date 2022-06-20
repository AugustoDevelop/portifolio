const User = require("../models/user.model");
const { validationResult } = require('express-validator');
const MSG = require("./../util/en-EN.json")

exports.users = async function (req, res) {
  try {
    const users = await User.find({}, { _id: 0, __v: 0, password: 0 }) // exclude __v and _id from response
    return res.status(200).send({ message: MSG.SUCCESS, data: users });
  } catch (error) {
    return res.status(500).send({ message: MSG.INTERNAL_ERROR, error });
  }
};

exports.user = async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: MSG.EMAIL_PROVIDED });
    var resultDate = await User.findOne({ 'email': req.params.email }, { _id: 0, __v: 0, password: 0 })
    return res.status(200).json({ message: MSG.SUCCESS, data: resultDate });
  } catch (error) {
    return res.status(500).json({ message: MSG.INTERNAL_ERROR, error });
  }
}

exports.updateUser = async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: MSG.USER_UPDATE_FAIL, cause: MSG.EMAIL_PROVIDED });

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

