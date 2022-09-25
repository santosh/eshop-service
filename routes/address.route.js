const validateAuth = require("../middlewares/auth.middleware")
const validateAddress = require("../middlewares/address.middleware")
const control = require("../controllers/address.controller")

const router = require("express").Router()

router.post("/addresses", [validateAuth.authRequired, validateAddress.addressBody], control.newAddress);

module.exports = router
