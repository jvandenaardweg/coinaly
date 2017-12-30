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
  // if (to.name !== 'Home') {
  if (store.getters['auth/isAuthorized']) {
    next()
  } else {
    if (to.name !== 'Home') {
      router.push({path: '/'})
      console.log('you should auth first')
    } else {
      next()
    }
    // console.log(to.name, from.name)
    // if (to.name !== 'Home') {
    //   // window.alert('You dont have access. Please set your API credentials first at the homepage.')
    //   router.push('Home')
    // }
    // next()
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
