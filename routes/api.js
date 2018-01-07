const bittrex = require('node-bittrex-api')
const express = require('express')
const cookieParser = require('cookie-parser')
const ccxt = require('ccxt')
const log = require('ololog').configure({ locate: false })
const compression = require('compression')
const router = express.Router()
const app = express()
app.use(cookieParser())
app.use(compression())

// A method to create exchange instances based on the exchange name given as a query parameter in the REST calls
// Example: /api/balances?exchange=bittrex
function createExchangeInstance (requestQueries, requestCookies) {
  let exchangeInstance
  const exchangeName = requestQueries.exchange
  const apiKey = requestCookies.bittrexApiKey
  const apiSecret = requestCookies.bittrexApiSecret

  if (exchangeName && apiKey && apiSecret) {
    const lowercasedExchangeName = exchangeName.toLowerCase()

    if (lowercasedExchangeName === 'bittrex') {
      exchangeInstance = new ccxt.bittrex({
        apiKey: apiKey,
        secret: apiSecret,
        timeout: 15000
      })
      return exchangeInstance
    } else {
      throw new Error('Exchange not supported, currently only bittrex. Or you just need to send the ?exchange=bittrex parameter in the request.')
    }
  } else {
    throw new Error('Cannot create instance, need exchangeName, apiKey and apiSecret.')
  }
}

function handleExchangeError (ccxt, e, response) {
  let message
  let reason = null
  if (e instanceof ccxt.DDoSProtection || e.message.includes('ECONNRESET')) {
    log.bright.yellow('[DDoS Protection] ' + e.message)
    message = e.message
    reason = 'ddos protection'
  } else if (e instanceof ccxt.RequestTimeout) {
    log.bright.yellow('[Request Timeout] ' + e.message)
    message = e.message
    reason = 'request timeout'
  } else if (e instanceof ccxt.AuthenticationError) {
    log.bright.yellow('[Authentication Error] ' + e.message)
    message = e.message
    reason = 'authentication error'
  } else if (e instanceof ccxt.ExchangeNotAvailable) {
    log.bright.yellow('[Exchange Not Available Error] ' + e.message)
    message = e.message
    reason = 'exchange not available error'
  } else if (e instanceof ccxt.ExchangeError) {
    log.bright.yellow('[Exchange Error] ' + e.message)
    message = e.message
    reason = 'exchange error'
  } else if (e instanceof ccxt.NetworkError) {
    log.bright.yellow('[Network Error] ' + e.message)
    message = e.message
    reason = 'network error'
  } else {
    message = e.message
  }

  response.status(500).json({
    status: 'error',
    reason: reason,
    message: message
  })
}

router.get('*', function (request, response, next) {
  const bittrexApiKey = request.cookies['bittrexApiKey']
  const bittrexApiSecret = request.cookies['bittrexApiSecret']

  if (!bittrexApiKey && !bittrexApiSecret) {
    response.status(500).json({message: 'Please provide your bittrexApiKey and bittrexApiSecret in a cookie'})
    return
  }

  next()
})

router.get('/balances', (request, response, next) => {
  (async () => {
    try {
      const exchange = createExchangeInstance(request.query, request.cookies)
      const result = await exchange.fetchBalance()
      response.json(result)
    } catch (error) {
      handleExchangeError(ccxt, error, response)
    }
  })()
})

router.get('/orders', (request, response, next) => {
  let result
  (async () => {
    try {
      const orderStatus = request.query.status
      const exchange = createExchangeInstance(request.query, request.cookies)

      switch (orderStatus) {
        case 'open':
          result = await exchange.fetchOpenOrders()
          break
        case 'closed':
          result = await exchange.fetchClosedOrders()
          break
        default:
          result = await exchange.fetchOrders()
      }

      response.json(result)
    } catch (error) {
      handleExchangeError(ccxt, error, response)
    }
  })()
})

router.get('/tickers', (request, response, next) => {
  (async () => {
    try {
      const exchange = createExchangeInstance(request.query, request.cookies)
      const result = await exchange.fetchTickers()
      response.json(result)
    } catch (e) {
      handleExchangeError(ccxt, e, response)
    }
  })()
})

router.get('/withdrawalhistory', (request, response, next) => {
  (async () => {
    try {
      const exchange = createExchangeInstance(request.query, request.cookies)
      const result = await exchange.accountGetWithdrawalhistory() // According to CCXT docs, this method might differ per exchange. Need to look into this when we add more exchanges. See https://github.com/ccxt/ccxt/wiki/Manual#publicprivate-api
      response.json(result)
    } catch (e) {
      handleExchangeError(ccxt, e, response)
    }
  })()
})

