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
        <td><small>Costs (BTC)</small>{{ order.Price }}</td>
      </tr>
      <tr>
        <td><small>Worth</small><!--{{ currentWorth(order.price, order.amount) }}--></td>
      </tr>
      <tr>
        <td><small>Delta</small>20%</td>
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
    readableOrderType () {
      if (this.order.OrderType === 'LIMIT_SELL') {
        return 'Sold'
      } else {
        return 'Bought'
      }
    }
  },
  methods: {
    currentWorth (price, amount) {
      // TODO: live update
      return price * amount
    },
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
  border-top: 1px #DFE1E3 solid;
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


}
</style>
