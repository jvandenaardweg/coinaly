<template>
  <div class="balances">
    <header class="balances__header">
      <h2 class="balances__header-title">{{ title }} <span v-if="totalWorthUsd !== null" :class="{'is-positive': totalWorthChangeIsPositive === true, 'is-negative': totalWorthChangeIsPositive === false }">{{ totalWorthUsd | currency('$') }}</span></h2>
      <div class="balances__header-control">
        <Button :className="'link'" @click.native="toggleShowAll()" :label="showAllLabel"></Button>
      </div>
    </header>
    <div class="balances__body">
      <div v-if="!showLoadingIndicator" class="balances__legend">
        <div class="balances__legend-symbol">Coin</div>
        <div class="balances__legend-amount">Amount</div>
        <div class="balances__legend-worth">Worth</div>
      </div>
      <Balance v-for="(currency, key, index) in currencies" :key="key" :currency="currency" :currencyName="key" :index="index"></Balance>
      <div v-if="showLoadingIndicator" class="balances__empty">
        <p>Loading your balances...</p>
      </div>
    </div>
  </div>
</template>

<script>
import numeral from 'numeral'
import { mapGetters } from 'vuex'

import Balance from '@/components/Balance'
import Button from '@/components/Button'

export default {
  name: 'Balances',
  props: ['title'],
  components: {
    Balance,
    Button
  },
  data () {
    return {
      totalWorthChangeIsPositive: null,
      showAll: false
    }
  },
  created () {
    // Listen for market changes, recalculate the current worth of our whole balance
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'markets/addAllMarkets') {
        const filledCurrencies = Object.entries(this.allFilledCurrencies)
        let payload = {}

        for (const [currencyName, obj] of filledCurrencies) {
          payload[currencyName] = {
            usd: this.currentUsdWorth(obj.total, currencyName),
            btc: this.currentBtcWorth(obj.total, currencyName)
          }
        }

        this.$store.commit('balances/setWorth', payload)
      }
    })
  },
  computed: {
    ...mapGetters({
      allCurrencies: 'balances/allCurrencies',
      allFilledCurrencies: 'balances/allFilledCurrencies',
      allCurrenciesTotal: 'balances/allCurrenciesTotal',
      allFilledCurrenciesTotal: 'balances/allFilledCurrenciesTotal',
      allMarkets: 'markets/allMarkets',
      totalWorthUsd: 'balances/totalWorthUsd',
      balancesIsLoading: 'balances/isLoading',
      ordersIsLoading: 'orders/isLoading'
    }),
    isLoading () {
      return this.balancesIsLoading || this.ordersIsLoading
    },
    showLoadingIndicator () {
      return !this.allCurrenciesTotal && this.isLoading
    },
    currencies () {
      if (this.showAll) {
        return this.allCurrencies
      } else {
        return this.allFilledCurrencies
      }
    },
    showAllLabel () {
      if (!this.showAll) {
        return `Show all (${this.allCurrenciesTotal})`
      } else {
        return 'Hide 0 balances'
      }
    }
  },
  methods: {
    toggleShowAll () {
      if (this.showAll) {
        this.showAll = false
        this.currencies = this.allFilledCurrencies
      } else {
        this.currencies = this.allCurrencies
        this.showAll = true
      }
    },
    currentUsdWorth (amount, currency) {
      let worthBtc = 0
      let worthUsd = 0

      // Check if the markets are already in the store, because we load them async
      if (this.allMarkets.length) {
        // Get market date for selected currency

        // TODO: optimize performance, this is slow
        const currencyMarket = this.allMarkets.filter(market => {
          return market.symbol === `${currency}/BTC` // TODO: make dynamic, BTC can be something else
        })[0]

        // Get the USD market data for BTC
        // TODO: optimize performance, this is slow
        const usdMarket = this.allMarkets.filter(market => {
          return market.symbol === `BTC/USDT` // TODO: make dynamic, BTC can be something else
        })[0]

        // If the currency is just BTC, show the USD market data
        // Else, calculate the USD worth based on the total amount of BTC worth
        // TODO: calculate other pairs like ETH and USDT, we only do BTC (for now)
        if (currency === 'BTC') {
          worthUsd = (amount * usdMarket.last).toFixed(2)
        } else {
          if (currencyMarket && usdMarket) {
            worthBtc = amount * currencyMarket.last
            worthUsd = (worthBtc * usdMarket.last).toFixed(2)
          }
        }

        return numeral(worthUsd).value()
      }
    },
    currentBtcWorth (amount, currency) {
      let worthBtc = 0

      // Check if the markets are already in the store, because we load them async
      if (this.allMarkets.length) {
        // Get market date for selected currency

        // TODO: optimize performance, this is slow
        const currencyMarket = this.allMarkets.filter(market => {
          return market.symbol === `${currency}/BTC` // TODO: make dynamic, BTC can be something else
        })[0]

        // If the currency is just BTC, show the USD market data
        // Else, calculate the USD worth based on the total amount of BTC worth
        // TODO: calculate other pairs like ETH and USDT, we only do BTC (for now)
        if (currency === 'BTC') {
          worthBtc = amount
        } else {
          worthBtc = amount * currencyMarket.last
        }

        return numeral(worthBtc).value()
      }
    }
  },
  watch: {
    'totalWorthUsd' (newValue, oldValue) {
      console.log(newValue, oldValue)
      if (oldValue !== null) {
        if (newValue >= oldValue) {
          this.totalWorthChangeIsPositive = true
          setTimeout(() => {
            this.totalWorthChangeIsPositive = null
          }, 1000)
        } else if (newValue < oldValue) {
          this.totalWorthChangeIsPositive = false
          setTimeout(() => {
            this.totalWorthChangeIsPositive = null
          }, 1000)
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.balances {
  text-align: left;
  margin-bottom: 15px;

  .balances__header {
    text-align: left;
    padding: 0 15px;
    display: flex;
    line-height: 4rem;
    margin-bottom: 8px;

    .balances__header-title {
      display: inline-block;
      margin: 0;

      span {
        font-weight: normal;
        font-size: 1.6rem;
        line-height: 1.6rem;
        margin-left: 2px;
        transition: 100ms color;
        color: rgba(44, 62, 80, 0.5);
        position: relative;
        top: -1px;

        &.is-negative {
          color: $color-alizarin-crimson;
        }

        &.is-positive {
          color: $color-chateau-green;
        }
      }
    }

    .balances__header-control {
      margin-left: auto;
    }
  }

  .balances__body {
    padding: 0 15px 15px 15px;
  }

  .balances__legend {
    display: flex;
    width: 100%;
    padding: 10px 15px;
    font-weight: bold;

    .balances__legend-symbol {
      flex-basis: 60px;
      flex-shrink: 0;
    }

    .balances__legend-amount {
      flex-grow: 1;
      max-width: 100%;
      width: 100%;
    }

    .balances__legend-worth {
      flex-basis: 70px;
      flex-shrink: 0;
      text-align: right;
      padding-right: 32px;
    }
  }

  .balances__empty {
    padding-top: 15px;
    font-size: 1.6rem;
    opacity: 0.5;
    font-weight: normal;
    text-align: center;
  }
}
</style>
