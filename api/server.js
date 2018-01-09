require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const slashes = require('connect-slashes')
const compression = require('compression')
const cookieParser = require('cookie-parser')

const apiRoutes = require('./routes')

const port = process.env.PORT || 5000

app.use(cookieParser())
app.use(compression())
app.use(bodyParser.json())
app.use(slashes(false))

if (!process.env.ENCODE_SECRET) {
  console.log('Please add a ENCODE_SECRET to the .env file. This is used to encrypt and decrypt the API keys and secrets.')
  return false
}

// Disable CORS
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    res.header('Access-Control-Allow-Origin', 'https://coinaly.io')
  } else {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  }
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/', apiRoutes)

// Catch 404
app.use(function (request, response, next) {
  response.status(404).json({message: 'Not found.'})
})

app.listen(port)

console.log('api: Server started at port ' + port)
