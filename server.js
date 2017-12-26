const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const slashes = require('connect-slashes')
const serveStatic = require('serve-static')
const router = express.Router()

const routesApi = require('./routes/api')

app.use(bodyParser.json())
app.use(slashes(false))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

router.get('*', function (request, response, next) {
  response.setHeader('X-Robots-Tag', 'googlebot: noindex, nofollow')
  next()
})

app.use(serveStatic(__dirname + '/dist'))

app.use('/api', routesApi)

// Catch 404
app.use(function (request, response, next) {
  response.status(404).json({message: 'Not found.'})
})

var port = process.env.PORT || 5000
app.listen(port)
console.log('server started ' + port)
