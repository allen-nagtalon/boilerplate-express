const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config()

console.log('Hello World');

app.use('/public', express.static('public'))

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/json', (req, res) => {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({ "message": "HELLO JSON" })
  }
  else {
    res.json({ "message": "Hello json" })
  }
})

module.exports = app;