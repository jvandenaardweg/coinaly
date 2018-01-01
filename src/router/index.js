import Vue from 'vue'
import Router from 'vue-router'
import VueCookie from 'vue-cookie'

import HomePage from '@/pages/Home'
import BalancesPage from '@/pages/Balances'
import OrdersPage from '@/pages/Orders'
import MarketsPage from '@/pages/Markets'
import MarketsCurrencyPage from '@/pages/MarketsCurrency'

Vue.use(VueCookie)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/balances',
      name: 'Balances',
      component: BalancesPage
    },
    {
      path: '/orders',
      name: 'Orders',
      component: OrdersPage
    },
    {
      path: '/markets',
      name: 'Markets',
      component: MarketsPage,
      children: [
        {
          path: ':currency?',
          name: 'MarketsCurrency',
          component: MarketsCurrencyPage
        }
      ]
    }
  ],
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-active'
})
