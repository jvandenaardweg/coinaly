<template>
  <div id="home">
    <History v-if="isAuthorized"></History>
  </div>
</template>

<script>
import History from '@/components/History'

export default {
  name: 'HomePage',
  components: {
    History
  },
  computed: {
    isAuthorized () {
      return this.$store.getters['auth/isAuthorized']
    }
  },
  created () {
    console.log('created homepage')

    if (this.isAuthorized) {
      this.$store.dispatch('orders/getAllHistory')
    }
  },
  beforeRouteUpdate (to, from, next) {
    console.log('hier', to)
    next()
  }
}
</script>
