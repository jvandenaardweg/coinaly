require('dotenv').config()
const express = require('express')
const ccxt = require('ccxt')
const log = require('ololog').configure({ locate: false })
const compression = require('compression')
const router = express.Router()
const bodyParser = require('body-parser')
const Cryptorjs = require('cryptorjs')
const secret = process.env.ENCODE_SECRET
const myCryptor = new Cryptorjs(secret)
const app = express()
app.use(compression())
app.use(bodyParser.json())

// A method to create exchange instances based on the exchange name given as a query parameter in the REST calls
// Example: /api/balances?exchange=bittrex
function createExchangeInstance (requestQueries, requestCookies) {
  let exchanges

  try {
    exchanges = myCryptor.decode(requestCookies.token)
  } catch (e) {
    throw new Error(e.message)
  }

  // Get the required values from the decoded token
  const exchangeName = exchanges[0].exchange
  const apiKey = exchanges[0].apiKey
  const apiSecret = exchanges[0].apiSecret

  if (exchangeName && apiKey && apiSecret) {
    // Loop through the available exchanges we can find in the decoded token
    const exchangeInstance = exchanges.map(exchange => {
      const lowercasedExchangeName = exchange.exchange.toLowerCase()

      // We currently only support Bittrex, so just return that instance for now
      if (lowercasedExchangeName === 'bittrex') {
        return new ccxt.bittrex({
          apiKey: exchange.apiKey,
          secret: exchange.apiSecret,
          timeout: 15000
        })
      } else {
        throw new Error('Exchange not supported, currently only bittrex. Or you just need to send the ?exchange=bittrex parameter in the request.')
      }
    })[0]
    return exchangeInstance
  } else {
    throw new Error('Cannot create instance, need exchangeName, apiKey and apiSecret.')
  }
}

function handleExchangeError (ccxt, e, response) {
  let message
  let reason = null
  let exchangeErrorCode = null
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

  // Remove weird error structure containing a string and a JSON object
  if (message.includes('bittrex ')) {
    const messageJSON = JSON.parse(message.split('bittrex ')[1])
    exchangeErrorCode = messageJSON.message
    message = messageJSON
  }

  response.status(500).json({
    status: 'error',
    success: false,
    reason: reason,
    exchange: 'bittrex',
    exchangeErrorCode: exchangeErrorCode,
    exchangeMessage: message
  })
}

function validateAuthBody (body) {
  return new Promise((resolve, reject) => {
    if ((body instanceof Array) === false) {
      reject(new Error('The body should be an array of exchanges.'))
    }
    if (!body.length) {
      reject(new Error('Your body did not include array items.'))
    }
    if (!body[0].exchange && typeof body[0].exchange === 'string') {
      reject(new Error('The body should include an `exchange` name.'))
    }
    if (!body[0].apiKey && typeof body[0].apiKey === 'string') {
      reject(new Error('The body should include an `apiKey`.'))
    }
    if (!body[0].apiSecret && typeof body[0].apiSecret === 'string') {
      reject(new Error('The body should include an `apiSecret`.'))
    }

    // Make sure we don't have any other information
    // We only need an array with exchange, key and secret for the token
    const exchanges = body.map(item => {
      return {
        exchange: item.exchange,
        apiKey: item.apiKey,
        apiSecret: item.apiSecret
      }
    })
    resolve(exchanges)
  })
}

router.get('*', function (request, response, next) {
  const token = request.cookies.token
  if (!token) {
    response.status(500).json({message: `For API requests you need a 'token' cookie.`})
    return
  }

  next()
})

router.post('/auth', (request, response, next) => {
  validateAuthBody(request.body)
  .then(body => {
    const token = myCryptor.encode(body)

    response.json({
      status: 'success',
      message: 'Token created successfully.',
      token: token
    })
  })
  .catch(error => {
    response.status(500).json({
      status: 'error',
      message: error.message
    })
  })
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

router.post('/markets/buy', (request, response, next) => {
  // More info about creating buy/sell orders: https://github.com/ccxt/ccxt/wiki/Manual#placing-orders
  const symbol = request.body.symbol;
  const amount = request.body.amount;
  const price = request.body.price;

  (async () => {
    try {
      const exchange = createExchangeInstance(request.query, request.cookies)
      const result = await exchange.createLimitBuyOrder(symbol, amount, price, {})
      response.json(result)
    } catch (e) {
      handleExchangeError(ccxt, e, response)
    }
  })()
})

module.exports = router
