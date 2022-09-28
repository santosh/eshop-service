const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/user.model")
const authSecret = require("../configs/secret.config")
const constants = require("../utils/constants")

exports.signup = async (req, res) => {
  // pre-check; if user with email already exists, return "Try any other email, this email is already registered!"
  const user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.status(409).send({
      message: "Try any other email, this email is already registered!"
    })
  }

  // read the user input
  const userObj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    // if no role, role is user
    role: req.body.role === undefined ? constants.roles.user : req.body.role,
    contactNumber: req.body.contactNumber
  }

  // store user data to DB
  try {
    const userCreated = await User.create(userObj)

    // return response
    const userResp = {
      firstName: userCreated.firstName,
      lastName: userCreated.lastName,
      username: userCreated.username,
      email: userCreated.email,
      role: userCreated.role,
      contactNumber: userCreated.contactNumber,
      createdAt: userCreated.createdAt,
      updatedAt: userCreated.updatedAt
    }
    res.status(201).json(userResp)

  } catch (error) {
    console.log("Error while creating a new user", error.message);
    res.status(500).json({
      message: "Internal Server Error while inserting user"
    })
  }
}

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })

  // check if user exists
  if (!user) {
    return res.status(404).json({
      message: "This email has not been registered!"
    })
  }

  // check if the password is matched
  const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)

  if (!isPasswordValid) {
    return res.status(400).send({
      "message": "Invalid Credentials!"
    })
  }

  // generate token and send as x-auth-token
  const token = jwt.sign({ username: user.username }, authSecret.secret, { expiresIn: 900 })

  res.set('x-auth-token', token);

  return res.status(200).send({
    email: user.email,
    name: `${user.firstName} ${user.lastName}`,
    isAuthenticated: true
  })
}

