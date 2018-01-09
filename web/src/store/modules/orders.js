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
      Vue.cookie.set('selectedOrderType', type, { expires: '99Y' })
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
