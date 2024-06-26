const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()
const bodyParser = require('body-parser')

console.log('Hello World')

app.use('/public', express.static('public'))

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/json', (req, res) => {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({ message: 'HELLO JSON' })
  }
  else {
    res.json({ message: 'Hello json' })
  }
})

app.get('/now', (req, res, next) => {
  req.time = Date().toString()
  next()
}, (req, res) => {
  res.json({ time: req.time })
})

app.get('/:word/echo', (req, res) => {
  res.json({ echo: req.params.word })
})

app.route('/name')
  .get((req, res) => {
    res.json({ name: `${req.query.first} ${req.query.last}` })
  })
  .post((req, res) => {
    res.json({ name: `${req.body.first} ${req.body.last}` })
  })

module.exports = app
