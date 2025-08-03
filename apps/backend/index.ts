const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Vooksio API!');
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

module.exports = app;
