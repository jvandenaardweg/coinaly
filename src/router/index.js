import Vue from 'vue'
import Router from 'vue-router'
import VueCookie from 'vue-cookie'

import HomePage from '@/pages/Home'
import BalancesPage from '@/pages/Balances'
import OrdersPage from '@/pages/Orders'
import MarketsPage from '@/pages/Markets'
import MarketsCurrencyPage from '@/pages/MarketsCurrency'
import SetupPage from '@/pages/Setup'

Vue.use(VueCookie)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: HomePage,
      children: [
        {
          path: ':orderType?',
          name: 'MarketsCurrency',
          component: MarketsCurrencyPage
        }
      ]
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
      path: '/setup',
      name: 'Setup',
      component: SetupPage
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
