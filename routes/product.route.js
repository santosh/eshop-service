const validateAuth = require("../middlewares/auth.middleware")
const validateProduct = require("../middlewares/product.middleware")
const control = require("../controllers/product.controller")

const router = require("express").Router()

router.post("/products",
  [validateAuth.authRequired, validateAuth.isAdmin, validateProduct.productBody],
  control.newProduct);

module.exports = router
