<template>
  <div class="listing">
    <header class="listing__header">
      <h2 class="listing__header-title">{{ title }}</h2>
      <div class="listing__header-control">
        <Button :type="'link'" @click.native="toggleShowAll()" :label="showAllLabel"></Button>
      </div>
    </header>
    <div class="listing__body">
      <ListingCurrency v-for="currency in currencies" :key="currency.Currency" :currency="currency"></ListingCurrency>
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
  data () {
    return {
      showAll: false
    }
  },
  computed: {
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
  // border-bottom: 1px #DFE1E3 solid;

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

    > div {
      margin-bottom: 5px;

      &:first-child {
        border-top: 1px #DFE1E3 solid;
      }
    }
  }
}
</style>
