import axios from '../../axios'
import Vue from 'vue'
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

const initialSelectedMarket = Vue.cookie.get('selectedMarket') || ''

function filterMarkets (array, currency) {
  return array.filter(market => {
    return market.MarketName.includes(`${currency}-`)
  })
}

function reduceBaseVolume (array) {
  return array.reduce((total, number) => {
    return total + number.BaseVolume
  }, 0)
}

export default {
  namespaced: true,
  state: {
    markets: [],
    isLoading: true,
    selectedMarket: initialSelectedMarket
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
    },
    setSelectedMarket (state, market) {
      Vue.cookie.set('selectedMarket', market)
      state.selectedMarket = market
    },
    removeSelectedMarket (state) {
      state.selectedMarket = ''
      Vue.cookie.delete('selectedMarket')
    }
  },
  getters: {
    selectedMarket (state) {
      return state.selectedMarket
    },
    allMarkets: state => {
      return state.markets
    },
    allBtcMarkets: state => {
      return filterMarkets(state.markets, 'BTC')
    },
    allEthMarkets: state => {
      return filterMarkets(state.markets, 'ETH')
    },
    allUsdMarkets: state => {
      return filterMarkets(state.markets, 'USDT')
    },
    totalVolume: state => {
      if (state.markets.length) {
        return reduceBaseVolume(state.markets)
      } else {
        return null
      }
    },
    totalBtcVolume: state => {
      if (state.markets.length) {
        const filteredMarkets = filterMarkets(state.markets, 'BTC')
        return reduceBaseVolume(filteredMarkets)
      } else {
        return null
      }
    },
    totalEthVolume: state => {
      if (state.markets.length) {
        const filteredMarkets = filterMarkets(state.markets, 'ETH')
        return reduceBaseVolume(filteredMarkets)
      } else {
        return null
      }
    },
    totalUsdVolume: state => {
      if (state.markets.length) {
        const filteredMarkets = filterMarkets(state.markets, 'USDT')
        return reduceBaseVolume(filteredMarkets)
      } else {
        return null
      }
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
