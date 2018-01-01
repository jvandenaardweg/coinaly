<template>
  <div class="history">
    <header class="history__header">
      <h2 class="history__header-title">Order activity</h2>
      <div class="history__header-control">
        <!-- <Button :label="'New order'"></Button> -->
        <!-- <div>
          <label>Order by</label>
          <select v-model="orderBy">
            <option disabled value="">Order by...</option>
            <option value="dateDesc">Date</option>
            <option value="currencyDesc">Currency</option>
          </select>
        </div> -->

      </div>
    </header>
    <div class="history__body">
      <div class="history__legend">
        <div class="history__legend-symbol">Market</div>
        <div class="history__legend-amount">Amount</div>
        <div class="history__legend-profit">Profit</div>
        <div class="history__legend-type">Type</div>
      </div>

      <Order v-if="historyOrders" v-for="order in historyOrders" :key="order.OrderUuid" :order="order"></Order>
      <div v-if="showLoadingIndicator" class="history__empty">
        <p>Loading your order history...</p>
      </div>
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
  data () {
    return {
      orderBy: 'dateDesc'
    }
  },
  computed: {
    historyOrders () {
      return this.$store.getters['orders/getAllHistory']
    },
    isLoading () {
      return this.$store.getters['orders/isLoading']
    },
    showLoadingIndicator () {
      return !this.historyOrders.length && this.isLoading
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

  .history__empty {
    padding-top: 15px;
    font-size: 1.6rem;
    opacity: 0.5;
    font-weight: normal;
    text-align: center;
  }

  .history__legend {
    display: flex;
    width: 100%;
    padding: 10px 15px;
    font-weight: bold;

    .history__legend-symbol {
      flex-basis: 90px;
      flex-shrink: 0;
    }

    .history__legend-amount {
      flex-grow: 1;
      max-width: 100%;
      width: 100%;
    }

    .history__legend-profit {
      flex-basis: 70px;
      flex-shrink: 0;
      text-align: right;
      padding-right: 10px;
    }

    .history__legend-type {
      flex-basis: 75px;
      flex-shrink: 0;
      text-align: left;
      padding-right: 35px;
    }
  }
}
</style>
