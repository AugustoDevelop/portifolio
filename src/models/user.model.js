const mongoose = require("mongoose");
const opts = {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
}

const userSchema = new mongoose.Schema({
  fullName: String,
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gender: String,
  phone: {
    type: Number,
    unique: true
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  ],
})

userSchema.set('timestamps', opts)

module.exports = mongoose.model('User', userSchema);
