import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/Home'
import BalancesPage from '@/pages/Balances'
import OrdersPage from '@/pages/Orders'
import HistoryPage from '@/pages/History'

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
      path: '/history',
      name: 'History',
      component: HistoryPage
    }
  ],
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-active'
})
