<template>
  <div class="order" :class="{'is-expanded': isExpanded}">
    <div class="order__header" @click.prevent="toggleExpand()">
      <div class="order__symbol">
        <strong>{{ order.symbol }}</strong>
      </div>
      <div class="order__meta">
        <span>{{ order.amount }}</span>
      </div>
      <div class="order__percentage" :class="{'is-positive': isPositiveDelta === true, 'is-negative': isPositiveDelta === false}">
        <span v-if="isClosedBuy && delta !== null">{{ delta }}%</span>
        <Label v-if="order.side === 'sell'" :text="'Sell'" :color="'red'"></Label>
        <Label v-if="order.side === 'buy'" :text="'Buy'" :color="'green'"></Label>
      </div>
    </div>
    <div class="order__stats" v-if="!isClosed">
      <Progress :blue="0" :orange="0" :green="filledPercentage"></Progress>
    </div>
    <div v-if="isExpanded" class="order__body">
      <div v-if="isClosedBuy" class="order__panel" :class="{'is-positive': isPositiveDelta === true, 'is-negative': isPositiveDelta === false, 'is-neutral': isPositiveDelta === null }">
        <strong>Worth:</strong> <span>{{ currentWorth }} ({{ delta }}%)</span>
      </div>
      <ul>
        <li><small>Quantity</small><span>{{ order.amount }}</span></li>
        <li><small>Remaining</small><span>{{ order.remaining }}</span></li>
        <li><small>Cost</small><span>{{ order.cost }}</span></li>
        <li><small>Price (limit)</small><span>{{ order.price }}</span></li>
        <li><small>Target</small><span>{{ order.info.ConditionTarget }}</span></li>
        <li><small>Condition</small><span>{{ order.info.Condition }}</span></li>
      </ul>
      <ul v-if="!isClosed">
        <li><small>Market price</small><span>{{ currentMarket.last }}</span></li>
        <li><small>Order difference</small><span :class="{'is-positive': differencePercentage > 5, 'is-negative': differencePercentage < 0, 'is-warning': differencePercentage < 5}">{{ differencePercentage | percentage }}</span></li>
      </ul>
      <p v-if="order.info.Condition !== 'NONE'">{{ readableOrder }}</p>
    </div>
    <div v-if="order.remaining && isExpanded" class="order__footer">
      <Button :className="'danger'" :label="cancelLabel" :disabled="cancelLoading" @click.native="handleCancel(order.id)"></Button>
      <ErrorMessage v-if="errorMessage" :message="errorMessage" @close="errorMessage = false"></ErrorMessage>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button'
import Progress from '@/components/Progress'
import ErrorMessage from '@/components/ErrorMessage'
import Label from '@/components/Label'

