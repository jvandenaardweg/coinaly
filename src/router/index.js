import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/Home'
import BalancesPage from '@/pages/Balances'
import OrdersPage from '@/pages/Orders'
import MarketsHomePage from '@/pages/markets/Home'
import MarketsCurrencyPage from '@/pages/markets/Currency'

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
      component: MarketsHomePage,
      children: [
        {
          path: ':currency/:keyword?',
          name: 'MarketsCurrency',
          component: MarketsCurrencyPage
        }
      ]
    }
  ],
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-active'
})
