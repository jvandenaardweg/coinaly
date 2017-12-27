// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueCookie from 'vue-cookie'

Vue.use(VueCookie)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.name === 'Balances' || to.name === 'Orders' || to.name === 'History') {
    if (Vue.cookie.get('access')) {
      next()
    } else {
      window.alert('You dont have access.')
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
