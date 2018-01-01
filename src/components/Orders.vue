<template>
  <div class="orders">
    <header class="orders__header">
      <h2 class="orders__header-title">Open orders</h2>
      <div class="orders__header-control">
        <Button :label="'New order'" @click.native="showOrderModal()"></Button>
      </div>
    </header>
    <div class="orders__body">
      <Order v-if="hasOpenOrders" v-for="order in openOrders" :key="order.OrderUuid" :order="order"></Order>
      <div v-if="!hasOpenOrders && !showLoadingIndicator" class="orders__empty">
        <p>No open orders found.</p>
      </div>
      <div v-if="showLoadingIndicator" class="orders__empty">
        <p>Loading your orders...</p>
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
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  computed: {
    isLoading () {
      return this.$store.getters['orders/isLoading']
    },
    hasOpenOrders () {
      return this.openOrders.length
    },
    openOrders () {
      return this.$store.getters['orders/getOpenOrders']
    },
    showLoadingIndicator () {
      return !this.openOrders.length && this.isLoading
    }
  },
  methods: {
    showOrderModal () {
      window.alert('This feature does not work yet, sorry!')
    },
    fetchData () {
      console.log('fetch data')
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
