<template>
  <div class="orders">
    <header class="orders__header">
      <h2 class="orders__header-title">Open orders</h2>
      <div class="orders__header-control">
        <Button :label="'New order'" @click.native="showOrderModal()"></Button>
      </div>
    </header>
    <div class="orders__body">
      <Order v-if="openOrders" v-for="order in openOrders" :key="order.OrderUuid" :order="order"></Order>
      <div v-if="!openOrders.length" class="orders__empty">
        <p>No open orders found.</p>
      </div>
    </div>
  </div>
</template>

<script>
import Order from '@/components/Order'
import Button from '@/components/Button'

export default {
  name: 'Orders',
  components: {
    Order,
    Button
  },
  computed: {
    openOrders () {
      return this.$store.getters['orders/getOpenOrders']
    }
  },
  methods: {
    showOrderModal () {
      console.log('show')
      window.alert('This feature does not work yet, sorry!')
    }
  }
}
</script>

<style lang="scss" scoped>
.orders {
  text-align: left;
  margin-bottom: 15px;
  // border-bottom: 1px #DFE1E3 solid;

  .orders__body {
    padding: 0 15px 15px 15px;
  }

  .orders__empty {
    padding-top: 30px;
    font-size: 1.6rem;
    opacity: 0.5;
    font-weight: normal;
    text-align: center;
  }

  .orders__header {
    text-align: left;
    padding: 0 15px;
    display: flex;
    line-height: 4rem;
    margin-bottom: 10px;

    .orders__header-title {
      display: inline-block;
      margin: 0;
    }

    .orders__header-control {
      margin-left: auto;
    }
  }
}
</style>