router.get('/deposithistory', (request, response, next) => {
  (async () => {
    try {
      const exchange = createExchangeInstance(request.query, request.cookies)
      const result = await exchange.accountGetDeposithistory() // According to CCXT docs, this method might differ per exchange. Need to look into this when we add more exchanges. See https://github.com/ccxt/ccxt/wiki/Manual#publicprivate-api
      response.json(result)
    } catch (e) {
      handleExchangeError(ccxt, e, response)
    }
  })()
})

router.get('/cancelorder', (request, response, next) => {
  const orderUuid = request.query.uuid;
  (async () => {
    try {
      const exchange = createExchangeInstance(request.query, request.cookies)
      const result = await exchange.cancelOrder(orderUuid)
      response.json(result)
    } catch (e) {
      handleExchangeError(ccxt, e, response)
    }
  })()
})





// router.get('/balances', function (request, response, next) {
//   bittrex.options({
//     apikey: request.cookies.bittrexApiKey,
//     apisecret: request.cookies.bittrexApiSecret
//   })

//   bittrex.getbalances((data) => {
//     if (data && data.success) {
//       response.json(data.result)
//     } else {
//       response.status(500).json(data)
//     }
//   })
// })

// router.get('/orderhistory', function (request, response, next) {
//   bittrex.options({
//     apikey: request.cookies.bittrexApiKey,
//     apisecret: request.cookies.bittrexApiSecret
//   })

//   bittrex.getorderhistory({}, (data) => {
//     if (data && data.success) {
//       response.json(data.result)
//     } else {
//       response.status(500).json(data)
//     }
//   })
// })





// router.get('/withdrawalhistory', function (request, response, next) {
//   bittrex.options({
//     apikey: request.cookies.bittrexApiKey,
//     apisecret: request.cookies.bittrexApiSecret
//   })

//   bittrex.getwithdrawalhistory({}, (data) => {
//     if (data && data.success) {
//       response.json(data.result)
//     } else {
//       response.status(500).json(data)
//     }
//   })
// })

// router.get('/deposithistory', function (request, response, next) {
//   bittrex.options({
//     apikey: request.cookies.bittrexApiKey,
//     apisecret: request.cookies.bittrexApiSecret
//   })

//   bittrex.getdeposithistory({}, (data) => {
//     if (data && data.success) {
//       response.json(data.result)
//     } else {
//       response.status(500).json(data)
//     }
//   })
// })

// router.get('/openorders', function (request, response, next) {
//   bittrex.options({
//     apikey: request.cookies.bittrexApiKey,
//     apisecret: request.cookies.bittrexApiSecret
//   })

//   bittrex.getopenorders({}, (data) => {
//     if (data && data.success) {
//       response.json(data.result)
//     } else {
//       if (!data) {
//         response.status(500).json({'message': 'Are you sure your API key has the trade permissions?'})
//       } else {
//         response.status(500).json(data)
//       }
//     }
//   })
// })

// router.get('/market/cancel', function (request, response, next) {
//   bittrex.options({
//     apikey: request.cookies.bittrexApiKey,
//     apisecret: request.cookies.bittrexApiSecret,
//     verbose: true
//   })

//   const uuid = request.query.uuid
//   if (!uuid) {
//     response.status(500).json({'message': 'Please provide an uuid'})
//     return
//   }

//   bittrex.cancel({ uuid: uuid }, (data) => {
//     if (data && data.success) {
//       response.json(data.result)
//     } else {
//       response.status(500).json(data)
//     }
//   })
// })

// router.post('/market/cancel', function (request, response, next) {
//   bittrex.options({
//     'apikey': request.cookies.bittrexApiKey,
//     'apisecret': request.cookies.bittrexApiSecret,
//     verbose: true
//   })

//   // const uuid = request.query.uuid
//   // if (!uuid) {
//   //   response.status(500).json({'message': 'Please provide an uuid'})
//   //   return
//   // }

//   bittrex.tradesell({ uuid: uuid }, (data) => {
//     if (data && data.success) {
//       response.json(data.result)
//     } else {
//       response.status(500).json(data)
//     }
//   })
// })

// TODO: do with websocket
// router.get('/ticker', function (request, response, next) {
//   bittrex.options({
//     'apikey': request.cookies.bittrexApiKey,
//     'apisecret': request.cookies.bittrexApiSecret,
//     verbose: true
//   })

//   bittrex.getticker({}, ticker => {
//     response.json(ticker)
//   })
// })

// TODO: do with websocket
// router.get('/marketsummaries', function (request, response, next) {
//   bittrex.options({
//     'apikey': request.cookies.bittrexApiKey,
//     'apisecret': request.cookies.bittrexApiSecret,
//     verbose: true
//   })

//   bittrex.getmarketsummaries((data, error) => {
//     if (data && data.success) {
//       response.json(data.result)
//     } else {
//       response.status(500).json(data)
//     }
//   })
// })

module.exports = router
