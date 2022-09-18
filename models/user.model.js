const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  id: Number,  // do we use this one, or the inbuild `_id`.
  created: Date,
  updated: Date,
  first_name: String,
  last_name: String,
  user_name: String,
  password: String,
  contact_number: String,
  role: String,
})

module.exports = mongoose.model("User", userSchema);
