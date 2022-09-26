const Product = require("../models/product.model")

exports.newProduct = async (req, res) => {
  // read the product input
  const productObj = {
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    manufacturer: req.body.manufacturer,
    available_items: req.body.available_items,
    image_url: req.body.image_url
  }

  // store product data to DB
  try {
    const productCreated = await Product.create(productObj)

    // return response
    const productResp = {
      name: productCreated.name,
      category: productCreated.category,
      price: productCreated.price,
      description: productCreated.description,
      manufacturer: productCreated.manufacturer,
      available_items: productCreated.available_items,
      image_url: productCreated.image_url,
      createdAt: productCreated.createdAt,
      updatedAt: productCreated.updatedAt
    }
    res.status(201).json(productResp)

  } catch (error) {
    console.log("Error while creating a new product", error.message);
    res.status(500).json({
      message: "Internal Server Error while inserting product"
    })
  }
}
