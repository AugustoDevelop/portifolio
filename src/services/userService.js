const User = require("../models/user.model");

exports.getUsers = async function () {
  try {
    return await User.find();
  } catch (error) {

  }
};

exports.getUser = async function (req) {
  try {
    return await User.find({ 'email': { '$regex': '^' + req.email, '$options': 'i' } })
  } catch (error) {

  }
}

exports.updateUser = async function (id, body) {
  try {
    let { fullName, username, password, gender, phone, role } = body
    let update = { fullName, username, password, gender, phone, role }
    return await User.findOneAndUpdate({ id: id }, update, { new: true })

  } catch (error) {

  }
};

