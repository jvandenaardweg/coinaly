<template>
  <div class="listing-currency" :class="{ 'is-expanded': isExpanded }">
    <div class="listing-currency__header" @click.prevent="toggleExpand()">
      <div class="listing-currency__symbol"><strong>{{ currency.Currency }}</strong></div>
      <div class="listing-currency__meta">{{ currency.Available }} ({{ currentWorth(currency.Available, currency.Currency) }}) <!--({{ currency.fiat.price | currency(currency.fiat.prefix) }})--></div>
      <div class="listing-currency__percentage" :class="percentageClass"><!--{{ currency.percentage | percentage }}--></div>
    </div>
    <div class="listing-currency__stats">
      <Progress :blue="stats.first" :orange="stats.second" :green="0"></Progress>
      <div class="listing-currency__legenda">
        <ul>
          <li><span>Available:</span> <p>{{ currency.Available }}</p></li>
          <li><span>In open orders:</span> <p>{{ difference }}</p></li>
          <!-- Sold: {{ totalSell(currency.Currency) }}, Bought: {{ totalBuy(currency.Currency) }}, Diff: {{ buySellDifference(currency.Currency) }}, Withdrawl: {{ totalWithdrawalByCurrency(currency.Currency)}}, Deposit: {{ totalDepositByCurrency(currency.Currency)}} -->
        </ul>
      </div>
    </div>
    <div class="listing-currency__body">
      <div v-if="currency.Balance < buySellDifference(currency.Currency)">
        <p>{{ buySellDifference(currency.Currency) }} {{ currency.Currency }} is transfered from Bittrex to something else.</p>
      </div>
      <div class="listing-currency__controls">
        <Button v-if="totalOrderHistory(currency.Currency)" :type="'outlined'" :label="`History (${totalOrderHistory(currency.Currency)})`" @click.native="toggleShowOrderHistory()"></Button>
        <Button :label="'Sell'" :type="'danger'" @click.native="handleClick('sell')" :disabled="!currency.Available"></Button>
        <Button :label="'Buy'" @click.native="handleClick('buy')"></Button>
        <OrderTable v-if="showOrderHistory && orderHistoryByCurrency" v-for="(order, index) in orderHistoryByCurrency(currency.Currency)" :key="index" :order="order"></OrderTable>
      </div>
    </div>
    <Modal :visible="showModal" :type="modalType" @close="showModal = false" :currency="currency"></Modal>
  </div>
</template>

<script>
import Button from '@/components/Button'
import OrderTable from '@/components/OrderTable'
import Modal from '@/components/Modal'
import Progress from '@/components/Progress'

