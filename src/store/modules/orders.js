import axios from '../../axios'

export default {
  namespaced: true,
  state: {
    history: [],
    open: [],
    isLoading: false
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
    }
  },
  getters: {
    getOpenOrders: state => {
      return state.open
    },
    getAllHistory: state => {
      return state.history
    },
    getAllBuyHistory: state => {
      return state.history.filter(order => {
        return order.OrderType === 'LIMIT_BUY'
      })
    },
    getAllSellHistory: state => {
      return state.history.filter(order => {
        return order.OrderType === 'LIMIT_SELL'
      })
    },
    isLoading: state => {
      return state.isLoading
    }
  },
  actions: {
    cancelOrder (context, uuid) {
      return axios.get(`api/market/cancel?uuid=${uuid}`)
    },
    getAllHistory (context) {
      context.commit('startLoading')
      return axios.get(`api/orderhistory`)
      .then(response => {
        context.commit('addAllHistory', response.data)
      })
      .catch(error => {
        console.error('Failed to get the order history.', error)
      })
      .finally(() => {
        context.commit('stopLoading')
      })
    },
    getOpenOrders (context) {
      context.commit('startLoading')
      return axios.get(`api/openorders`)
      .then(response => {
        context.commit('addAllOpen', response.data)
      })
      .catch(error => {
        console.error('Failed to get the open orders.', error)
      })
      .finally(() => {
        context.commit('stopLoading')
      })
    }
  }
}
