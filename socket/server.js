require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const slashes = require('connect-slashes')
const compression = require('compression')

const port = process.env.PORT || 6000

app.use(compression())
app.use(bodyParser.json())
app.use(slashes(false))

app.use('/', (request, response, next) => {
  response.json({
    message: 'Socket should be here.'
  })
})

// Catch 404
app.use(function (request, response, next) {
  response.status(404).json({message: 'Not found.'})
})

app.listen(port)

console.log('socket: Server started at port ' + port)
