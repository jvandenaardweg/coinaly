<template>
  <div id="balance">
    <Balances :title="'My Balance'"></Balances>
  </div>
</template>

<script>
import Balances from '@/components/Balances'

export default {
  name: 'BalancesPage',
  components: {
    Balances
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
