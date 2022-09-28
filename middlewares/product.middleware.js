const productBody = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "name not provided"
    })
  }

  if (!req.body.availableItems) {
    return res.status(400).send({
      message: "availableItems not provided"
    })
  }

  if (!req.body.price) {
    return res.status(400).send({
      message: "price not provided"
    })
  }

  if (!req.body.category) {
    return res.status(400).send({
      message: "category not provided"
    })
  }

  if (!req.body.description) {
    return res.status(400).send({
      message: "description not provided"
    })
  }

  if (!req.body.imageURL) {
    return res.status(400).send({
      message: "imageURL not provided"
    })
  }

  if (!req.body.manufacturer) {
    return res.status(400).send({
      message: "manufacturer not provided"
    })
  }

  next()
}

module.exports = {
  productBody,
}
