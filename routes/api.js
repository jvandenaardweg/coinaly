const bittrex = require('node-bittrex-api')
const express = require('express')
const cookieParser = require('cookie-parser')
const ccxt = require('ccxt')
const log = require('ololog').configure({ locate: false })
const router = express.Router()
const app = express()
app.use(cookieParser())

let sleep = (ms) => new Promise (resolve => setTimeout(resolve, ms))

function catchExchangeError (ccxt, e, response) {
  let message
  if (e instanceof ccxt.DDoSProtection || e.message.includes('ECONNRESET')) {
    log.bright.yellow('[DDoS Protection] ' + e.message)
    message = e.message
  } else if (e instanceof ccxt.RequestTimeout) {
    log.bright.yellow('[Request Timeout] ' + e.message)
    message = e.message
  } else if (e instanceof ccxt.AuthenticationError) {
    log.bright.yellow('[Authentication Error] ' + e.message)
    message = e.message
  } else if (e instanceof ccxt.ExchangeNotAvailable) {
    log.bright.yellow('[Exchange Not Available Error] ' + e.message)
    message = e.message
  } else if (e instanceof ccxt.ExchangeError) {
    log.bright.yellow('[Exchange Error] ' + e.message)
    message = e.message
  } else if (e instanceof ccxt.NetworkError) {
    log.bright.yellow('[Network Error] ' + e.message)
    message = e.message
  } else {
    message = e.message
  }
  response.status(500).json({message: message})
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

// https://www.npmjs.com/package/node.bittrex.api

router.get('/v2/balances', (request, response, next) => {

  (async () => {
    // instantiate the exchange
    let exchange = new ccxt.bittrex({
      'apiKey': request.cookies.bittrexApiKey,
      'secret': request.cookies.bittrexApiSecret,
      'verbose': false
    })

    try {
      let balance = await exchange.fetchBalance()
      response.json(balance)
    } catch (e) {
      catchExchangeError(ccxt, e, response)
    }
  })()
})

router.get('/balances', function (request, response, next) {
  bittrex.options({
    'apikey': request.cookies.bittrexApiKey,
    'apisecret': request.cookies.bittrexApiSecret,
    verbose: true
  })

  bittrex.getbalances((data) => {
    if (data && data.success) {
      response.json(data.result)
    } else {
      response.status(500).json(data)
    }
  })
})

router.get('/orderhistory', function (request, response, next) {
  bittrex.options({
    'apikey': request.cookies.bittrexApiKey,
    'apisecret': request.cookies.bittrexApiSecret,
    verbose: true
  })

  bittrex.getorderhistory({}, (data) => {
    if (data && data.success) {
      response.json(data.result)
    } else {
      response.status(500).json(data)
    }
  })
})

router.get('/v2/orders', (request, response, next) => {

  (async () => {
    // instantiate the exchange
    let exchange = new ccxt.bittrex({
      'apiKey': request.cookies.bittrexApiKey,
      'secret': request.cookies.bittrexApiSecret,
      enableRateLimit: true,
      'verbose': false
    })

    try {
      const orders = await exchange.fetchOrders()
      response.json(orders)
    } catch (e) {
      catchExchangeError(ccxt, e, response)
    }
  })()
})

router.get('/v2/orders/open', (request, response, next) => {

  (async () => {
    // instantiate the exchange
    let exchange = new ccxt.bittrex({
      'apiKey': request.cookies.bittrexApiKey,
      'secret': request.cookies.bittrexApiSecret,
      enableRateLimit: true,
      'verbose': false
    })

    try {
      const orders = await exchange.fetchOpenOrders()
      response.json(orders)
    } catch (e) {
      catchExchangeError(ccxt, e, response)
    }
  })()
})

router.get('/v2/orders/closed', (request, response, next) => {

  (async () => {
    // instantiate the exchange
    let exchange = new ccxt.bittrex({
      'apiKey': request.cookies.bittrexApiKey,
      'secret': request.cookies.bittrexApiSecret,
      enableRateLimit: true,
      'verbose': false
    })

    try {
      const orders = await exchange.fetchClosedOrders()
      response.json(orders)
    } catch (e) {
      catchExchangeError(ccxt, e, response)
    }
  })()
})

router.get('/withdrawalhistory', function (request, response, next) {
  bittrex.options({
    'apikey': request.cookies.bittrexApiKey,
    'apisecret': request.cookies.bittrexApiSecret,
    verbose: true
  })

  bittrex.getwithdrawalhistory({}, (data) => {
    if (data && data.success) {
      response.json(data.result)
    } else {
      response.status(500).json(data)
    }
  })
})

router.get('/deposithistory', function (request, response, next) {
  bittrex.options({
    'apikey': request.cookies.bittrexApiKey,
    'apisecret': request.cookies.bittrexApiSecret,
    verbose: true
  })

  bittrex.getdeposithistory({}, (data) => {
    if (data && data.success) {
      response.json(data.result)
    } else {
      response.status(500).json(data)
    }
  })
})

router.get('/openorders', function (request, response, next) {
  bittrex.options({
    'apikey': request.cookies.bittrexApiKey,
    'apisecret': request.cookies.bittrexApiSecret,
    verbose: true
  })

  bittrex.getopenorders({}, (data) => {
    if (data && data.success) {
      response.json(data.result)
    } else {
      if (!data) {
        response.status(500).json({'message': 'Are you sure your API key has the trade permissions?'})
      } else {
        response.status(500).json(data)
      }
    }
  })
})

router.get('/market/cancel', function (request, response, next) {
  bittrex.options({
    'apikey': request.cookies.bittrexApiKey,
    'apisecret': request.cookies.bittrexApiSecret,
    verbose: true
  })

  const uuid = request.query.uuid
  if (!uuid) {
    response.status(500).json({'message': 'Please provide an uuid'})
    return
  }

  bittrex.cancel({ uuid: uuid }, (data) => {
    if (data && data.success) {
      response.json(data.result)
    } else {
      response.status(500).json(data)
    }
  })
})

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
router.get('/ticker', function (request, response, next) {
  bittrex.options({
    'apikey': request.cookies.bittrexApiKey,
    'apisecret': request.cookies.bittrexApiSecret,
    verbose: true
  })

  bittrex.getticker({}, ticker => {
    response.json(ticker)
  })
})

// TODO: do with websocket
router.get('/marketsummaries', function (request, response, next) {
  bittrex.options({
    'apikey': request.cookies.bittrexApiKey,
    'apisecret': request.cookies.bittrexApiSecret,
    verbose: true
  })

  bittrex.getmarketsummaries((data, error) => {
    if (data && data.success) {
      response.json(data.result)
    } else {
      response.status(500).json(data)
    }
  })
})

module.exports = router
