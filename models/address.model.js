const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contact_number: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  landmark: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  }
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model("Address", addressSchema);
