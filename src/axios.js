var axios = require('axios')
require('promise.prototype.finally')

let baseUrl = ''

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:5000'
}

var axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true
})

module.exports = axiosInstance
