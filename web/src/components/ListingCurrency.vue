<template>
  <div class="listing-currency" :class="{ 'is-expanded': isExpanded }">
    <div class="listing-currency__header" @click.prevent="toggleExpand()">
      <div class="listing-currency__symbol"><strong>{{ currencyName }}</strong></div>
      <div class="listing-currency__meta">{{ currency.total }}</div>
      <div class="listing-currency__percentage"><span v-if="allMarkets">{{ currentWorthUsd(currencyName) }}</span></div>
    </div>
    <div class="listing-currency__stats">
      <Progress :blue="stats.first" :orange="stats.second" :green="0"></Progress>
      <div v-if="isExpanded" class="listing-currency__legenda">
        <ul>
          <li><span>Available:</span> <p>{{ currency.free }}</p></li>
          <li><span>In open orders:</span> <p>{{ difference }}</p></li>
          <!-- Sold: {{ totalSell(currency.Currency) }}, Bought: {{ totalBuy(currency.Currency) }}, Diff: {{ buySellDifference(currency.Currency) }}, Withdrawl: {{ totalWithdrawalByCurrency(currency.Currency)}}, Deposit: {{ totalDepositByCurrency(currency.Currency)}} -->
        </ul>
      </div>
    </div>
    <div v-if="isExpanded" class="listing-currency__body">
      <!-- <div v-if="currency.Balance < buySellDifference(currency.Currency)">
        <p>{{ buySellDifference(currency.Currency) }} {{ currency.Currency }} is transfered from Bittrex to something else.</p>
      </div> -->
      <div class="listing-currency__controls">
        <ButtonIcon :icon="'chart'" @click.native="openChart = true"></ButtonIcon>
        <Button :label="'Sell'" :className="'danger'" @click.native="handleClick('sell')" :disabled="!currency.free"></Button>
        <Button :label="'Buy'" @click.native="handleClick('buy')"></Button>
      </div>
      <div class="listing-currency__history">
          <Button v-if="totalOrderHistory(currencyName)" :className="'link'" :label="`View history (${totalOrderHistory(currencyName)})`" @click.native="toggleShowOrderHistory()"></Button>
          <OrderTable v-if="showOrderHistory && orderHistoryByCurrency" v-for="(order, index) in orderHistoryByCurrency(currencyName)" :key="index" :order="order"></OrderTable>
        </div>
    </div>
    <Modal :visible="showModal" :type="modalType" @close="showModal = false" :currency="currency"></Modal>
    <ChartOverlay v-if="openChart" @close="openChart = false" :exchange="'BITTREX'" :currencyPair="currencyPair"></ChartOverlay>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Button from '@/components/Button'
import ButtonIcon from '@/components/ButtonIcon'
import OrderTable from '@/components/OrderTable'
import Modal from '@/components/Modal'
import Progress from '@/components/Progress'
import ChartOverlay from '@/components/ChartOverlay'

export default {
  name: 'Listing',
  props: ['currency', 'currencyName'],
  components: {
    Button,
    ButtonIcon,
    OrderTable,
    Modal,
    Progress,
    ChartOverlay
  },
  data () {
    return {
      isExpanded: false,
      modalType: null,
      showModal: false,
      showOrderHistory: false,
      openChart: false
    }
  },
  computed: {
    ...mapGetters({
      allMarkets: 'markets/allMarkets',
      allWorth: 'balances/allWorth'
    }),
    currencyPair () {
      const currency = this.currencyName
      if (currency === 'BTC') {
        return 'BTC'
      } else {
        return `${currency}BTC`
      }
    },
    stats () {
      const balance = this.currency.total // Total (excluding open orders)
      const available = this.currency.free // Available (minus open orders)
      const difference = (balance - available)
      const availablePercentage = Math.ceil((available / balance) * 100)
      const differencePercentage = Math.ceil((difference / balance) * 100)

      return {
        first: availablePercentage || 0,
        second: differencePercentage || 0
      }
    },
    difference () {
      const difference = (this.currency.total - this.currency.free)

      if (difference === 0) {
        return 0
      } else {
        return difference.toFixed(8)
      }
    },
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
      this.modalType = type
      this.showModal = true
    },
    orderHistoryByCurrency (currency) {
      const orderHistory = this.$store.getters['orders/getAllHistory']
      return orderHistory.filter(order => {
        return order.symbol === `${currency}/BTC` // TODO: market (BTC) can be different, make dynamic
      })
    },
    depositHistoryByCurrency (currency) {
      const orderHistory = this.$store.getters['deposits/getAllHistory']
      return orderHistory.filter(order => {
        return this.currencyName === currency
      })
    },
    withdrawalHistoryByCurrency (currency) {
      const orderHistory = this.$store.getters['withdrawals/getAllHistory']
      return orderHistory.filter(order => {
        return this.currencyName === currency
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
        return order.symbol === `${currency}/BTC` // TODO: market (BTC) can be different, make dynamic
      })

      const soldAmount = totalByCurrency.map(order => {
        return order.amount
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
        return order.symbol === `${currency}/BTC` // TODO: market (BTC) can be different, make dynamic
      })

      const buyAmount = totalByCurrency.map(order => {
        return order.amount
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
    currentWorthUsd (currency) {
      if (this.allWorth[currency]) {
        return `$${this.allWorth[currency].usd}`
      } else {
        return null
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
  background-color: $color-white;
  border-radius: 3px;
  border: 1px $color-iron solid;

  &.is-expanded {
    .listing-currency__header {
      &:after {
        transform: rotate(-180deg);
      }
    }
  }

  .listing-currency__header {
    display: flex;
    position: relative;
    padding: 15px 45px 15px 15px;
    height: 50px;
    cursor: pointer;

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
    margin-top: -6px;
  }

  .listing-currency__history {
    text-align: center;
    border-top: 1px $color-iron solid;
    padding-top: 5px;
  }

  .listing-currency__legenda {
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
            color: $color-azure-radiance;
          }
        }
        &:nth-child(2) {
          p {
            color: $color-cream-can;
          }
        }
      }
    }
  }

  .listing-currency__symbol {
    width: 60px;
    text-align: left;
  }

  .listing-currency__meta {
    opacity: 0.5;
    padding-right: 5px;
  }

  .listing-currency__percentage {
    align-self: right;
    margin-left: auto;
    opacity: 0.5;
  }

  .listing-currency__body {
    text-align: left;
    padding: 0 15px 12px 15px;
  }

  .listing-currency__controls {
    text-align: right;
    padding: 0 0 15px 0;
    display: flex;
    flex-direction: row;
   justify-content: flex-end;

    .button {
      margin-left: 5px;
    }
  }

}
</style>
