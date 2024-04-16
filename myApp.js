const express = require('express');
const app = express();
const path = require('path');

console.log('Hello World');

app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

module.exports = app;