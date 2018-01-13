<template>
  <div class="market" :class="{ 'is-in-balance': isInBalance, 'is-expanded': isExpanded }">
    <div class="market__header" @click.prevent="toggleExpand()">
      <div class="market__meta">
        <div class="market__meta-symbol">
          <strong v-once>{{ currency}}</strong><span>/ {{ mainPair }}</span>
        </div>
        <div class="market__meta-volume">
          <span>Vol. {{ currencyVolumePercentage | percentage }}</span>
        </div>
      </div>
      <div class="market__price">
        <div class="market__price-crypto">{{ market.last | toFixed }}</div>
        <div class="market__price-fiat">{{ calculateUsdPrice(market.last, mainPair) | currency }}</div>
      </div>
      <div class="market__percentage" :class="{'is-positive': isPositiveOneDayDiff === true, 'is-negative': isPositiveOneDayDiff === false }">
        <span>{{ oneDayDiffPercentage | percentage }}</span>
      </div>
    </div>
    <div v-if="isExpanded" class="market__body">
      <ul>
        <li>Vol: {{ Math.floor(market.quoteVolume) }} ({{ mainPair }}) <span v-once>({{ currencyVolumePercentage | percentage }})</span></li>
        <li>Last: {{ market.last}} </li>
        <li>Today low: {{ market.low }}</li>
        <li>Today high: {{ market.high }}</li>
        <li>Yesterday: {{ market.info.PrevDay }}</li>
        <li>Open buy orders: {{ market.info.OpenBuyOrders }}</li>
        <li>Open sell orders: {{ market.info.OpenSellOrders }}</li>
        <li>In your balance: {{ totalInBalance }} <span v-if="currencyBalanceWorth">({{ currencyBalanceWorth | currency }})</span></li>
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
import { mapGetters } from 'vuex'

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
    ...mapGetters({
      priceIndexes: 'markets/priceIndexes',
      allFilledCurrenciesInBalance: 'balances/allFilledCurrencies',
      totalBtcVolume: 'markets/totalBtcVolume',
      totalEthVolume: 'markets/totalEthVolume',
      totalUsdVolume: 'markets/totalUsdVolume',
      balanceWorth: 'balances/allWorth'
    }),
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
    balance () {
      const inBalanceCurrencyNames = pickBy(this.allFilledCurrenciesInBalance, (currency, currencyName) => {
        return this.currency === currencyName
      })
      return inBalanceCurrencyNames
    },
    isInBalance () {
      return Object.keys(this.balance).length
    },
    currencyBalanceWorth () {
      return this.totalInBalance * this.calculateUsdPrice(this.market.last, this.mainPair)
    },
    totalInBalance () {
      if (this.balance && this.balance[this.currency]) {
        return this.balance[this.currency].total
      } else {
        return 0
      }
    }
  },
  methods: {
    calculateUsdPrice (rate, currency) {
      if (currency === 'USDT') {
        return this.market.last
      } else {
        return this.priceIndexes[currency].rate * rate
      }
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
  border-top: 1px $color-iron solid;
  background-color: $color-white;
  border-bottom: 0;
  position: relative;

  @include breakpoint(desktop) {
    border-left: 1px $color-iron solid;
    border-right: 1px $color-iron solid;
  }

  &:last-child {
    border-bottom: 1px $color-iron solid;
  }

  &.is-in-balance {
    .market__meta {
      .market__meta-symbol {
        strong {
          color: $color-azure-radiance;
        }
      }
    }
  }

  &.is-expanded {
    .market__header {
      &:after {
        transform: rotate(-180deg);
      }
    }
  }

  .market__header {
    padding: 10px 40px 9px 15px;
    display: flex;
    width: 100%;
    position: relative;
    cursor: pointer;
    overflow: hidden;

    &:after {
      content: "";
      height: 66px;
      width: 40px;
      background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M225.813 48.907L128 146.72 30.187 48.907 0 79.093l128 128 128-128z"/></svg>');
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      background-size: 11px;
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

  .market__meta {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-basis: 36%;
    max-width: 120px;
    flex-shrink: 0;

    .market__meta-symbol {
      span {
        font-weight: normal;
        opacity: 0.5;
        display: inline-block;
        font-size: 1.2rem;
        margin-left: 3px;
      }
    }

    .market__meta-volume {
      opacity: 0.5;
      font-size: 1.2rem;
      margin-top: -6px;
    }
  }

  // .market__volume {
  //   padding: 0 15px 12px 15px;
  // }

  .market__volume {
    flex-grow: 1;
    max-width: 100%;

    .progress {
      position: relative;
      top: 20px;
    }
  }

  .market__price {
    flex-grow: 1;
    max-width: 100%;
    font-size: 1.2rem;
    // padding: 0 0 0 12px;
    // margin-top: -11px;

    .market__price-crypto {
      font-size: 1.4rem;
    }

    .market__price-fiat {
      opacity: 0.5;
      margin-top: -5px;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      width: 100%;

      li {
        margin-left: 5px;

        &:first-child {
          margin-left: 0;
          white-space: nowrap;
          // flex-basis: 90px;
          flex-basis: 50%;
          flex-shrink: 0;
        }

        &:last-child {
          // flex-basis: 70px;
          flex-basis: 50%;
          flex-shrink: 0;
          text-align: right;
        }
      }
    }

    > span {
      font-size: .9rem;
      display: block;
      text-align: center;
      position: relative;
      top: 6px;
      opacity: 0.5;
    }


  }

  .market__percentage {
    flex-basis: 70px;
    flex-shrink: 0;
    text-align: right;

    span {
      position: relative;
      top: 9px;
    }

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
