<template>
  <div class="balances-selector">
    <div class="balances-selector__input">
      <Search :placeholder="'Example: XRP'" :label="'Search balance'" @searchQuery="handleBalanceSearchQuery" :autoFocus="true"></Search>
    </div>
    <div class="balances-selector__output">
      <div v-if="filteredBalances" class="balances-selector__header">
        <strong>Select a balance</strong>
      </div>
      <div v-if="filteredBalances" class="balances-selector__body">
        <div class="balances-selector__market" v-if="filteredBalances" v-for="(balance, currencyName) in filteredBalances" :key="currencyName">
          <input type="radio" :id="currencyName" name="selectedBalance" :value="currencyName" v-model="selectedBalance" />
          <label :for="currencyName" v-if="balance">
            <strong>{{ currencyName }}</strong>
            <span>{{ balance.free }} free</span>
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
  name: 'BalancesSelector',
  components: {
    Search
  },
  data () {
    return {
      searchQuery: null,
      selectedBalance: null
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
    filteredBalances () {
      if (this.searchQueryInLowerCase) {
        return pickBy(this.allFilledBalances, (balance, currencyName) => {
          return currencyName.toLowerCase().includes(this.searchQueryInLowerCase)
        })
      } else {
        return this.allFilledBalances
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
    handleBalanceSearchQuery (searchQuery) {
      this.searchQuery = searchQuery
    },
    currencyName (balance, index) {
      return Object.keys(balance)[index]
    }
  },
  watch: {
    selectedBalance: function (newValue, oldValue) {
      this.showMarketsSearch = false
      this.handleSelect(newValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.balances-selector {
  margin-top: 12px;
  background-color: $color-athens-gray;
  padding: 12px 15px 15px 15px;
  margin: -15px;

  .balances-selector__input {
    .search {
      padding: 0;
    }
  }

  .balances-selector__output {
    margin-top: 12px;
  }
  .balances-selector__market {
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
