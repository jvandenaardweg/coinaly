<template>
  <div class="listing-currency" :class="{ 'is-expanded': isExpanded }">
    <div class="listing-currency__header" @click.prevent="toggleExpand()">
      <div class="listing-currency__symbol"><strong>{{ currency.Currency }}</strong></div>
      <div class="listing-currency__meta">{{ currency.Available }} <!--({{ currency.fiat.price | currency(currency.fiat.prefix) }})--></div>
      <div class="listing-currency__percentage" :class="percentageClass"><!--{{ currency.percentage | percentage }}--></div>
    </div>
    <div class="listing-currency__body">
      <div class="listing-currency__controls">
        <Button :label="'Sell ' + currency.Currency" :type="'danger'" @click.native="handleClick('sell')"></Button>
        <Button :label="'Buy ' + currency.Currency" @click.native="handleClick('buy')"></Button>
        <OrderTable v-if="orderHistory" v-for="(order, index) in orderHistory(currency.Currency)" :key="index" :order="order"></OrderTable>
      </div>
    </div>
    <Modal :visible="showModal" :type="modalType" @close="showModal = false" :currency="currency"></Modal>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
import OrderTable from '@/components/OrderTable.vue'
import Modal from '@/components/Modal.vue'

export default {
  name: 'Listing',
  props: ['currency'],
  components: {
    Button,
    OrderTable,
    Modal
  },
  data () {
    return {
      isExpanded: false,
      modalType: null,
      showModal: false
    }
  },
  computed: {
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
    toggleExpand () {
      this.isExpanded = !this.isExpanded
    },
    handleClick (type) {
      console.log(type)
      this.modalType = type
      this.showModal = true
    },
    orderHistory (currency) {
      const orderHistory = this.$store.getters['orders/getAllHistory']
      return orderHistory.filter(order => {
        return order.Exchange === `BTC-${currency}` // TODO: market (BTC) can be different, make dynamic
      })
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
  background-color: #fff;

  &.is-expanded {
    .listing-currency__body {
      display: block;
    }
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

  .listing-currency__symbol {
    width: 80px;
    background-attachment: green;
    text-align: left;
  }

  .listing-currency__meta {
    opacity: 0.5;
    padding-right: 5px;
  }

  .listing-currency__percentage {
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

  .listing-currency__body {
    display: none;
    text-align: left;
    padding: 0 15px 12px 15px;

    > div {
      border-top: 1px #DFE1E3 solid;
      padding: 12px 0 0 0;
    }
  }

  .listing-currency__controls {
    text-align: right;
  }

}
</style>
