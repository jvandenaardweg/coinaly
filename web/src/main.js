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

if (process.env.NODE_ENV === 'production' && process.env.SENTRY_URL) {
  Raven.config(process.env.SENTRY_URL).addPlugin(RavenVue, Vue).install()
}

sync(store, router)

Vue.use(VueCookie)

if (process.env.ANALYTICS_ID) {
  Vue.use(VueAnalytics, {
    id: process.env.ANALYTICS_ID,
    router
  })
}

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // Credits: https://router.vuejs.org/en/advanced/meta.html
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters['auth/isAuthorized']) {
      next({path: '/setup'})
    } else {
      next()
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
