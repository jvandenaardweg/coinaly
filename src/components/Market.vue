<template>
  <div class="market" :class="{ 'is-in-balance': isInBalance(market.MarketName) }">
    <div class="market__header">
      <div class="market__symbol">
        <strong>{{ market.MarketName }}</strong>
      </div>
      <div class="market__volume">
        <Progress v-once :blue="0" :green="0" :orange="0" :black="currencyVolumePercentage"></Progress>
        <!-- <span>{{ currencyVolumePercentage }}% ({{ number(market.BaseVolume) }} {{ mainPair }})</span> -->
      </div>
      <div class="market__percentage" :class="{'is-positive': isPositiveOneDayDiff === true, 'is-negative': isPositiveOneDayDiff === false }">
        <span>{{ oneDayDiffPercentage }}%</span>
      </div>
    </div>
    <!-- <div>
      <ul>
        <li>Vol: {{ Math.floor(market.BaseVolume) }} ({{ mainPair }}) <span v-once>({{ currencyVolumePercentage }})</span></li>
        <li>Last: {{ market.Last}} </li>
        <li>Today low: {{ market.Low }}</li>
        <li>Today high: {{ market.High }}</li>
        <li>Yesterday: {{ market.PrevDay }}</li>
        <li>Open buy orders: {{ market.OpenBuyOrders }}</li>
        <li>Open sell orders: {{ market.OpenSellOrders }}</li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import numeral from 'numeral'
import Progress from '@/components/Progress'

export default {
  name: 'Market',
  props: ['market'],
  components: {
    Progress
  },
  created () {
    console.log('created market component')
  },
  computed: {
    allFilledCurrenciesInBalance () {
      return this.$store.getters['balances/allFilledCurrencies']
    },
    totalBtcVolume () {
      return this.$store.getters['markets/totalBtcVolume']
    },
    totalEthVolume () {
      return this.$store.getters['markets/totalEthVolume']
    },
    totalUsdVolume () {
      return this.$store.getters['markets/totalUsdVolume']
    },
    currencyVolumePercentage () {
      let volume = 0
      if (this.mainPair === 'USDT') {
        volume = this.totalUsdVolume
      } else if (this.mainPair === 'ETH') {
        volume = this.totalEthVolume
      } else {
        volume = this.totalBtcVolume
      }
      return ((this.market.BaseVolume / volume) * 100).toFixed(2)
    },
    mainPair () {
      return this.market.MarketName.replace(/-.*/, '')
    },
    oneDayDiffPercentage () {
      return (((this.market.Last - this.market.PrevDay) / this.market.PrevDay) * 100).toFixed(2)
    },
    isPositiveOneDayDiff () {
      if (this.oneDayDiffPercentage > 0) {
        return true
      } else if (this.oneDayDiffPercentage < 0) {
        return false
      } else {
        return null
      }
    }
  },
  methods: {
    isInBalance (marketName) {
      const inBalanceCurrencyNames = this.allFilledCurrenciesInBalance.filter(currency => {
        return currency.Currency === marketName.replace(/.*-/, '') // Replaces the "BTC-", "ETH-", "USD-" from the market name
      })
      return inBalanceCurrencyNames.length
    },
    number (number) {
      return numeral(number).format('0,0')
    }
  }
}
</script>

<style lang="scss" scoped>
.market {
  border: 1px #DFE1E3 solid;
  // border-bottom: 0;
  padding: 15px;
  background-color: #fff;
  margin-bottom: -1px;
  z-index:0;
  position: relative;
  // border-radius: 3px;

  &:first-child {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  &:last-child {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    // border-bottom
  }

  &.is-in-balance {
    border: 1px #0077FF solid;
    z-index:1;
  }

  .market__header {
    display: flex;
  }

  .market__symbol {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-basis: 90px;
    flex-shrink: 0;
  }

  .market__volume {
    flex-grow: 1;
    max-width: 100%;

    > span {
      font-size: .9rem;
      display: block;
      text-align: center;
      position: relative;
      top: 6px;
      opacity: 0.5;
    }

    .progress {
      position: relative;
      top: 8px;
    }
  }

  .market__percentage {
    flex-basis: 70px;
    flex-shrink: 0;
    text-align: right;

    &.is-negative {
      span {
        color: #DC3A4E;
      }
    }

    &.is-positive {
      span {
        color: #23CF5F;
      }
    }
  }
}
</style>
