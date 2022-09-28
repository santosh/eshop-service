const Order = require("../models/order.model")
const Product = require("../models/product.model")
const Address = require("../models/address.model")

exports.newOrder = async (req, res) => {
  // check if product exists
  const product = await Product({ _id: req.body.productId })
  if (!product) {
    res.status(400).json({
      message: `No Product found for ID - ${req.body.productId}!`
    })
  }

  // check if address exists
  const address = await Product({ _id: req.body.productId })
  if (!address) {
    res.status(400).json({
      message: `No Address found for ID - ${req.body.addressId}!`
    })
  }

  // if out of stock
  if (product.availableItems < 1 || product.availableItems - req.body.quantity < 0) {
    res.status(400).json({
      message: `Product with ID - ${req.body.productId} is currently out of stock!`
    })
  }

  // read the order input
  const orderObj = {
    productId: req.body.productId,
    addressId: req.body.addressId,
    quantity: req.body.quantity
  }

  // store order data to DB
  try {
    const orderCreated = await Order.create(orderObj)

    // return response
    const orderResp = {
      productId: orderCreated.productId,
      addressId: orderCreated.addressId,
      quantity: orderCreated.quantity,
      createdAt: orderCreated.createdAt,
      updatedAt: orderCreated.updatedAt
    }
    res.status(201).json(orderResp)

  } catch (error) {
    console.log("Error while creating a new order", error.message);
    res.status(500).json({
      message: "Internal Server Error while inserting order"
    })
  }
}
