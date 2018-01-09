<template>
  <div id="balance">
    <Listing :title="'My Balance'"></Listing>
  </div>
</template>

<script>
import Listing from '@/components/Listing'

export default {
  name: 'BalancesPage',
  components: {
    Listing
  },
  created () {
    console.log('created balances page')
    this.$store.dispatch('balances/getAll')
    this.$store.dispatch('orders/getAllHistory')
    this.$store.dispatch('orders/getOpenOrders')
    this.$store.dispatch('deposits/getAllHistory')
    this.$store.dispatch('withdrawals/getAllHistory')
  }
}
</script>
