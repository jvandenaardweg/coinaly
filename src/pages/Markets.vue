<template>
  <div id="markets">

    <header class="page-header">
      <h2 class="page-header__title">Markets</h2>
      <div class="page-header__control">
        <div class="select-box">
          <select name="order">
            <option disabled selected>Order by...</option>
            <option>Name</option>
            <option>24hr vol</option>
            <option>last price</option>
            <option>24hr high</option>
            <option>24hr low</option>
          </select>
        </div>
      </div>
    </header>

    <ul class="tabs">
      <li class="tabs__item"><router-link to="/markets" class="tabs__item-link" exact>All <span>({{ marketCount('all') }})</span></router-link></li>
      <li class="tabs__item"><router-link to="/markets/BTC" class="tabs__item-link">BTC <span>({{ marketCount('BTC') }})</span></router-link></li>
      <li class="tabs__item"><router-link to="/markets/ETH" class="tabs__item-link">ETH <span>({{ marketCount('ETH') }})</span></router-link></li>
      <li class="tabs__item"><router-link to="/markets/USD" class="tabs__item-link">USD <span>({{ marketCount('USD') }})</span></router-link></li>
    </ul>

    <div class="search-box">
      <input type="search" name="search" v-model="searchQuery" placeholder="Search..." />
    </div>

    <Markets :filteredMarkets="filteredMarkets"></Markets>

  </div>
</template>

<script>
import Button from '@/components/Button'
import Markets from '@/components/Markets'

export default {
  name: 'MarketsHomePage',
  components: {
    Button,
    Markets
  },
  data () {
    return {
      searchQuery: null
    }
  },
  computed: {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  text-align: left;
  padding: 0 15px;
  display: flex;
  line-height: 4rem;
  margin-bottom: 10px;

  .page-header__title {
    margin: 0;
    display: inline-block;
  }

  .page-header__control {
    margin-left: auto;
    display: flex;

    > div {
      margin-left: 5px;
    }
  }
}

.tabs {
  list-style: none;
  padding: 0 10px 0 15px;
  margin: 0;
  display: flex;

  .tabs__item {
    display: block;
    width: 100%;
    margin-right: 5px;

    span {
      font-size: 1rem;
      position: relative;
      top: -1px;
      // left: 1px;
    }
  }

  .tabs__item-link {
    border: 1px rgba(0,0,0, 0.3) solid;
    border-radius: 3px;
    height: 30px;
    padding: 0 10px;
    line-height: 3rem;
    font-size: 1.4rem;
    width: 100%;
    display: block;
    color: rgba(0,0,0, 0.3);
    // background-color: #fff;
    text-decoration: none;
    text-align: center;

    &.is-active {
      // background-color: #fff;
      border: 1px #0077FF solid;
      color: #0077FF;
    }
  }
}

.search-box {
  padding: 15px;

  input[type="search"] {
    border: 1px #DFE1E3 solid;
  padding: 0 15px;
    background-color: #fff;
    border-radius: 3px;
    color: #000;

    font-size: 1.4rem;
    line-height: 4rem;
    height: 4rem;
    width: 100%;
    display: block;
    // border: 0;
    // padding: 0;
    // background: none;
    outline: none;
    margin: 0;
  }
}

.select-box {
  border: 1px #DFE1E3 solid;
  padding: 0 5px;
    background-color: #fff;
    border-radius: 3px;
    height: 4rem;

  select {
    font-size: 1.4rem;
    line-height: 4rem;
    height: 100%;
    width: 100%;
    display: block;
    border: 0;
    padding: 0;
    background: none;
    outline: none;
    margin: 0;
  }
}
</style>
