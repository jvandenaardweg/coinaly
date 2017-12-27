<template>
  <div class="listing">
    <header class="listing__header">
      <h2>{{ title }}</h2>
    </header>
    <div class="listing__body">
      <ListingCurrency v-for="(currency, index) in currencies" :key="index" :currency="currency"></ListingCurrency>
    </div>
  </div>
</template>

<script>
import ListingCurrency from '@/components/ListingCurrency'

export default {
  name: 'Listing',
  props: ['title'],
  components: {
    ListingCurrency
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    currencies () {
      return this.$store.getters['balances/allCurrencies']
    },
    openOrders () {
      return this.$store.getters['orders/allOpenOrders']
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.listing {
  // border: 1px red solid;

  .listing__header {
    text-align: left;
    padding: 0 15px;
  }

  .listing__body {
    > div {
      border-bottom: 1px #DFE1E3 solid;

      &:first-child {
        border-top: 1px #DFE1E3 solid;
      }
    }
  }
}
</style>
