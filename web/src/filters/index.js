import Vue from 'vue'
import numeral from 'numeral'
const moment = require('moment')

Vue.filter('capitalize', function (value) {
  return value.toUpperCase()
})

Vue.filter('currency', function (value, prefix) {
  if (!prefix) prefix = '$'
  if (value === null) return value
  return numeral(value).format(`${prefix}0,0.00`)
})

Vue.filter('percentage', function (value) {
  return value + '%'
})

Vue.filter('readableDate', function (value) {
  return moment(value).format('DD-MM-YYYY HH:mm:ss')
})

Vue.filter('toFixed', function (value, decimals = 8) {
  // if (decimals === null) decimals = 8
  if (value === null) return value
  return value.toFixed(decimals)
})
