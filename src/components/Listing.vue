<template>
  <div class="listing">
    <header class="listing__header">
      <h2 class="listing__header-title">{{ title }}</h2>
      <div class="listing__header-control">
        <Button :className="'link'" @click.native="toggleShowAll()" :label="showAllLabel"></Button>
      </div>
    </header>
    <div class="listing__body">
      <div v-if="!showLoadingIndicator" class="listing__legend">
        <div class="listing__legend-symbol">Coin</div>
        <div class="listing__legend-amount">Amount</div>
        <div class="listing__legend-worth">Worth</div>
      </div>
      <ListingCurrency v-for="currency in currencies" :key="currency.Currency" :currency="currency"></ListingCurrency>
      <div v-if="showLoadingIndicator" class="listing__empty">
        <p>Loading your balances...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ListingCurrency from '@/components/ListingCurrency'
import Button from '@/components/Button'

export default {
  name: 'Listing',
  props: ['title'],
  components: {
    ListingCurrency,
    Button
  },
  created () {
    console.log('create listing')
  },
  data () {
    return {
      showAll: false
    }
  },
  computed: {
    isLoading () {
      return this.$store.getters['balances/isLoading'] || this.$store.getters['orders/isLoading']
    },
    showLoadingIndicator () {
      return !this.allCurrencies.length && this.isLoading
    },
    allCurrencies () {
      return this.$store.getters['balances/allCurrencies']
    },
    allFilledCurrencies () {
      return this.$store.getters['balances/allFilledCurrencies']
    },
    currencies () {
      if (this.showAll) {
        return this.allCurrencies
      } else {
        return this.allFilledCurrencies
      }
    },
    openOrders () {
      return this.$store.getters['orders/allOpenOrders']
    },
    showAllLabel () {
      if (!this.showAll) {
        return `Show all (${this.allCurrencies.length})`
      } else {
        return 'Hide 0 balances'
      }
    }
  },
  methods: {
    toggleShowAll () {
      if (this.showAll) {
        this.currencies = this.allFilledCurrencies
        this.showAll = false
      } else {
        this.currencies = this.allCurrencies
        this.showAll = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.listing {
  text-align: left;
  margin-bottom: 15px;

  .listing__header {
    text-align: left;
    padding: 0 15px;
    display: flex;
    line-height: 4rem;
    margin-bottom: 10px;

    .listing__header-title {
      display: inline-block;
      margin: 0;
    }

    .listing__header-control {
      margin-left: auto;
    }
  }

  .listing__body {
    padding: 0 15px 15px 15px;

    .listing-currency {
      margin-bottom: 5px;
    }
  }

  .listing__legend {
    display: flex;
    width: 100%;
    padding: 10px 15px;
    font-weight: bold;

    .listing__legend-symbol {
      flex-basis: 60px;
      flex-shrink: 0;
    }

    .listing__legend-amount {
      flex-grow: 1;
      max-width: 100%;
      width: 100%;
    }

    .listing__legend-worth {
      flex-basis: 70px;
      flex-shrink: 0;
      text-align: right;
      padding-right: 32px;
    }
  }

  .listing__empty {
    padding-top: 15px;
    font-size: 1.6rem;
    opacity: 0.5;
    font-weight: normal;
    text-align: center;
  }
}
</style>
