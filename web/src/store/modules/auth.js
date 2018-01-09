import axios from '../../axios'
import Vue from 'vue'
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

const initialToken = Vue.cookie.get('token') || null

export default {
  namespaced: true,
  state: {
    token: initialToken,
    error: null
  },
  mutations: {
    addError (state, message) {
      state.error = message
    },
    removeError (state) {
      state.error = null
    },
    setToken (state, token) {
      Vue.cookie.set('token', token, { expires: '99Y' })
      state.token = token
    },
    removeToken (state) {
      Vue.cookie.delete('token')
      state.token = null
    }
  },
  getters: {
    isAuthorized (state) {
      return Boolean(state.token)
    },
    error (state) {
      return state.error
    }
  },
  actions: {
    getToken (context, payload) {
      return axios.post('auth', payload)
      .then(response => {
        if (response.data.status === 'success') {
          context.commit('setToken', response.data.token)
        } else {
          context.commit('addError', response.data.message)
        }
      })
      .catch(error => {
        context.commit('addError', error.response.data.message)
      })
    }
  }
}
