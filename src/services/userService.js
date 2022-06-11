const User = require("../models/user.model");

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

exports.user = async function (req) {
  try {
    let resultDate = { _id, fullName, username, email, password, gender, phone, roles, created_at, updated_at, __v } = await User.findOne({ 'email': { '$regex': '^' + req.email } })
    let users = { fullName, username, email, gender, phone, roles, created_at, updated_at }
    users.fullName = resultDate.fullName
    users.username = resultDate.username
    users.email = resultDate.email
    users.gender = resultDate.gender
    users.phone = resultDate.phone
    users.roles = resultDate.roles
    users.created_at = resultDate.created_at
    users.updated_at = resultDate.updated_at

    return users;
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


exports.deluser = async function (req) {
  try {
    let aux = req
    console.log(aux);
    // return await User.findOneAndUpdate({ id: id }, update, { new: true })

  } catch (error) {

  }
};

