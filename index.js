const express = require('express');

const app = express();
const port = 8000;

app.get('/ping', (req, res) => {
  res.json({ "message": "pong" })
});


app.listen(port);

module.exports = app;
