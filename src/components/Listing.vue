<template>
  <div class="listing">
    <header class="listing__header"><h2>My balance</h2></header>
    <div class="listing__body">
      <ListingCurrency v-for="(currency, index) in currencies" :key="index" :currency="currency"></ListingCurrency>
    </div>
  </div>
</template>

<script>
import ListingCurrency from '@/components/ListingCurrency'

export default {
  name: 'Listing',
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
      return [
        {
          symbol: 'XVG',
          amount: 2312,
          percentage: 23.21,
          fiat: {
            symbol: 'EUR',
            prefix: '€',
            price: 213.51
          }
        },
        {
          symbol: 'BTC',
          amount: 2312,
          percentage: -23.21,
          fiat: {
            symbol: 'EUR',
            prefix: '€',
            price: 213.51
          }
        },
        {
          symbol: 'XRP',
          amount: 2312,
          percentage: 4.32,
          fiat: {
            symbol: 'EUR',
            prefix: '€',
            price: 213.51
          }
        }
      ]
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
