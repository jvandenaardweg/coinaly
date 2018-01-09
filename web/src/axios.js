var axios = require('axios')
require('promise.prototype.finally')

let baseUrl = ''

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:5000'
} else {
  baseUrl = 'https://api.coinaly.io'
}

var axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true
})

axiosInstance.defaults.params = {}
axiosInstance.defaults.params['exchange'] = 'bittrex' // This needs to change when we add more exchanges

module.exports = axiosInstance
