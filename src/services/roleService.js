const Role = require("../models/role.model");
const MSG = require("./../util/en-EN.json")

exports.createRole = async (req, res) => {
  try {
    Role.findOne({ name: req.body.name }, (err, role) => {
      if (role) return res.status(400).send({ message: MSG.ROLE_EXIST });
      const newRole = new Role(req.body);
      newRole.save((err, role) => {
        return res.send({ message: MSG.ROLE_SUCESS, role: role });
      });
    });
  } catch (error) {
    return res.status(500).send({ message: MSG.INTERNAL_ERROR, cause: error });
  }
}

exports.updateRole = async (req, res) => {
  try {
    const role = await Role.updateOne(req.params, req.body, { upsert: false })
    if (role.modifiedCount === 0) return res.status(404).send({ message: MSG.ROLE_UPDATE_FAIL, cause: MSG.ROLE_NOT_FOUND });
    if (role.modifiedCount === 1) return res.status(200).send({ message: MSG.ROLE_UPDATE_SUCESS });
  } catch (error) {
    return res.status(500).send({ message: MSG.ROLE_UPDATE_FAIL, error });
  }
}

exports.deleteRole = async (req, res) => {
  try {
    await Role.deleteOne(req.params, (err, role) => {
      if (role.deletedCount === 0) return res.status(404).send({ message: MSG.ROLE_DELETE_FAIL, cause: MSG.ROLE_NOT_FOUND });
      if (role.deletedCount === 1) return res.status(200).send({ message: MSG.ROLE_DELETE_SUCESS });
    });
  } catch (error) {
    return res.status(500).json({ message: MSG.ROLE_DELETE_FAIL, error });
  }
}

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find({}, { __v: 0 })
    return res.status(200).send({ message: MSG.SUCCESS, data: roles });
  } catch (error) {
    return res.status(500).send({ message: MSG.INTERNAL_ERROR, error });
  }
}

exports.getRole = async (req, res) => {
  try {
    var resultDate = await Role.findOne({ 'name': req.params.name }, { __v: 0 })
    return res.status(200).json({ message: MSG.SUCCESS, data: resultDate });
  } catch (error) {
    return res.status(500).json({ message: MSG.INTERNAL_ERROR, error });
  }
}
