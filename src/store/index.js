import Vue from 'vue'
import Vuex from 'vuex'

import OrdersStore from './modules/orders'
import TickersStore from './modules/tickers'
import BalancesStore from './modules/balances'
import withdrawalsStore from './modules/withdrawals'
import depositsStore from './modules/deposits'
import marketsStore from './modules/markets'
import authStore from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    orders: OrdersStore,
    tickers: TickersStore,
    balances: BalancesStore,
    withdrawals: withdrawalsStore,
    deposits: depositsStore,
    markets: marketsStore,
    auth: authStore
  }
})
