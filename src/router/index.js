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
      redirect: '/home',
      meta: { requiresAuth: true }
    },
    {
      path: '/home/:orderType?',
      name: 'Home',
      component: HomePage,
      meta: { requiresAuth: true }
    },
    {
      path: '/balances',
      name: 'Balances',
      component: BalancesPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/orders',
      name: 'Orders',
      component: OrdersPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/setup',
      name: 'Setup',
      component: SetupPage,
      meta: { requiresAuth: false }
    },
    {
      path: '/markets',
      name: 'Markets',
      component: MarketsPage,
      meta: { requiresAuth: true },
      children: [
        {
          path: ':currency?',
          name: 'MarketsCurrency',
          component: MarketsCurrencyPage,
          meta: { requiresAuth: true }
        }
      ]
    }
  ],
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-active'
})
