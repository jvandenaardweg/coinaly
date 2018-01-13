<template>
  <div id="markets">

    <header class="page-header">
      <h2 class="page-header__title">Markets</h2>
    </header>

    <Tabs :items="tabItems"></Tabs>
    <!-- <ul class="tabs">
      <li class="tabs__item"><router-link to="/markets" class="tabs__item-link" exact  @click.native="setSelectedMarket(null)">All <span>({{ marketCount('all') }})</span></router-link></li>
      <li class="tabs__item"><router-link to="/markets/BTC" class="tabs__item-link" @click.native="setSelectedMarket('BTC')">BTC <span>({{ marketCount('BTC') }})</span></router-link></li>
      <li class="tabs__item"><router-link to="/markets/ETH" class="tabs__item-link" @click.native="setSelectedMarket('ETH')">ETH <span>({{ marketCount('ETH') }})</span></router-link></li>
      <li class="tabs__item"><router-link to="/markets/USD" class="tabs__item-link" @click.native="setSelectedMarket('USD')">USD <span>({{ marketCount('USD') }})</span></router-link></li>
    </ul> -->

    <router-view></router-view>

  </div>
</template>

<script>
import Tabs from '@/components/Tabs'

export default {
  name: 'MarketsPage',
  props: ['selectedTab'],
  components: {
    Tabs
  },
  created () {
    console.log('created markets page')
    this.$store.dispatch('balances/getAll') // Because we want to see what currency we have on our balance
  },
  data () {
    return {
      searchQuery: null,
      selectedCurrency: null,
      tabItems: [
        {
          link: '/markets',
          storeName: 'markets',
          storeType: null,
          label: 'All'
        },
        {
          link: '/markets/BTC',
          storeName: 'markets',
          storeType: 'BTC',
          label: 'BTC'
        },
        {
          link: '/markets/ETH',
          storeName: 'markets',
          storeType: 'ETH',
          label: 'ETH'
        },
        {
          link: '/markets/USD',
          storeName: 'markets',
          storeType: 'USD',
          label: 'USD'
        }
      ]
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
  margin-bottom: 11px;

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

.select-box {
  border: 1px $color-iron solid;
  padding: 0 5px;
    background-color: $color-white;
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
