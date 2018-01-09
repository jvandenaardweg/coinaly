require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const slashes = require('connect-slashes')
const serveStatic = require('serve-static')
const compression = require('compression')

const port = process.env.PORT || 5000

app.use(compression())
app.use(bodyParser.json())
app.use(slashes(false))
app.use(serveStatic(path.join(__dirname, 'dist'), {
  maxAge: '30d'
}))

// Catch 404
app.use(function (request, response, next) {
  response.status(404).json({message: 'Not found.'})
})

app.listen(port)

console.log('web: Server started at port ' + port)
