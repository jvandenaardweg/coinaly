<template>
  <table class="order-table">
    <thead>
      <tr>
        <th>{{ readableOrderType }} ({{ order.Quantity }}) <span>at {{ readableDate(order.Closed) }}</span></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><small>Amount</small>{{ order.Quantity }}</td>
      </tr>
      <tr>
        <td><small>Price (BTC)</small>{{ order.PricePerUnit }}</td>
      </tr>
      <tr>
        <td><small>Pair</small>{{ order.Exchange }}</td>
      </tr>
      <tr>
        <td v-if="isBuy"><small>Costs (BTC)</small>{{ order.Price }}</td>
        <td v-if="isSell"><small>Proceeds (BTC)</small>{{ order.Price }}</td>
      </tr>
      <tr>
        <td v-if="isBuy"><small>Worth</small>{{ currentWorth }}</td>
      </tr>
      <tr>
        <td v-if="isBuy"><small>Delta</small><span :class="{'is-positive': deltaPositive, 'is-negative': !deltaPositive}">{{ delta }}%</span></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
const moment = require('moment')

export default {
  name: 'OrderTable',
  props: ['order'],
  computed: {
    isBuy () {
      return this.order.OrderType === 'LIMIT_BUY'
    },
    isSell () {
      return this.order.OrderType === 'LIMIT_SELL'
    },
    readableOrderType () {
      if (this.order.OrderType === 'LIMIT_SELL') {
        return 'Sold'
      } else {
        return 'Bought'
      }
    },
    currentWorth () {
      if (this.isBuy) {
        let currentWorth = null
        const markets = this.$store.getters['markets/allMarkets']
        const currentMarket = markets.filter(market => {
          return market.MarketName === this.order.Exchange // TODO: make BTC dynamic, can be something else
        })

        if (currentMarket.length) {
          const lastPricePerUnit = currentMarket[0].Last
          currentWorth = (lastPricePerUnit * this.order.Quantity).toFixed(8)
        }

        return currentWorth
      } else {
        return '-'
      }
    },
    deltaPositive () {
      if (this.delta > 0) {
        return true
      } else {
        return false
      }
    },
    delta () {
      if (this.isBuy) {
        const percentage = ((this.currentWorth - this.order.Price) / this.order.Price * 100).toFixed(2)
        return percentage
      } else {
        return '-'
      }
    }
  },
  methods: {
    readableDate (date) {
      return moment(date).format('DD-MM-YYYY HH:mm:ss')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.order-table {
  text-align: left;
  width: 100%;
  margin-top: 15px;
  border-top: 1px $color-iron solid;
  padding-top: 10px;

  small {
    font-size: 1.2rem;
    opacity: 0.5;
    display: block;
  }

  tbody {
    tr {
      width: 33.333333%;
      float: left;
    }
  }

  .is-negative {
    color: red
  }

  .is-positive {
    color: $color-mountain-meadow;
  }
}
</style>
