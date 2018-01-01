import Vue from 'vue'
import Router from 'vue-router'
import VueCookie from 'vue-cookie'

import HomePage from '@/pages/Home'
import BalancesPage from '@/pages/Balances'
import OrdersPage from '@/pages/Orders'
import MarketsPage from '@/pages/Markets'

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
      path: '/markets/:currency?',
      name: 'Markets',
      component: MarketsPage,
      props: {
        selectedTab: Vue.cookie.get('marketTab') || null
      }
    }
  ],
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-active'
})
