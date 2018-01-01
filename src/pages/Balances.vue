<template>
  <div id="balance">
    <Listing :title="'My Balance'"></Listing>
  </div>
</template>

<script>
import Listing from '@/components/Listing'
import store from '../store'

export default {
  name: 'BalancesPage',
  components: {
    Listing
  },
  created () {
    console.log('created balances page')
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('balances/getAll')
    store.dispatch('orders/getAllHistory')
    store.dispatch('orders/getOpenOrders')
    store.dispatch('deposits/getAllHistory')
    store.dispatch('withdrawals/getAllHistory')
    next()
  }
}
</script>
