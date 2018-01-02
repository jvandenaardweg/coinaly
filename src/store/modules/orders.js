import axios from '../../axios'
import Vue from 'vue'
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

const initialSelectedOrderType = Vue.cookie.get('selectedOrderType') || null

export default {
  namespaced: true,
  state: {
    history: [],
    open: [],
    isLoading: false,
    selectedOrderType: initialSelectedOrderType
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
      Vue.cookie.set('selectedOrderType', type)
      state.selectedOrderType = type
    },
    removeSelectedOrderType (state, type) {
      Vue.cookie.delete('selectedOrderType')
      state.selectedOrderType = null
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
          return order.OrderType === 'LIMIT_BUY'
        })
      } else {
        return state.history
      }
    },
    getAllSellHistory: state => {
      if (state.history.length) {
        return state.history.filter(order => {
          return order.OrderType === 'LIMIT_SELL'
        })
      } else {
        return state.history
      }
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
