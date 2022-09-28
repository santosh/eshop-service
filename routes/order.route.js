const control = require("../controllers/order.controller")
const validateAuth = require("../middlewares/auth.middleware")
const validateOrder = require("../middlewares/order.middleware")

const router = require("express").Router()

router.post("/orders", [validateAuth.authRequired, validateAuth.isNotAdmin, validateOrder.orderBody], control.newOrder);

module.exports = router
