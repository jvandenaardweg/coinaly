import axios from '../../axios'
import Vue from 'vue'
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

const apiKey = Vue.cookie.get('bittrexApiKey') || null
const apiSecret = Vue.cookie.get('bittrexApiSecret') || null

export default {
  namespaced: true,
  state: {
    bittrex: {
      apiKey: apiKey,
      apiSecret: apiSecret
    },
    error: null
  },
  mutations: {
    addError (state, message) {
      state.error = message
    },
    removeError (state) {
      state.error = null
    },
    setApiKey (state, apiCredentials) {
      state.bittrex.apiKey = apiCredentials.apiKey
      state.bittrex.apiSecret = apiCredentials.apiSecret
    },
    removeApiKeys (state) {
      state.bittrex.apiKey = null
      state.bittrex.apiSecret = null
    }
  },
  getters: {
    isAuthorized (state) {
      return Boolean(state.bittrex.apiKey && state.bittrex.apiSecret)
    },
    error (state) {
      return state.error
    }
  },
  actions: {
    removeError (context) {
      context.commit('removeError')
    },
    setError (context, message) {
      context.commit('addError', message)
    },
    setApiKey (context, apiCredentials) {
      context.commit('setApiKey', apiCredentials)
      Vue.cookie.set('bittrexApiKey', apiCredentials.apiKey, { expires: '99Y' })
      Vue.cookie.set('bittrexApiSecret', apiCredentials.apiSecret, { expires: '99Y' })
    },
    removeApiKey (context, apiCredentials) {
      context.commit('removeApiKeys')
      Vue.cookie.delete('bittrexApiKey')
      Vue.cookie.delete('bittrexApiSecret')
    },
    checkValidity (context) {
      return axios.get('api/balance')
    }
  }
}
