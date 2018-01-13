<template>
  <div class="history">
    <header class="history__header">
      <h2 class="history__header-title">Order activity <span v-if="historyOrdersTotal">({{ historyOrdersTotal }})</span></h2>
    </header>

    <Tabs :items="tabItems"></Tabs>

    <Search @searchQuery="handleSearch" :placeholder="'Search order history...'"></Search>

    <div class="history__body">

      <div v-if="!showLoadingIndicator && hasFilteredOrders" class="history__legend">
        <div class="history__legend-symbol">Market</div>
        <div class="history__legend-amount">Amount</div>
        <div class="history__legend-profit">Profit</div>
        <div class="history__legend-type">Type</div>
      </div>

      <Order v-if="historyOrders && isWithinPageLimit(index)" v-for="(order, index) in historyOrders" :key="order.id" :order="order"></Order>

      <ServerError v-if="orderHistoryServerError" :message="orderHistoryServerError.message"></ServerError>

      <div v-if="!hasFilteredOrders" class="history__empty">
        <p v-if="searchQuery">No orders found for "{{ searchQuery }}".</p>
      </div>
      <div v-if="showLoadingIndicator" class="history__empty">
        <p>Loading your order history...</p>
      </div>
    </div>
    <div class="history__footer">
      <Button :className="'link'" :label="'Show all history'" v-if="filteredHistoryOrdersTotal > paginationLimit" @click.native="showAllHistory()"></Button>
      <p v-if="!showLoadingIndicator">Due to Bittrex limitations, we can only show the order history up to 30 days in the past.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Button from '@/components/Button'
import Order from '@/components/Order'
import Tabs from '@/components/Tabs'
import Search from '@/components/Search'
import ServerError from '@/components/ServerError'

export default {
  name: 'History',
  components: {
    Button,
    Order,
    Tabs,
    Search,
    ServerError
  },
  data () {
    return {
      orderBy: 'dateDesc',
      paginationLimit: 15,
      ordersIndex: 0,
      searchQuery: null,
      tabItems: [
        {
          link: '/home',
          storeName: 'orders',
          storeType: null,
          label: 'All'
        },
        {
          link: '/home/buys',
          storeName: 'orders',
          storeType: 'buys',
          label: 'Buys'
        },
        {
          link: '/home/sells',
          storeName: 'orders',
          storeType: 'sells',
          label: 'Sells'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      orderHistoryServerError: 'orders/orderHistoryServerError',
      allHistory: 'orders/getAllHistory',
      allBuyOrders: 'orders/getAllBuyHistory',
      allSellOrders: 'orders/getAllSellHistory',
      isLoading: 'orders/isLoading',
      selectedExchanges: 'exchanges/selectedExchanges'
    }),
    showLoadingIndicator () {
      return !this.hasFilteredOrders && this.isLoading && !this.searchQuery
    },
    hasFilteredOrders () {
      return this.historyOrders.length
    },
    searchQueryInLowerCase () {
      return (this.searchQuery ? this.searchQuery.toLowerCase().trim() : null)
    },
    historyOrders () {
      let orderHistory
      const orderType = this.$route.params.orderType

      if (orderType === 'buys') {
        orderHistory = this.allBuyOrders
      } else if (orderType === 'sells') {
        orderHistory = this.allSellOrders
      } else {
        orderHistory = this.allHistory
      }

      if (this.searchQueryInLowerCase) {
        return orderHistory.filter(order => {
          return order.symbol.toLowerCase().includes(this.searchQueryInLowerCase)
        })
      } else {
        return orderHistory
      }
    },
    filteredHistoryOrdersTotal () {
      return this.historyOrders.length
    },
    historyOrdersTotal () {
      return this.allHistory.length
    }
  },
  methods: {
    handleSearch (searchQuery) {
      this.searchQuery = searchQuery
    },
    isWithinPageLimit (index) {
      this.ordersIndex = index
      if (index < this.paginationLimit) {
        return true
      } else {
        return false
      }
    },
    showAllHistory () {
      this.paginationLimit = 9999
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

  .history__footer {
    text-align: center;
    padding: 0 30px 15px 30px;

    p {
      opacity: 0.5;
    }
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
