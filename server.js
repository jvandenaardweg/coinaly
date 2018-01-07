require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser())
const bodyParser = require('body-parser')
const slashes = require('connect-slashes')
const serveStatic = require('serve-static')
const compression = require('compression')
const router = express.Router()
const routesApi = require('./routes/api')
const cacheTime = 86400000 * 7 // 7 days

app.use(compression())
app.use(bodyParser.json())
app.use(slashes(false))
app.use(serveStatic(__dirname + '/dist'))

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

app.get('*', (req, res, next) => {
  // Manually set proper expire headers for fonts so CloudFlare picks it up for CDN usage
  if (req.url.includes('/static/') || req.url.includes('/images/') || req.url.includes('.png')) {
    res.setHeader('Cache-Control', 'public, max-age=' + cacheTime)
  }
  next()
})

app.use('/api', routesApi)

// Catch 404
app.use(function (request, response, next) {
  response.status(404).json({message: 'Not found.'})
})

var port = process.env.PORT || 5000
app.listen(port)
console.log('server started ' + port)
