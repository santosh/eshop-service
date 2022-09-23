const mongoose = require("mongoose")
const constants = require("../utils/constants")

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
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
  contact_number: {
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
