<template>
  <div class="markets-selector">
    <div class="markets-selector__input">
      <Search :placeholder="'Example: XRP'" :label="'Search market'" @searchQuery="handleMarketSearchQuery" :autoFocus="true"></Search>
    </div>
    <div class="markets-selector__output">
      <div v-if="filteredMarkets" class="markets-selector__header">
        <strong>Select a market</strong>
      </div>
      <div v-if="filteredMarkets" class="markets-selector__body">
        <div class="markets-selector__market" v-if="filteredMarkets" v-for="market in filteredMarkets" :key="market.symbol">
          <input type="radio" :id="market.symbol" name="selectedMarket" :value="market.symbol" v-model="selectedMarket" />
          <label :for="market.symbol" v-if="market">
            <strong>{{ market.symbol.split('/')[0] }}
              <span>/ {{ market.symbol.split('/')[1] }}</span>
            </strong>
            <!-- <span>{{ market.last | toFixed }} / {{ currencyInBalance(market.symbol.split('/')[1]) }}</span> -->
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pickBy from 'lodash/pickBy'
import { mapGetters } from 'vuex'
import Search from '@/components/Search'

export default {
  name: 'MarketsSelector',
  components: {
    Search
  },
  data () {
    return {
      searchQuery: null,
      selectedMarket: null
    }
  },
  computed: {
    ...mapGetters({
      allMarkets: 'markets/allMarkets',
      allFilledBalances: 'balances/allFilledCurrencies'
    }),
    searchQueryInLowerCase () {
      return (this.searchQuery ? this.searchQuery.toLowerCase().trim() : null)
    },
    filteredMarkets () {
      if (this.searchQueryInLowerCase) {
        return this.allMarkets.filter(market => {
          return market.symbol.toLowerCase().includes(this.searchQueryInLowerCase)
        })
      }
    }
  },
  methods: {
    currencyInBalance (currency) {
      const foundCurrency = pickBy(this.allFilledBalances, (balance, currencyName) => {
        return currency === currencyName
      })[currency]

      if (foundCurrency) return `${foundCurrency.free} ${currency}`
      return `0 ${currency}`
    },
    handleSelect (symbol) {
      this.$emit('selected', symbol)
    },
    handleMarketSearchQuery (searchQuery) {
      this.searchQuery = searchQuery
    }
  },
  watch: {
    selectedMarket: function (newValue, oldValue) {
      this.showMarketsSearch = false
      this.handleSelect(newValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.markets-selector {
  margin-top: 12px;
  background-color: $color-athens-gray;
  padding: 12px 15px 15px 15px;
  margin: -15px;

  .markets-selector__input {
    .search {
      padding: 0;
    }
  }

  .markets-selector__output {
    margin-top: 12px;
  }
  .markets-selector__market {
    position: relative;

    &:first-child {
      label {
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
      }
    }

    &:last-child {
      label {
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
      }
    }

    input {
      position: absolute;
      right: 20px;
      top: 0;
      bottom: 0;
      margin: auto;
    }

    label {
      width: 100%;
      display: block;
      background: $color-white;
      padding: 10px;
      border: 1px $color-loblolly solid;
      margin-bottom: -1px;
      font-weight: normal;

      strong {
        display: inline-block;
        width: 90px;

        span {
          font-weight: normal;
          font-size: 1.2rem;
          display: inline-block;
          margin-left: 3px;
        }
      }

      span {
        opacity: 0.5;
      }
    }

    input {
      &:checked + label {
        background-color: $color-azure-radiance;
        color: $color-white;
        border-color: $color-azure-radiance;
      }
    }
  }
}
</style>
