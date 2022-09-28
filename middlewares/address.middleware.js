const addressBody = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "name not provided"
    })
  }

  if (!req.body.contactNumber) {
    return res.status(400).send({
      message: "Invalid contact number!"
    })
  }

  if (req.body.contactNumber && !isContactNumberValid(req.body.contactNumber)) {
    return res.status(400).send({
      message: "Invalid contact number!"
    })
  }

  if (!req.body.city) {
    return res.status(400).send({
      message: "city not provided"
    })
  }

  if (!req.body.landmark) {
    return res.status(400).send({
      message: "landmark not provided"
    })
  }

  if (!req.body.street) {
    return res.status(400).send({
      message: "street not provided"
    })
  }

  if (!req.body.state) {
    return res.status(400).send({
      message: "state not provided"
    })
  }

  if (!req.body.zipcode) {
    return res.status(400).send({
      message: "Invalid zip code!"
    })
  }

  if (req.body.zipcode && !isZipValid(req.body.zipcode)) {
    return res.status(400).send({
      message: "Invalid zip code!"
    })
  }

  next()
}


function isContactNumberValid(contactNumber) {
  return /^\d{10}$/.test(contactNumber)
}

function isZipValid(zip) {
  return /^\d{6}$/.test(zip)
}

module.exports = {
  addressBody,
}
