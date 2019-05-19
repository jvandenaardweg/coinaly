import axios from '../../axios'
import Vue from 'vue'
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

const selectedOrderTypeCookie = Vue.cookie.get('selectedOrderType') || null
const initialSelectedOrderType = (selectedOrderTypeCookie === 'null' ? null : selectedOrderTypeCookie)

export default {
  namespaced: true,
  state: {
    history: [],
    open: [],
    isLoading: false,
    selectedOrderType: initialSelectedOrderType,
    serverErrors: {
      history: null,
      open: null,
      buy: null
    }
  },
  mutations: {
    addAllHistory (state, items) {
      state.history = items
    },
    addAllOpen (state, items) {
      state.open = items
    },
    startLoading (state) {
      state.isLoading = true
    },
    stopLoading (state) {
      state.isLoading = false
    },
    setSelectedOrderType (state, type) {
      if (process.env.NODE_ENV === 'production') {
        Vue.cookie.set('selectedOrderType', type, { expires: '99Y', domain: 'coinaly.io' })
      } else {
        Vue.cookie.set('selectedOrderType', type, { expires: '99Y', domain: 'localhost' })
      }
      state.selectedOrderType = type
    },
    removeSelectedOrderType (state, type) {
      Vue.cookie.delete('selectedOrderType')
      state.selectedOrderType = null
    },
    addServerErrorHistory (state, error) {
      state.serverErrors.history = error
    },
    addServerErrorOpen (state, error) {
      state.serverErrors.open = error
    },
    addServerErrorCreateBuyOrder (state, error) {
      state.serverErrors.buy = error
    },
    removeServerErrors (state) {
      console.log('remove server errors')
      state.serverErrors.history = null
      state.serverErrors.open = null
      state.serverErrors.buy = null
    }
  },
  getters: {
    selectedOrderType: state => {
      return state.selectedOrderType
    },
    getOpenOrders: state => {
      return state.open
    },
    getAllHistory: state => {
      return state.history
    },
    getAllBuyHistory: state => {
      if (state.history.length) {
        return state.history.filter(order => {
          return order.side === 'buy'
        })
      } else {
        return state.history
      }
    },
    getAllSellHistory: state => {
      if (state.history.length) {
        return state.history.filter(order => {
          return order.side === 'sell'
        })
      } else {
        return state.history
      }
    },
    isLoading: state => {
      return state.isLoading
    },
    orderHistoryServerError: state => {
      return state.serverErrors.history
    },
    openOrdersServerError: state => {
      return state.serverErrors.open
    },
    buyOrderServerError: state => {
      if (state.serverErrors.buy && state.serverErrors.buy.exchangeErrorCode === 'MIN_TRADE_REQUIREMENT_NOT_MET') {
        return 'Order not created. Minimum trade requirement is not met.'
      } else if (state.serverErrors.buy && state.serverErrors.buy.exchangeErrorCode === 'INSUFFICIENT_FUNDS') {
        return 'Order not created. You have insufficient funds.'
      } else {
        return state.serverErrors.buy
      }
    }
  },
  actions: {
    cancelOrder (context, uuid) {
      return axios.get(`cancelorder?uuid=${uuid}`)
    },
    getAllHistory (context) {
      context.commit('startLoading')
      return axios.get(`orders`)
      .then(response => {
        context.commit('addAllHistory', response.data)
      })
      .catch(error => {
        context.commit('addServerErrorHistory', error.response.data)
        console.error('Failed to get the order history.', error)
      })
      .finally(() => {
        context.commit('stopLoading')
      })
    },
    getOpenOrders (context) {
      context.commit('startLoading')
      return axios.get(`orders?status=open`)
      .then(response => {
        context.commit('addAllOpen', response.data)
        return Promise.resolve(response)
      })
      .catch(error => {
        context.commit('addServerErrorOpen', error.response.data)
        console.error('Failed to get the open orders.', error)
        return Promise.reject(error)
      })
      .finally(() => {
        context.commit('stopLoading')
      })
    },
    createBuyOrder (context, formData) {
      return axios.post(`markets/buy`, formData)
    },
    createSellOrder (context, formData) {
      return axios.post(`markets/sell`, formData)
    }
  }
}
