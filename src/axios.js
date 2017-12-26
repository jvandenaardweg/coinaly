var axios = require('axios')
let baseUrl = ''

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:5000'
}

var axiosInstance = axios.create({
  baseURL: baseUrl
})

module.exports = axiosInstance
