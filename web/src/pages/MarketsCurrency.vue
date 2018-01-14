<template>
  <div>
    <Search @searchQuery="handleSearch" :placeholder="'Search markets...'"></Search>
    <Markets :filteredMarkets="filteredMarkets" :searchQuery="searchQuery"></Markets>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Markets from '@/components/Markets'
import Search from '@/components/Search'

export default {
  name: 'MarketsCurrencyPage',
  components: {
    Markets,
    Search
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
    ...mapGetters({
      allBtcMarkets: 'markets/allBtcMarkets',
      allEthMarkets: 'markets/allEthMarkets',
      allUsdMarkets: 'markets/allUsdMarkets',
      allMarkets: 'markets/allMarkets'
    }),
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
        const btcMarkets = this.allBtcMarkets.sort((a, b) => b.quoteVolume - a.quoteVolume)
        if (this.searchQueryInLowerCase) {
          return btcMarkets.filter(market => {
            return market.symbol.toLowerCase().includes(this.searchQueryInLowerCase)
          })
        } else {
          return btcMarkets
        }
      } else if (currency === 'ETH') {
        const ethMarkets = this.allEthMarkets.sort((a, b) => b.quoteVolume - a.quoteVolume)
        if (this.searchQueryInLowerCase) {
          return ethMarkets.filter(market => {
            return market.symbol.toLowerCase().includes(this.searchQueryInLowerCase)
          })
        } else {
          return ethMarkets
        }
      } else if (currency === 'USD') {
        const usdMarkets = this.allUsdMarkets.sort((a, b) => b.quoteVolume - a.quoteVolume)
        if (this.searchQueryInLowerCase) {
          return usdMarkets.filter(market => {
            return market.symbol.toLowerCase().includes(this.searchQueryInLowerCase)
          })
        } else {
          return usdMarkets
        }
      } else {
        const allMarkets = this.allMarkets.sort((a, b) => b.quoteVolume - a.quoteVolume)
        if (this.searchQueryInLowerCase) {
          return allMarkets.filter(market => {
            return market.symbol.toLowerCase().includes(this.searchQueryInLowerCase)
          })
        } else {
          return allMarkets
        }
      }
    }
  },
  methods: {
    handleSearch (searchQuery) {
      this.searchQuery = searchQuery
    },
    clearSearch () {
      this.searchQuery = null
    }
  }
}
</script>
