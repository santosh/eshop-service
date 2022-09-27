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

exports.getAllProducts = async (req, res) => {
  // const category = req.query.category
  // const direction = req.query.direction == undefined ? -1 : 1
  // const name = req.query.name
  // const sortBy = req.query.sortBy

  // console.log("category", category);
  // console.log("direction", direction);
  // console.log("name", name);
  // console.log("sortBy", sortBy);

  try {
    const products = await Product.find()

    res.status(200).json(products)

  } catch (error) {
    console.log("Error while getting products", error.message);
    res.status(500).json({
      message: "Internal Server Error getting products"
    })
  }
}

exports.getProductCategories = async (req, res) => {
  const id = req.params.id

  try {
    const products = await Product.find().distinct('category')

    if (!products) {
      res.status(200).json([])
    }
    res.status(200).json(products)

  } catch (error) {
    console.log("Error while getting product categories", error.message);
    res.status(500).json({
      message: "Internal Server Error getting product categories"
    })
  }
}

exports.getProductById = async (req, res) => {
  const id = req.params.id

  try {
    const product = await Product.findOne({ _id: id })

    if (!product) {
      res.status(404).json({
        message: `No Product found for ID - ${id}!`
      })
    }
    res.status(200).json(product)

  } catch (error) {
    console.log("Error while getting product", error.message);
    res.status(500).json({
      message: "Internal Server Error getting product"
    })
  }
}
