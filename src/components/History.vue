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
    },
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
}
</style>
