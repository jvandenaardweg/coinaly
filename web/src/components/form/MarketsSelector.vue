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
          <label :for="market.symbol" v-if="market"><strong>{{ market.symbol }}</strong> <span>{{ market.last | toFixed }}</span></label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      allMarkets: 'markets/allMarkets'
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
      // Vue.nextTick(() => {
      //   this.$refs.inputPrice.focus()
      // })
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

  .markets-selector__header {
    //
  }

  .markets-selector__body {
    //
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
        width: 100px;
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
