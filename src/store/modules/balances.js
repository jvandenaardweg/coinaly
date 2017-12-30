import axios from '../../axios'

export default {
  namespaced: true,
  state: {
    currencies: [],
    isLoading: false,
    hasError: false
  },
  mutations: {
    addAll (state, items) {
      state.currencies = items
    },
    startLoading (state) {
      state.isLoading = true
    },
    stopLoading (state) {
      state.isLoading = false
    },
    setError (state) {
      state.hasError = true
    },
    removeError (state) {
      state.hasError = false
    }
  },
  getters: {
    allCurrencies: state => {
      return state.currencies
    },
    allFilledCurrencies: state => {
      return state.currencies.filter(currency => {
        return currency.Balance > 0
      })
    },
    isLoading: state => {
      return state.isLoading
    }
  },
  actions: {
    getAll (context) {
      context.commit('startLoading')
      return axios.get(`api/balances`)
      .then(response => {
        context.commit('addAll', response.data)
      })
      .finally(() => {
        context.commit('stopLoading')
      })
    }
  }
}
