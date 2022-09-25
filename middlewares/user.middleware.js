const signupBody = (req, res, next) => {
  if (!req.body.first_name) {
    return res.status(400).send({
      message: "first_name not provided"
    })
  }

  if (!req.body.last_name) {
    return res.status(400).send({
      message: "last_name not provided"
    })
  }

  if (!req.body.username) {
    return res.status(400).send({
      message: "username not provided"
    })
  }

  if (!req.body.email) {
    return res.status(400).send({
      message: "email not provided"
    })
  }

  // validate email; if incorrect, return "Invalid email-id format!"
  if (req.body.email && !isEmailValid(req.body.email)) {
    return res.status(400).send({
      message: "Invalid email-id format!"
    })
  }

  if (!req.body.password) {
    return res.status(400).send({
      message: "password not provided"
    })
  }

  if (!req.body.contact_number) {
    return res.status(400).send({
      message: "contact_number not provided"
    })
  }

  // validate contact number; if incorrect, return "Invalid contact number!"
  if (req.body.contact_number && !isContactNumberValid(req.body.contact_number)) {
    return res.status(400).send({
      message: "Invalid contact number!"
    })
  }

  next()
}

/**
 * isEmailValid returns true if the email passed matches the following criteria:
 * 1. The format of email should be <part1>@<part2>.<part3>
 * 2. Part 1 and part 2 should have at least one character
 * 3. Part 3 can have at least 2 characters and at most 6 characters.
 * 4. Part 1 and part 2 can contain the following characters a-z, A-Z, 0-9, . (dot), _, -.
 * 5. Lastly, Part 3 can contain the following characters (a-z)
 * @param {string} email - email address to validate
 */
function isEmailValid(email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}

/**
 * isContactNumberValid returns true if the contact number passed matches the following criteria:
 * 1. Has only digits
 * 2. Length is 10
 * @param {string} contact_no - contact_no to validate
 */
function isContactNumberValid(contact_no) {
  return /^\d{10}$/.test(contact_no)
}

const loginBody = (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).send({
      message: "email not provided"
    })
  }

  if (!req.body.password) {
    return res.status(400).send({
      message: "password not provided"
    })
  }

  next()
}

module.exports = {
  signupBody,
  loginBody
}
