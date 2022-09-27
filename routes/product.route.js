const validateAuth = require("../middlewares/auth.middleware")
const validateProduct = require("../middlewares/product.middleware")
const control = require("../controllers/product.controller")

const router = require("express").Router()

router.post("/products",
  [validateAuth.authRequired, validateAuth.isAdmin, validateProduct.productBody],
  control.newProduct
);
router.get("/products", control.getAllProducts);
router.get("/products/categories", control.getProductCategories);
router.get("/products/:id", control.getProductById);
router.put("/products/:id",
  [validateAuth.authRequired, validateAuth.isAdmin],
  control.updateProductById
);
router.delete("/products/:id",
  [validateAuth.authRequired, validateAuth.isAdmin],
  control.deleteProductById
);

module.exports = router
