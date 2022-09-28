const mongoose = require("mongoose")
const constants = require("../utils/constants")

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: constants.roles.user,
    enum: [constants.roles.user, constants.roles.admin]
  },
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model("User", userSchema);