export default {
  name: 'Order',
  props: ['order'],
  components: {
    Button,
    Progress,
    ErrorMessage,
    Label
  },
  data () {
    return {
      isExpanded: false,
      cancelLoading: false,
      errorMessage: false
    }
  },
  computed: {
    mainPair () {
      return this.order.symbol.split('/')[1]
    },
    coinName () {
      return this.order.symbol.split('/')[0]
    },
    isBuy () {
      return this.order.side === 'buy'
    },
    isSell () {
      return this.order.side === 'sell'
    },
    isClosedBuy () {
      return this.order.side === 'buy' && this.order.status === 'closed'
    },
    isClosed () {
      return this.order.status === 'closed'
    },
    allMarkets () {
      return this.$store.getters['markets/allMarkets']
    },
    currentMarket () {
      return this.allMarkets.filter(market => {
        return market.symbol === this.order.symbol
      })[0]
    },
    difference () {
      const currentMarketLast = this.currentMarket.last
      const orderLimit = this.order.limit
      return (currentMarketLast - orderLimit).toFixed(8)
    },
    differencePercentage () {
      const currentMarketLast = this.currentMarket.last
      const orderLimit = this.order.price
      return (((currentMarketLast - orderLimit) / orderLimit) * 100).toFixed(2)
    },
    currentWorth () {
      if (this.isBuy) {
        let currentWorth = null
        if (this.currentMarket) {
          const lastPricePerUnit = this.currentMarket.last
          currentWorth = (lastPricePerUnit * this.order.amount).toFixed(8)
        }
        return currentWorth
      } else {
        return '-'
      }
    },
    delta () {
      if (this.allMarkets.length) {
        if (this.isBuy) {
          const percentage = ((this.currentWorth - this.order.cost) / this.order.cost * 100).toFixed(2)
          return percentage
        } else {
          return '-'
        }
      } else {
        return null
      }
    },
    isPositiveDelta () {
      if (this.delta > 0) {
        return true
      } else {
        return false
      }
    },
    readableOrder () {
      const readableCondition = (this.order.info.Condition === 'LESS_THAN' ? 'less than' : 'more than')
      const readableOrderType = (this.order.info.OrderType === 'LIMIT_BUY' ? 'buy' : 'sell')
      return `If market price is ${readableCondition} ${this.order.info.ConditionTarget} then ${readableOrderType} ${this.order.amount} ${this.order.symbol} for ${this.order.price}`
    },
    filledPercentage () {
      const difference = this.order.amount - this.order.remaining
      const filledPercentage = (difference / this.order.amount) * 100
      return Math.ceil(filledPercentage)
    },
    cancelLabel () {
      if (this.cancelLoading) {
        return 'Cancelling...'
      } else {
        return 'Cancel'
      }
    }
  },
  methods: {
    handleCancel (uuid) {
      this.errorMessage = false

      if (window.confirm('Do you really want to cancel this order?')) {
        this.cancelLoading = true

        this.$store.dispatch('orders/cancelOrder', uuid)
        .then(response => {
          this.$store.dispatch('balances/getAll')
          this.$store.dispatch('orders/getAllHistory')
          this.$store.dispatch('orders/getOpenOrders')
        })
        .catch(error => {
          let reason
          console.error('errorrrr', error)
          if (error.reason === 'request timeout') {
            reason = 'The exchange did not respond...'
          }
          // TODO: if something when wrong, do an extra check to see if the order is canceled or not
          this.errorMessage = `Something went wrong. ${reason} Please try again.`
        })
        .finally(() => {
          this.cancelLoading = false
        })
      }
    },
    toggleExpand () {
      this.isExpanded = !this.isExpanded
    }
  }
}
</script>

<style lang="scss" scoped>
.order {
  background-color: $color-white;
  margin-bottom: 5px;
  border: 1px $color-iron solid;
  border-radius: 3px;
  text-align: left;

  &.is-expanded {
    .order__header {
      &:after {
        transform: rotate(-180deg);
      }
    }
  }

  .order__header {
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

  .order__percentage {
    flex-basis: 110px;
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

    span {
      display: inline-block;
      padding-right: 5px;
    }

    .label {
      position: relative;
      top: -1px;
    }
  }

  .order__symbol {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-basis: 90px;
    flex-shrink: 0;
  }

  .order__body {
    padding: 15px 15px 10px 15px;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: flex-start;
      border-bottom: 1px $color-iron solid;
      margin-bottom: 10px;

      li {
        padding-right: 15px;
        width: 33.333333%;
        margin-bottom: 10px;

        small {
          font-size: 1.2rem;
          opacity: 0.5;
          display: block;
        }
        span {
          display: block;
        }
      }
    }
  }

  .order__panel {
    padding: 10px 15px;
    border: 1px $color-iron solid;
    border-radius: 3px;
    margin-bottom: 15px;

    &.is-positive {
      background-color: $color-chateau-green;
      color: $color-white;
      border-color: $color-chateau-green;
    }

    &.is-negative {
      background-color: $color-alizarin-crimson;
      color: $color-white;
      border-color: $color-alizarin-crimson;
    }
  }

  .order__footer {
    padding: 0 15px 15px 15px;
    text-align: right;
  }

  .order__stats {
    padding: 0 15px 15px 15px;
  }

  .order__meta {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;

    span {
      opacity: 0.5;
    }
  }
}
</style>
