const control = require("../controllers/user.controller")
const validate = require("../middlewares/user.middleware")

const express = require("express")
const router = express.Router()

router.post("/signup", [validate.requestBody], control.signup);

module.exports = router
