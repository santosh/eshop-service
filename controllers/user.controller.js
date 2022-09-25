const bcrypt = require("bcryptjs")

const User = require("../models/user.model")
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
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    // if no role, role is user
    role: req.body.role === undefined ? constants.roles.user : req.body.role,
    contact_number: req.body.contact_number
  }

  // store user data to DB
  try {
    const userCreated = await User.create(userObj)

    // return response
    const userResp = {
      first_name: userCreated.first_name,
      last_name: userCreated.last_name,
      email: userCreated.email,
      role: userCreated.role,
      contact_number: userCreated.contact_number,
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
