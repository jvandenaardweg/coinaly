const bittrex = require('node-bittrex-api')
const express = require('express')
const router = express.Router()

// TODO: move this to environment vars
const API_KEY = '6959cb907d3e463db7eb6b16974e1160'
const API_SECRET = '832c703003c04b3685b6a7f1041216c0'

bittrex.options({
  'apikey': API_KEY,
  'apisecret': API_SECRET
})

// https://www.npmjs.com/package/node.bittrex.api

router.get('/balances', function (request, response, next) {
  bittrex.getbalances((data) => {
    if (data.success) {
      response.json(data.result)
    }
  })
})

router.get('/orderhistory', function (request, response, next) {
  bittrex.getorderhistory({}, (data) => {
    if (data.success) {
      response.json(data.result)
    }
  })
})

router.get('/withdrawalhistory', function (request, response, next) {
  bittrex.getwithdrawalhistory({}, (data) => {
    if (data.success) {
      response.json(data.result)
    }
  })
})

router.get('/deposithistory', function (request, response, next) {
  bittrex.getdeposithistory({}, (data) => {
    if (data.success) {
      response.json(data.result)
    }
  })
})

router.get('/openorders', function (request, response, next) {
  bittrex.getopenorders({}, (data) => {
    if (data.success) {
      response.json(data.result)
    }
  })
})

router.get('/market/cancel', function (request, response, next) {
  const uuid = request.query.uuid

  if (!uuid) {
    response.status(500).json({'message': 'Please provide an uuid'})
    return
  }

  bittrex.cancel({ uuid: uuid }, (data) => {
    if (data && data.success) {
      response.json(data.result)
    } else {
      response.status(500).json({'message': data})
    }
  })
})

// TODO: do with websocker
router.get('/ticker', function (request, response, next) {
  bittrex.getticker({}, ticker => {
    response.json(ticker)
  })
})

router.get('/marketsummaries', function (request, response, next) {
  bittrex.getmarketsummaries((data, error) => {
    response.json(data.result)
  })
})

module.exports = router
