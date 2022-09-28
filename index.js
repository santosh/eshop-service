const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")

const dbConfig = require("./configs/db.config")
const serverConfig = require("./configs/server.config")
const secretConfig = require("./configs/secret.config")
const User = require("./models/user.model")
const constants = require("./utils/constants")

mongoose.connect(dbConfig.DB_URL)

const db = mongoose.connection

db.on("error", () => {
  console.log("Error while connecting to the MongoDB server");
})

db.once("open", () => {
  console.log("Connected to the MongoDB");
  init()
})

async function init() {
  // check if the admin user is already existing
  try {
    const adminUser = await User.findOne({ email: 'sntshkmr60@gmail.com' })
    if (adminUser) {
      console.log("Admin user already exists");
      return
    }
  } catch (err) {
    console.log("Error while checking for admin the user", err.message);
  }

  try {
    // create an admin user
    const admin = await User.create({
      firstName: "Santosh",
      lastName: "Kumar",
      username: "sntshk",
      email: "sntshkmr60@gmail.com",
      password: bcrypt.hashSync("Welcome@1", secretConfig.saltLength),
      contactNumber: "1234567890",
      role: constants.roles.admin,
    })

    console.log(admin);

  } catch (err) {
    console.log("Error while storing the user", err.message);
  }
}

const app = express();
app.use(express.json())

app.get('/ping', (req, res) => {
  res.json({ "message": "pong" })
});


app.use("/api/v1", require("./routes").userRoute)
app.use("/api/v1", require("./routes").addressRoute)
app.use("/api/v1", require("./routes").productRoute)
app.use("/api/v1", require("./routes").orderRoute)

app.listen(serverConfig.PORT, () => {
  console.log("eshop-service is listening on port no:", serverConfig.PORT);
});

module.exports = app;
