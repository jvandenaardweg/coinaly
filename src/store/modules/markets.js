import axios from '../../axios'

export default {
  namespaced: true,
  state: {
    markets: [],
    isLoading: false
  },
  mutations: {
    addAllMarkets (state, items) {
      state.markets = items
    },
    startLoading (state) {
      state.isLoading = true
    },
    stopLoading (state) {
      state.isLoading = false
    }
  },
  getters: {
    allMarkets: state => {
      return state.markets
    },
    allBtcMarkets: state => {
      return state.markets.filter(market => {
        return market.MarketName.includes('BTC-')
      })
    },
    allEthMarkets: state => {
      return state.markets.filter(market => {
        return market.MarketName.includes('ETH-')
      })
    },
    allUsdMarkets: state => {
      return state.markets.filter(market => {
        return market.MarketName.includes('USDT-')
      })
    },
    isLoading: state => {
      return state.isLoading
    }
  },
  actions: {
    getAll (context) {
      context.commit('startLoading')
      return axios.get(`api/marketsummaries`)
      .then(response => {
        context.commit('addAllMarkets', response.data)
      })
      .catch(error => {
        console.error('Failed to get the markets.', error)
      })
      .finally(() => {
        context.commit('stopLoading')
      })
    }
  }
}
