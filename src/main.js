// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueCookie from 'vue-cookie'
import VueAnalytics from 'vue-analytics'
import { sync } from 'vuex-router-sync'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

Raven.config('https://3b02901b7b0a418ca9d76303a9217881@sentry.io/265611').addPlugin(RavenVue, Vue).install()

sync(store, router)

Vue.use(VueCookie)

Vue.use(VueAnalytics, {
  id: 'UA-258356-37',
  router
})

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (store.getters['auth/isAuthorized']) {
    next()
  } else {
    if (to.name !== 'Home') {
      router.push({path: '/'})
    } else {
      next()
    }
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
