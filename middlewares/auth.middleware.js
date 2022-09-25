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

// isAdmin = async (req, res, next) => {
//   const user = await User.findOne({ userID: req.userId })

//   if (user && user.role == constants.roles.admin) {
//     next()
//   } else {
//     return res.status(403).send({
//       message: "Only ADMIN is allowed to make this call"
//     })
//   }
// }

module.exports = {
  authRequired,
  // isAdmin
}
