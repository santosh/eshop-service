const productBody = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "name not provided"
    })
  }

  if (!req.body.available_items) {
    return res.status(400).send({
      message: "available_items not provided"
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

  if (!req.body.image_url) {
    return res.status(400).send({
      message: "image_url not provided"
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
