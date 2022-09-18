const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
  id: Number,  // do we use this one, or the inbuild `_id`.
  city: String,
  landmark: String,
  name: String,  // if we link adderss to user, this is a duplicate field
  contact_number: String,  // if we link adderss to user, this is a duplicate field
  state: String,
  street: String,
  zipcode: Number,
  user_id: Number
})

module.exports = mongoose.model("Address", addressSchema);
