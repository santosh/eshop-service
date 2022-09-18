const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
  id: Number,  // do we use this one, or the inbuild `_id`.
  quantity: Number,
  address_id: Number,
  product_id: Number,
  user_id: Number,
  order_date: Date,
})

module.exports = mongoose.model("Order", orderSchema);
