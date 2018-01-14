<template>
  <div id="home">
    <History v-if="isAuthorized"></History>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import History from '@/components/History'

export default {
  name: 'HomePage',
  components: {
    History
  },
  computed: {
    ...mapGetters({
      isAuthorized: 'auth/isAuthorized'
    })
  },
  created () {
    console.log('created homepage')

    if (this.isAuthorized) {
      this.$store.dispatch('orders/getAllHistory')
    }
  }
}
</script>
