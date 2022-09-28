const Address = require("../models/address.model")
const authSecret = require("../configs/secret.config")
const constants = require("../utils/constants")

exports.newAddress = async (req, res) => {
  // read the address input
  const addressObj = {
    name: req.body.name,
    contactNumber: req.body.contactNumber,
    street: req.body.street,
    landmark: req.body.landmark,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode
  }

  // store user data to DB
  try {
    const addressCreated = await Address.create(addressObj)

    // return response
    const addressResp = {
      _id: addressCreated._id,
      name: addressCreated.name,
      contactNumber: addressCreated.contactNumber,
      street: addressCreated.street,
      landmark: addressCreated.landmark,
      city: addressCreated.city,
      state: addressCreated.state,
      zipcode: addressCreated.zipcode,
      createdAt: addressCreated.createdAt,
      updatedAt: addressCreated.updatedAt
    }
    res.status(201).json(addressResp)

  } catch (error) {
    console.log("Error while creating a new address", error.message);
    res.status(500).json({
      message: "Internal Server Error while inserting address"
    })
  }
}
