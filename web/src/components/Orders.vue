<template>
  <div class="orders">
    <header class="orders__header">
      <h2 class="orders__header-title">Open orders <span v-if="totalOpenOrders">({{ totalOpenOrders }})</span></h2>
      <div class="orders__header-control">
        <Button :label="'New order'" @click.native="showOrderModal()"></Button>
      </div>
    </header>
    <div class="orders__body">
      <div v-if="!showLoadingIndicator && hasOpenOrders" class="orders__legend">
        <div class="orders__legend-symbol">Market</div>
        <div class="orders__legend-amount">Amount</div>
        <div class="orders__legend-type">Type</div>
      </div>
      <Order v-if="hasOpenOrders" v-for="order in openOrders" :key="order.OrderUuid" :order="order"></Order>
      <ServerError v-if="openOrdersServerError" :message="openOrdersServerError.message"></ServerError>
      <div v-if="!hasOpenOrders && !showLoadingIndicator && !openOrdersServerError" class="orders__empty">
        <p>No open orders found.</p>
      </div>
      <div v-if="showLoadingIndicator" class="orders__empty">
        <p>Loading your orders...</p>
      </div>
    </div>
    <OrderModal :visible="showModal" :type="modalType" @close="showModal = false" :currency="'XRP'"></OrderModal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Order from '@/components/Order'
import Button from '@/components/Button'
import OrderModal from '@/components/OrderModal'
import ServerError from '@/components/ServerError'

export default {
  name: 'Orders',
  components: {
    Order,
    Button,
    OrderModal,
    ServerError
  },
  data () {
    return {
      showModal: false,
      modalType: 'buy',
      currency: null
    }
  },
  computed: {
    ...mapGetters({
      openOrdersServerError: 'orders/openOrdersServerError',
      isLoading: 'orders/isLoading',
      openOrders: 'orders/getOpenOrders'
    }),
    hasOpenOrders () {
      return this.openOrders.length
    },
    totalOpenOrders () {
      return this.openOrders.length
    },
    showLoadingIndicator () {
      return !this.openOrders.length && this.isLoading
    }
  },
  methods: {
    showOrderModal () {
      this.showModal = true
      // window.alert('This feature does not work yet, sorry!')
    }
  }
}
</script>

<style lang="scss" scoped>
.orders {
  text-align: left;
  margin-bottom: 15px;

  .orders__body {
    @include breakpoint(desktop) {
      padding: 0 15px;
    }
  }

  .orders__empty {
    font-size: 1.6rem;
    opacity: 0.5;
    font-weight: normal;
    text-align: center;
    padding: 15px;
  }

  .orders__header {
    text-align: left;
    padding: 0 15px;
    display: flex;
    line-height: 4rem;
    margin-bottom: 11px;

    .orders__header-title {
      display: inline-block;
      margin: 0;
    }

    .orders__header-control {
      margin-left: auto;
    }
  }

  .orders__legend {
    display: flex;
    width: 100%;
    padding: 6px 15px 10px 15px;
    font-weight: bold;

    .orders__legend-symbol {
      flex-basis: 90px;
      flex-shrink: 0;
    }

    .orders__legend-amount {
      flex-grow: 1;
      max-width: 100%;
      width: 100%;
    }

    .orders__legend-type {
      flex-basis: 70px;
      flex-shrink: 0;
      text-align: right;
      padding-right: 32px;
    }
  }
}
</style>
