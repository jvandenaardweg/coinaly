<template>
  <div id="orders">
    <Orders></Orders>
  </div>
</template>

<script>
import Orders from '@/components/Orders'
import store from '../store'
export default {
  name: 'OrdersPage',
  components: {
    Orders
  },
  created () {
    console.log('created orderspage')
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('orders/getOpenOrders')
    next()
  }
}
</script>
