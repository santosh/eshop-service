const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true
  },
  addressId: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true
  }
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model("Order", orderSchema);
