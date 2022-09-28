const jwt = require("jsonwebtoken")

const secretConfig = require("../configs/secret.config")
const constants = require("../utils/constants")
const User = require("../models/user.model")


authRequired = (req, res, next) => {
  // read the token passed in the request header
  const token = req.headers["x-auth-token"]

  // validate token
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    })
  }

  jwt.verify(token, secretConfig.secret, (err, decoded) => {
    if (err) {
      res.status(403).send({
        message: "Please Login first to access this endpoint!"
      })
    } else {
      req.username = decoded.username
      next()
    }
  })
}

isAdmin = async (req, res, next) => {
  const user = await User.findOne({ username: req.username })

  if (user && user.role == constants.roles.admin) {
    next()
  } else {
    return res.status(403).send({
      message: "You are not authorised to access this endpoint!"
    })
  }
}

isNotAdmin = async (req, res, next) => {
  const user = await User.findOne({ username: req.username })

  if (user && user.role == constants.roles.admin) {
    return res.status(403).send({
      message: "You are not authorised to access this endpoint!"
    })
  } else {
    next()
  }
}

module.exports = {
  authRequired,
  isAdmin,
  isNotAdmin
}
