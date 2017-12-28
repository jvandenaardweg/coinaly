<template>
  <div class="history">
    <header class="history__header">
      <h2 class="history__header-title">Order history</h2>
      <div class="history__header-control">
        <Button :label="'New order'"></Button>
      </div>
    </header>
    <div class="history__body">
      <Order v-if="historyOrders" v-for="order in historyOrders" :key="order.OrderUuid" :order="order"></Order>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button'
import Order from '@/components/Order'

export default {
  name: 'History',
  components: {
    Button,
    Order
  },
  computed: {
    historyOrders () {
      return this.$store.getters['orders/getAllHistory']
    }
  }
}
</script>

<style lang="scss" scoped>
.history {
  text-align: left;
  margin-bottom: 15px;

  .history__body {
    padding: 0 15px 15px 15px;
  }

  .history__empty {
    padding-top: 30px;
    font-size: 1.6rem;
    opacity: 0.5;
    font-weight: normal;
    text-align: center;
  }

  .history__header {
    text-align: left;
    padding: 0 15px;
    display: flex;
    line-height: 4rem;
    margin-bottom: 10px;

    .history__header-title {
      display: inline-block;
      margin: 0;
    }

    .history__header-control {
      margin-left: auto;
    }
  }
}
</style>
