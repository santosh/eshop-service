const express = require('express');
const mongoose = require('mongoose');

const dbConfig = require("./configs/db.config")
const serverConfig = require("./configs/server.config")

mongoose.connect(dbConfig.DB_URL)

const db = mongoose.connection

db.on("error", () => {
  console.log("Error while connecting to the MongoDB server");
})

db.once("open", () => {
  console.log("Connected to the MongoDB");
  // init()
})

const app = express();

app.get('/ping', (req, res) => {
  res.json({ "message": "pong" })
});


app.listen(serverConfig.PORT, () => {
  console.log("eshop-service is listening on port no:", serverConfig.PORT);
});

module.exports = app;
