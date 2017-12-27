<template>
  <div class="order" :class="{ 'is-expanded': isExpanded }">
    <div class="order__header" @click.prevent="toggleExpand()">
      <div class="order__symbol">
        <strong>{{ order.Exchange }}</strong>
      </div>
      <div class="order__meta">
        <ul>
          <li><span>{{ order.Quantity }} @ {{ order.Limit }} (BTC)</span></li>
        </ul>
      </div>
      <div class="order__percentage">
        <span>{{ filledPercentage }}%</span>
      </div>
    </div>
    <div class="order__stats">
      <Progress :blue="0" :orange="0" :green="filledPercentage"></Progress>
    </div>
    <div class="order__body">
      <ul>
        <li><small>Quantity</small><span>{{ order.Quantity }}</span></li>
        <li><small>Remaining</small><span>{{ order.QuantityRemaining }}</span></li>
        <li><small>Price</small><span>{{ order.Price }}</span></li>
        <li><small>Limit</small><span>{{ order.Limit }}</span></li>
        <li><small>Target</small><span>{{ order.ConditionTarget }}</span></li>
        <li><small>Condition</small><span>{{ order.Condition }}</span></li>

      </ul>
    </div>
    <div class="order__footer">
      <Button :type="'danger'" :label="cancelLabel" :disabled="cancelLoading" @click.native="handleCancel(order.OrderUuid)"></Button>
      <ErrorMessage v-if="errorMessage" :message="errorMessage" @close="errorMessage = false"></ErrorMessage>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button'
import Progress from '@/components/Progress'
import ErrorMessage from '@/components/ErrorMessage'

export default {
  name: 'Order',
  props: ['order'],
  components: {
    Button,
    Progress,
    ErrorMessage
  },
  data () {
    return {
      isExpanded: false,
      cancelLoading: false,
      errorMessage: false
    }
  },
  computed: {
    filledPercentage () {
      const difference = this.order.QuantityRemaining - this.order.Quantity
      const filledPercentage = (difference / this.order.Quantity) * 100
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
      this.cancelLoading = true
      this.errorMessage = false

      if (window.confirm('Do you really want to cancel this order?')) {
        console.log('cancel order')
        this.$store.dispatch('orders/cancelOrder', uuid)
        .then(response => {
          alert('done!')
        })
        .catch(error => {
          console.error('errorrrr', error)
          this.errorMessage = 'Something went wrong. Please try again.'
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
  background-color: #fff;
  margin-bottom: 10px;
  border: 1px #DFE1E3 solid;
  border-radius: 3px;
  padding: 0 0 15px 0;

  &.is-expanded {
    .order__body,
    .order__footer {
      display: block;
    }
    .order__header {
      &:after {
        transform: rotate(-180deg);
      }
    }
  }

  .order__header {
    padding: 15px 45px 10px 15px;
    display: flex;
    width: 100%;
    position: relative;

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
    align-self: right;
    margin-left: auto;

    &.is-negative {
      color: red;
    }

    &.is-positive {
      color: green;
    }

    &.is-warning {
      color: orange;
    }
  }

  .order__symbol {
    width: 80px;
  }

  .order__body {
    display: none;
    padding: 15px 15px 0 15px;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: flex-start;

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

  .order__footer {
    padding: 15px 15px 0 15px;
    text-align: right;
    display: none;
  }

  .order__stats {
    padding: 0 15px;
  }

  .order__meta {

    ul {
      display: flex;
      margin: 0;
      padding: 0;
      list-style: none;
      width: 100%;

      li {
        margin-right: 10px;

        &:last-child {
          margin-right: 0;
        }

        span {
          opacity: 0.5;
        }
      }
    }
  }
}
</style>
