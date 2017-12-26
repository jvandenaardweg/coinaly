import Vue from 'vue'
import Vuex from 'vuex'

import OrdersStore from './modules/orders'
import TickersStore from './modules/tickers'
import BalancesStore from './modules/balances'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    orders: OrdersStore,
    tickers: TickersStore,
    balances: BalancesStore
  }
})
