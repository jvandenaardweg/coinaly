import axios from '../../axios'

export default {
  namespaced: true,
  state: {
    currencies: [],
    isLoading: false
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
      .catch(error => {
        console.error('Failed to get the balances.', error)
      })
      .finally(() => {
        context.commit('stopLoading')
      })
    }
  }
}
