const express = require('express');
const app = express();

app.get("/api", (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.send("Hello from Vooksio API!");
});

module.exports = app;