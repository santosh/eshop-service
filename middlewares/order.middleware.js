const orderBody = (req, res, next) => {
  if (!req.body.productId) {
    return res.status(400).send({
      message: "productId not provided"
    })
  }

  if (!req.body.addressId) {
    return res.status(400).send({
      message: "addressId not provided"
    })
  }

  if (!req.body.quantity) {
    return res.status(400).send({
      message: "quantity not provided"
    })
  }

  next()
}

module.exports = {
  orderBody,
}
