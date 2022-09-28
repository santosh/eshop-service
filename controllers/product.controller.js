const Product = require("../models/product.model")

exports.newProduct = async (req, res) => {
  // read the product input
  const productObj = {
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    manufacturer: req.body.manufacturer,
    availableItems: req.body.availableItems,
    imageURL: req.body.imageURL
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
      availableItems: productCreated.availableItems,
      imageURL: productCreated.imageURL,
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

exports.updateProductById = async (req, res) => {
  // read the product input
  const product = await Product.findOne({ _id: req.params.id })

  if (!product) {
    res.status(404).json({
      message: `No Product found for ID - ${req.params.id}!`
    })
  }

  product.name = req.body.name == undefined ? product.name : req.body.name
  product.category = req.body.category == undefined ? product.category : req.body.category
  product.price = req.body.price == undefined ? product.price : req.body.price
  product.description = req.body.description == undefined ? product.description : req.body.description
  product.manufacturer = req.body.manufacturer == undefined ? product.manufacturer : req.body.manufacturer
  product.availableItems = req.body.availableItems == undefined ? product.availableItems : req.body.availableItems
  product.imageURL = req.body.imageURL == undefined ? product.imageURL : req.body.imageURL

  // store product data to DB
  try {
    const productSaved = await product.save()

    // return response
    const productResp = {
      name: productSaved.name,
      category: productSaved.category,
      price: productSaved.price,
      description: productSaved.description,
      manufacturer: productSaved.manufacturer,
      availableItems: productSaved.availableItems,
      imageURL: productSaved.imageURL,
      createdAt: productSaved.createdAt,
      updatedAt: productSaved.updatedAt
    }
    res.status(200).json(productResp)

  } catch (error) {
    console.log(`Error while updating product with id: ${req.params.id}`, error.message);
    res.status(500).json({
      message: `Internal Server Error while updating product with id: ${req.params.id}`
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

exports.deleteProductById = async (req, res) => {
  const id = req.params.id

  try {
    const product = await Product.findOne({ _id: id })

    if (!product) {
      res.status(404).json({
        message: `No Product found for ID - ${id}!`
      })
    }
    await product.delete()
    res.status(200).json(product)

  } catch (error) {
    console.log("Error while getting product", error.message);
    res.status(500).json({
      message: "Internal Server Error getting product"
    })
  }
}
