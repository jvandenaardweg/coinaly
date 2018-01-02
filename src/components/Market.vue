<template>
  <div class="market" :class="{ 'is-in-balance': isInBalance(market.MarketName), 'is-expanded': isExpanded }">
    <div class="market__header" @click.prevent="toggleExpand()">
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
    <div v-if="isExpanded" class="market__body">
      <ul>
        <li>Vol: {{ Math.floor(market.BaseVolume) }} ({{ mainPair }}) <span v-once>({{ currencyVolumePercentage }})</span></li>
        <li>Last: {{ market.Last}} </li>
        <li>Today low: {{ market.Low }}</li>
        <li>Today high: {{ market.High }}</li>
        <li>Yesterday: {{ market.PrevDay }}</li>
        <li>Open buy orders: {{ market.OpenBuyOrders }}</li>
        <li>Open sell orders: {{ market.OpenSellOrders }}</li>
      </ul>
    </div>
    <div v-if="isExpanded" class="market__footer">
      <ButtonIcon :icon="'chart'" @click.native="openChart = true"></ButtonIcon>
      <Button :label="'Buy'" @click.native="handleBuy()"></Button>
    </div>
    <ChartOverlay v-if="openChart" @close="openChart = false" :exchange="'BITTREX'" :currencyPair="chartCurrencyPair"></ChartOverlay>
  </div>
</template>

<script>
import numeral from 'numeral'
import Progress from '@/components/Progress'
import Button from '@/components/Button'
import ButtonIcon from '@/components/ButtonIcon'
import ChartOverlay from '@/components/ChartOverlay'

export default {
  name: 'Market',
  props: ['market'],
  components: {
    Progress,
    Button,
    ButtonIcon,
    ChartOverlay
  },
  data () {
    return {
      isExpanded: false,
      openChart: false
    }
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
    currency () {
      return this.getCurrencyFromMarketName(this.market.MarketName)
    },
    chartCurrencyPair () {
      const currency = this.getCurrencyFromMarketName(this.market.MarketName)
      return `${currency}${this.mainPair}`
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
    getCurrencyFromMarketName (marketName) {
      return marketName.replace(/.*-/, '') // Replaces the "BTC-", "ETH-", "USD-" from the market name
    },
    isInBalance (marketName) {
      const inBalanceCurrencyNames = this.allFilledCurrenciesInBalance.filter(currency => {
        return currency.Currency === this.getCurrencyFromMarketName(marketName)
      })
      return inBalanceCurrencyNames.length
    },
    number (number) {
      return numeral(number).format('0,0')
    },
    toggleExpand () {
      this.isExpanded = !this.isExpanded
    },
    handleBuy () {
      window.alert('Does not work yet!')
    }
  }
}
</script>

<style lang="scss" scoped>
.market {
  border: 1px #DFE1E3 solid;
  background-color: #fff;
  border-bottom: 0;
  position: relative;

  &:first-child {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  &:last-child {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    border-bottom: 1px #DFE1E3 solid;
  }

  &.is-in-balance {
    border: 1px #0077FF solid;
  }

  &.is-expanded {
    .market__header {
      &:after {
        transform: rotate(-180deg);
      }
    }
  }

  .market__header {
    padding: 15px 45px 15px 15px;
    display: flex;
    width: 100%;
    position: relative;
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

  .market__footer {
    padding: 15px;
    text-align: right;
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
