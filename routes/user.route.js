const control = require("../controllers/user.controller")
const validate = require("../middlewares/user.middleware")

const express = require("express")
const router = express.Router()

router.post("/users", [validate.signupBody], control.signup);
router.post("/auth", [validate.loginBody], control.login);

module.exports = router
