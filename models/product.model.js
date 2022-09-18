const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  id: Number, // do we use this one, or the inbuild `_id`.
  available_items: Number,
  category: Number,
  created: Date,
  description: String,
  image_url: String,
  manufacturer: String,
  name: String,
  price: Number,
  updated: Date
})

module.exports = mongoose.model("Product", productSchema);
