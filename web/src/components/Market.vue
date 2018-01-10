<template>
  <div class="market" :class="{ 'is-in-balance': isInBalance, 'is-expanded': isExpanded }">
    <div class="market__header" @click.prevent="toggleExpand()">
      <div class="market__symbol">
        <strong>{{ market.symbol }}</strong>
      </div>
      <div class="market__volume">
        <Progress v-once :blue="0" :green="0" :orange="0" :black="currencyVolumePercentage"></Progress>
      </div>
      <div class="market__percentage" :class="{'is-positive': isPositiveOneDayDiff === true, 'is-negative': isPositiveOneDayDiff === false }">
        <span>{{ oneDayDiffPercentage | percentage }}</span>
      </div>
    </div>
    <div v-if="isExpanded" class="market__body">
      <ul>
        <li>Vol: {{ Math.floor(market.quoteVolume) }} ({{ mainPair }}) <span v-once>({{ currencyVolumePercentage }})</span></li>
        <li>Last: {{ market.last}} </li>
        <li>Today low: {{ market.low }}</li>
        <li>Today high: {{ market.high }}</li>
        <li>Yesterday: {{ market.info.PrevDay }}</li>
        <li>Open buy orders: {{ market.info.OpenBuyOrders }}</li>
        <li>Open sell orders: {{ market.info.OpenSellOrders }}</li>
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
import pickBy from 'lodash/pickBy'

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
      return ((this.market.quoteVolume / volume) * 100).toFixed(2)
    },
    mainPair () {
      return this.market.symbol.split('/')[1]
    },
    currency () {
      return this.market.symbol.split('/')[0]
    },
    chartCurrencyPair () {
      return `${this.currency}${this.mainPair}`
    },
    oneDayDiffPercentage () {
      return (((this.market.last - this.market.info.PrevDay) / this.market.info.PrevDay) * 100).toFixed(2)
    },
    isPositiveOneDayDiff () {
      if (this.oneDayDiffPercentage > 0) {
        return true
      } else if (this.oneDayDiffPercentage < 0) {
        return false
      } else {
        return null
      }
    },
    isInBalance () {
      const inBalanceCurrencyNames = pickBy(this.allFilledCurrenciesInBalance, (currency, currencyName) => {
        return this.currency === currencyName
      })
      return Object.keys(inBalanceCurrencyNames).length
    }
  },
  methods: {
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
  border: 1px $color-iron solid;
  background-color: $color-white;
  border-bottom: 0;
  position: relative;

  &:first-child {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  &:last-child {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    border-bottom: 1px $color-iron solid;
  }

  &.is-in-balance {
    border: 1px $color-azure-radiance solid;
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
    text-align: right;
    padding: 0 15px 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    .button {
      margin-left: 5px;
    }
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
        color: $color-alizarin-crimson;
      }
    }

    &.is-positive {
      span {
        color: $color-chateau-green;
      }
    }
  }
}
</style>