export default {
  name: 'Listing',
  props: ['currency'],
  components: {
    Button,
    OrderTable,
    Modal,
    Progress
  },
  data () {
    return {
      isExpanded: false,
      modalType: null,
      showModal: false,
      showOrderHistory: false
    }
  },
  computed: {
    stats () {
      const balance = this.currency.Balance // Total (excluding open orders)
      const available = this.currency.Available // Available (minus open orders)
      const difference = (balance - available)
      const availablePercentage = Math.ceil((available / balance) * 100)
      const differencePercentage = Math.ceil((difference / balance) * 100)

      return {
        first: availablePercentage || 0,
        second: differencePercentage || 0
      }
    },
    difference () {
      const difference = (this.currency.Balance - this.currency.Available)

      if (difference === 0) {
        return 0
      } else {
        return difference.toFixed(8)
      }
    },
    // openOrdersAmount () {
    //   let total = 0
    //   const openOrders = this.$store.getters['orders/getOpenOrders']

    //   const openOrdersForCurrency = openOrders.filter(order => {
    //     return order.Exchange === `BTC-${this.currency.Currency}` // TODO: make dynamic, BTC can be something different
    //   })
    //   console.log(openOrdersForCurrency)

    //   const amounts = openOrdersForCurrency.map(order => {
    //     return order.Quantity * order.Limit
    //   })

    //   if (amounts.length) {
    //     total = amounts.reduce((prev, curr) => {
    //       return prev + curr
    //     })
    //   }

    //   return total
    // },
    // openOrdersTotal () {
    //   const openOrders = this.$store.getters['orders/getOpenOrders']
    //   const openOrdersForCurrency = openOrders.filter(order => {
    //     return order.Exchange === 'BTC-XRP' // TODO: make dynamic, BTC can be something different
    //   })

    //   return openOrdersForCurrency.length
    // },
    percentageClass () {
      if (this.currency.percentage < 0) {
        return 'is-negative'
      } else if (this.currency.percentage < 5) {
        return 'is-warning'
      } else {
        return 'is-positive'
      }
    }
  },
  methods: {
    totalOrderHistory (currency) {
      return this.orderHistoryByCurrency(currency).length
    },
    toggleExpand () {
      this.isExpanded = !this.isExpanded
    },
    handleClick (type) {
      console.log(type)
      this.modalType = type
      this.showModal = true
    },
    orderHistoryByCurrency (currency) {
      const orderHistory = this.$store.getters['orders/getAllHistory']
      return orderHistory.filter(order => {
        return order.Exchange === `BTC-${currency}` // TODO: market (BTC) can be different, make dynamic
      })
    },
    depositHistoryByCurrency (currency) {
      const orderHistory = this.$store.getters['deposits/getAllHistory']
      return orderHistory.filter(order => {
        return order.Currency === currency
      })
    },
    withdrawalHistoryByCurrency (currency) {
      const orderHistory = this.$store.getters['withdrawals/getAllHistory']
      return orderHistory.filter(order => {
        return order.Currency === currency
      })
    },
    totalWithdrawalByCurrency (currency) {
      let total = 0
      const withdrawalHistory = this.withdrawalHistoryByCurrency(currency)

      const amounts = withdrawalHistory.map(withdrawal => {
        return withdrawal.Amount
      })

      if (amounts.length) {
        total = amounts.reduce((prev, curr) => {
          return prev + curr
        })
      }

      return total
    },
    totalDepositByCurrency (currency) {
      let total = 0
      const depositHistory = this.depositHistoryByCurrency(currency)

      const amounts = depositHistory.map(deposit => {
        return deposit.Amount
      })

      if (amounts.length) {
        total = amounts.reduce((prev, curr) => {
          return prev + curr
        })
      }

      return total
    },
    totalSell (currency) {
      let amount = 0
      const orderHistory = this.$store.getters['orders/getAllSellHistory']

      const totalByCurrency = orderHistory.filter(order => {
        return order.Exchange === `BTC-${currency}` // TODO: market (BTC) can be different, make dynamic
      })

      const soldAmount = totalByCurrency.map(order => {
        return order.Quantity
      })

      if (soldAmount.length) {
        amount = soldAmount.reduce((prev, curr) => {
          return prev + curr
        })
      }

      return amount
    },
    totalBuy (currency) {
      let amount = 0
      const orderHistory = this.$store.getters['orders/getAllBuyHistory']
      const totalByCurrency = orderHistory.filter(order => {
        return order.Exchange === `BTC-${currency}` // TODO: market (BTC) can be different, make dynamic
      })

      const buyAmount = totalByCurrency.map(order => {
        return order.Quantity
      })

      if (buyAmount.length) {
        amount = buyAmount.reduce((prev, curr) => {
          return prev + curr
        })
      }

      return amount
    },
    buySellDifference (currency) {
      return this.totalBuy(currency) - this.totalSell(currency)
    },
    toggleShowOrderHistory () {
      this.showOrderHistory = !this.showOrderHistory
    },
    currentWorth (amount, currency) {
      let worth = 0
      let worthBtc = 0
      let worthUsd = 0
      const markets = this.$store.getters['markets/allMarkets']
      const currencyMarket = markets.filter(market => {
        return market.MarketName === `BTC-${currency}` // TODO: make dynamic, BTC can be something else
      })
      const usdMarket = markets.filter(market => {
        return market.MarketName === `USDT-BTC` // TODO: make dynamic, BTC can be something else
      })

      if (currency === 'BTC') {
        const worth = (amount * usdMarket[0].Last).toFixed(2)
        return `$${worth}`
      } else {
        if (currencyMarket[0] && usdMarket[0]) {
          worthBtc = amount * currencyMarket[0].Last
          worthUsd = (worthBtc * usdMarket[0].Last).toFixed(2)
          return `$${worthUsd}`
        } else {
          return worth
        }
      }
    }
  },
  filters: {
    percentage (value) {
      return value + '%'
    },
    currency (value, prefix) {
      return prefix + value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.listing-currency {
  background-color: #fff;
  border-radius: 3px;
  border: 1px #DFE1E3 solid;

  &.is-expanded {
    .listing-currency__body {
      display: block;
    }
    .listing-currency__header {
      &:after {
        transform: rotate(-180deg);
      }
    }

    .listing-currency__legenda {
      display: block;
    }
  }

  .listing-currency__header {
    display: flex;
    position: relative;
    padding: 15px 45px 10px 15px;

    &:after {
      content: "";
      height: 50px;
      width: 50px;
      background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M225.813 48.907L128 146.72 30.187 48.907 0 79.093l128 128 128-128z"/></svg>');
      position: absolute;
      right: -2px;
      top: 0;
      bottom: 0;
      background-size: 25%;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }

  .listing-currency__stats {
    padding: 0 15px 15px 15px;
  }

  .listing-currency__legenda {
    display: none;
    font-size: 1.1rem;
    padding-top: 10px;

    ul {
      margin: 0;
      list-style: none;
      padding: 0;
      display: flex;

      li {
        margin-right: 10px;

        span {
          opacity: 0.5;
        }

        p {
          margin: 0;
          display: inline-block;
        }

        &:first-child {
          p {
            color: #0077FF;
          }
        }
        &:nth-child(2) {
          p {
            color: #F4BC5F;
          }
        }
      }
    }
  }

  .listing-currency__symbol {
    width: 80px;
    text-align: left;
  }

  .listing-currency__meta {
    opacity: 0.5;
    padding-right: 5px;
  }

  .listing-currency__percentage {
    align-self: right;
    margin-left: auto;

    &.is-negative {
      color: #DC3A4E;
    }

    &.is-positive {
      color: #9DD532;
    }

    &.is-warning {
      color: #F4BC5F;
    }
  }

  .listing-currency__body {
    display: none;
    text-align: left;
    padding: 0 15px 12px 15px;

    > div {
      border-top: 1px #DFE1E3 solid;
      padding: 12px 0 0 0;
    }
  }

  .listing-currency__controls {
    text-align: right;
  }

}
</style>
