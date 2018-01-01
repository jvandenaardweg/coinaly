<template>
  <div id="home">
    <Setup v-if="!isAuthorized"></Setup>
    <History v-if="isAuthorized"></History>
  </div>
</template>

<script>
import History from '@/components/History'
import Setup from '@/components/Setup'
import store from '../store'

export default {
  name: 'HomePage',
  components: {
    History,
    Setup
  },
  computed: {
    isAuthorized () {
      return this.$store.getters['auth/isAuthorized']
    }
  },
  created () {
    console.log('created homepage')
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('orders/getAllHistory')
    next()
  }
}
</script>


<style lang="scss" scoped>
//
</style>
