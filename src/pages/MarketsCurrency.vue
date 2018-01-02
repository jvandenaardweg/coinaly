<template>
  <div>
    <div class="search-box">
      <input type="search" name="search" v-model="searchQuery" placeholder="Search markets..." />
    </div>
    <Markets :filteredMarkets="filteredMarkets" :searchQuery="searchQuery"></Markets>
  </div>
</template>

<script>
import Markets from '@/components/Markets'

export default {
  name: 'MarketsCurrencyPage',
  components: {
    Markets
  },
  created () {
    console.log('created markets currency page')
  },
  data () {
    return {
      searchQuery: null,
      selectedCurrency: null
    }
  },
  computed: {
    routeCurrency () {
      return this.$route.params.currency
    },
    selectedMarket () {
      return this.$cookie.get('selectedMarket')
    },
    searchQueryInLowerCase () {
      return (this.searchQuery ? this.searchQuery.toLowerCase().trim() : null)
    },
    filteredMarkets () {
      const currency = this.$route.params.currency

      if (currency === 'BTC') {
        const btcMarkets = this.$store.getters['markets/allBtcMarkets'].sort((a, b) => b.BaseVolume - a.BaseVolume)
        if (this.searchQueryInLowerCase) {
          return btcMarkets.filter(market => {
            return market.MarketName.toLowerCase().includes(this.searchQueryInLowerCase)
          })
        } else {
          return btcMarkets
        }
      } else if (currency === 'ETH') {
        const ethMarkets = this.$store.getters['markets/allEthMarkets'].sort((a, b) => b.BaseVolume - a.BaseVolume)
        if (this.searchQueryInLowerCase) {
          return ethMarkets.filter(market => {
            return market.MarketName.toLowerCase().includes(this.searchQueryInLowerCase)
          })
        } else {
          return ethMarkets
        }
      } else if (currency === 'USD') {
        const usdMarkets = this.$store.getters['markets/allUsdMarkets'].sort((a, b) => b.BaseVolume - a.BaseVolume)
        if (this.searchQueryInLowerCase) {
          return usdMarkets.filter(market => {
            return market.MarketName.toLowerCase().includes(this.searchQueryInLowerCase)
          })
        } else {
          return usdMarkets
        }
      } else {
        const allMarkets = this.$store.getters['markets/allMarkets'].sort((a, b) => b.BaseVolume - a.BaseVolume)
        if (this.searchQueryInLowerCase) {
          return allMarkets.filter(market => {
            return market.MarketName.toLowerCase().includes(this.searchQueryInLowerCase)
          })
        } else {
          return allMarkets
        }
      }
    }
  },
  methods: {
    marketCount (currency) {
      if (currency === 'BTC') {
        return this.$store.getters['markets/allBtcMarkets'].length
      } else if (currency === 'ETH') {
        return this.$store.getters['markets/allEthMarkets'].length
      } else if (currency === 'USD') {
        return this.$store.getters['markets/allUsdMarkets'].length
      } else {
        return this.$store.getters['markets/allMarkets'].length
      }
    },
    clearSearch () {
      this.searchQuery = null
    },
    setSelectedMarket (currency) {
      this.$cookie.set('selectedMarket', currency)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-box {
  padding: 15px;
  position: relative;

  input[type="search"] {
    border: 1px $color-iron solid;
    padding: 0 15px;
    background-color: $color-white;
    border-radius: 3px;
    color: $color-black;
    font-size: 1.4rem;
    line-height: 4rem;
    height: 4rem;
    width: 100%;
    display: block;
    outline: none;
    margin: 0;
    appearance: none;
  }

  .search-box__control {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
