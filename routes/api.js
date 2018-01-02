const bittrex = require('node-bittrex-api')
const express = require('express')
const cookieParser = require('cookie-parser')
const router = express.Router()
const app = express()
app.use(cookieParser())

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
