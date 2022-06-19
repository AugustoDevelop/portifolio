const Role = require("../models/role.model");
const MSG = require("./../util/en-EN.json")

exports.createRole = async (req, res) => {
  Role.findOne({ name: req.body.name }, (err, role) => {
    if (err) return res.status(500).send({ message: MSG.INTERNAL_ERROR });
    if (role) return res.status(400).send({ message: MSG.ROLE_EXIST });

    const newRole = new Role(req.body);

    newRole.save((err, role) => {
      if (err) return res.status(500).send({ message: MSG.ROLE_FAIL });
      return res.send({ message: MSG.ROLE_SUCESS, role: role });
    });
  });
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
    await Role.find((err, roles) => {
      return res.status(200).send({ message: MSG.SUCCESS, data: roles });
    });
  } catch (error) {
    return res.status(500).send({ message: MSG.SUCCESS, error });
  }
}
