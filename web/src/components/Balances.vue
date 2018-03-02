<template>
  <div class="balances">
    <header class="balances__header">
      <h2 class="balances__header-title">{{ title }}
        <span v-if="totalWorthUsd !== null"
          :class="{
            'is-positive': totalWorthChangeIsPositive === true,
            'is-negative': totalWorthChangeIsPositive === false }">
            {{ totalWorthUsd | currency('$') }}
        </span>
        <span v-if="isCalculatingWorth && totalWorthUsd === null">Calculating...</span>
      </h2>
      <div class="balances__header-control">
        <Button :className="'link'" @click.native="toggleShowAll()" :label="showAllLabel"></Button>
      </div>
    </header>
    <div class="balances__body">
      <ServerError v-if="balancesServerError" :message="balancesServerError.message"></ServerError>

      <div v-if="!showLoadingIndicator" class="balances__legend">
        <div class="balances__legend-symbol">Coin</div>
        <div class="balances__legend-amount">Amount</div>
        <div class="balances__legend-worth">Worth</div>
        <div class="balances__legend-change">Change</div>
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
import ServerError from '@/components/ServerError'

export default {
  name: 'Balances',
  props: ['title'],
  components: {
    Balance,
    Button,
    ServerError
  },
  data () {
    return {
      totalWorthChangeIsPositive: null,
      showAll: false,
      isCalculatingWorth: true
    }
  },
  created () {
    this.setBalanceWorth()

    // Listen for market changes, recalculate the current worth of our whole balance
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'markets/addAllMarkets') {
        this.setBalanceWorth()
        if (this.isCalculatingWorth) this.isCalculatingWorth = false
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
      ordersIsLoading: 'orders/isLoading',
      balancesServerError: 'balances/serverError'
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
    setBalanceWorth () {
      const filledCurrencies = Object.entries(this.allFilledCurrencies)
      let payload = {}

      for (const [currencyName, obj] of filledCurrencies) {
        payload[currencyName] = {
          usd: this.usdWorth(obj.total, currencyName, 'today'),
          btc: this.btcWorth(obj.total, currencyName, 'today'),
          yesterday: {
            usd: this.usdWorth(obj.total, currencyName, 'yesterday'),
            btc: this.btcWorth(obj.total, currencyName, 'yesterday')
          }
        }
      }
      this.$store.commit('balances/setWorth', payload)
    },
    toggleShowAll () {
      if (this.showAll) {
        this.showAll = false
        this.currencies = this.allFilledCurrencies
      } else {
        this.currencies = this.allCurrencies
        this.showAll = true
      }
    },
    usdWorth (amount, currencySymbol, timeframe) {
      let worthBTC = 0
      let worthUSDT = 0
      let marketCurrencyPrice
      let marketUSDTPrice

      // Check if the markets are already in the store, because we load them async
      if (this.allMarkets.length) {
        const marketUSDT = this.filterMarkets('BTC', 'USDT')

        if (timeframe === 'today') {
          marketUSDTPrice = marketUSDT.last
        } else {
          marketUSDTPrice = marketUSDT.info.PrevDay // TODO: PrevDay seems Bittrex only, need to rewrite this for other exchanges
        }

        // If the symbol is BTC, just return that value, that's the worth then
        if (currencySymbol === 'BTC') {
          worthUSDT = (amount * marketUSDTPrice).toFixed(2)
        } else {
          const marketCurrency = this.filterMarkets(currencySymbol, 'BTC')

          if (marketCurrency && marketUSDT) {
            if (timeframe === 'today') {
              marketCurrencyPrice = marketCurrency.last
            } else {
              marketCurrencyPrice = marketCurrency.info.PrevDay // TODO: PrevDay seems Bittrex only, need to rewrite this for other exchanges
            }

            worthBTC = amount * marketCurrencyPrice
            worthUSDT = (worthBTC * marketUSDTPrice).toFixed(2)
          }
        }

        return numeral(worthUSDT).value()
      }
    },
    btcWorth (amount, currencySymbol, timeframe) {
      let worthBtc = 0
      let marketPrice

      // Check if the markets are already in the store, because we load them async
      if (this.allMarkets.length) {
        // If the symbol is BTC, just return that value, that's the worth then
        if (currencySymbol === 'BTC') {
          worthBtc = amount
        } else {
          // Get the market price for XXX/BTC
          const currencyMarket = this.filterMarkets(currencySymbol, 'BTC')

          if (timeframe === 'today') {
            marketPrice = currencyMarket.last
          } else {
            marketPrice = currencyMarket.info.PrevDay // TODO: PrevDay seems Bittrex only, need to rewrite this for other exchanges
          }

          worthBtc = amount * marketPrice
        }

        return numeral(worthBtc).value()
      }
    },
    filterMarkets (currencySymbol, marketSymbol) {
      return this.allMarkets.filter(market => {
        return market.symbol === `${currencySymbol}/${marketSymbol}`
      })[0]
    }
  },
  watch: {
    'totalWorthUsd' (newValue, oldValue) {
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
    @include breakpoint(desktop) {
      padding: 0 15px;
    }
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
      padding-right: 25px;
    }

    .balances__legend-change {
      flex-basis: 70px;
      flex-shrink: 0;
      text-align: right;
      padding-right: 30px;
    }
  }

  .balances__empty {
    font-size: 1.6rem;
    opacity: 0.5;
    font-weight: normal;
    text-align: center;
    padding: 15px;
  }
}
</style>
