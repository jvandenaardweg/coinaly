<template>
  <div class="markets">
    <div class="markets__body">
      <div v-if="!showLoadingIndicator && hasFilteredMarkets" class="markets__legend">
        <div class="markets__legend-symbol" @click="sortBy('MarketName')">Market</div>
        <div class="markets__legend-volume" @click="sortBy('BaseVolume')">Volume</div>
        <div class="markets__legend-percentage" @click="sortBy('percentage')">Change</div>
      </div>
      <Market v-if="hasFilteredMarkets && isWithinPageLimit(index)" v-for="(market, index) in filteredMarkets" :key="market.MarketName" :market="market"></Market>
      <div v-if="!hasFilteredMarkets" class="markets__empty">
        <p v-if="searchQuery">No markets found for "{{ searchQuery }}".</p>
      </div>
      <div v-if="showLoadingIndicator" class="markets__empty">
        <p>Loading market data...</p>
      </div>
    </div>
    <div class="markets__footer">
      <Button :className="'link'" :label="'Show all markets'" v-if="totalFileredMarkets > paginationLimit" @click.native="showAllMarkets()"></Button>
    </div>
  </div>
</template>

<script>
import Market from '@/components/Market'
import Button from '@/components/Button'

export default {
  name: 'Markets',
  components: {
    Market,
    Button
  },
  props: ['filteredMarkets', 'searchQuery'],
  data () {
    return {
      paginationLimit: 15,
      marketsIndex: 0
    }
  },
  created () {
    console.log('created markets component')
  },
  computed: {
    showLoadingIndicator () {
      return !this.hasFilteredMarkets && this.isLoading && !this.searchQuery
    },
    isLoading () {
      return this.$store.getters['markets/isLoading']
    },
    hasFilteredMarkets () {
      return this.filteredMarkets.length
    },
    totalFileredMarkets () {
      return this.filteredMarkets.length
    }
  },
  methods: {
    sortBy (sorting) {
      console.log('sort', sorting)
    },
    isWithinPageLimit (index) {
      this.marketsIndex = index
      if (index < this.paginationLimit) {
        return true
      } else {
        return false
      }
    },
    showAllMarkets () {
      this.paginationLimit = 9999
    }
  }
}
</script>

<style lang="scss" scoped>
.markets {
  padding: 0 15px;
  border-radius: 3px;

  .markets__footer {
    text-align: center;
    padding: 15px 0;
  }

  .markets__legend {
    display: flex;
    padding: 10px 15px;
    width: 100%;

    > div {
      font-weight: bold;
    }

    .markets__legend-symbol {
      flex-basis: 90px;
      flex-shrink: 0;
    }

    .markets__legend-volume {
      flex-grow: 1;
      max-width: 100%;
    }

    .markets__legend-percentage {
      flex-basis: 70px;
      flex-shrink: 0;
      text-align: right;
      padding-right: 30px;
    }
  }

  .markets__empty {
    padding-top: 15px;
    font-size: 1.6rem;
    opacity: 0.5;
    font-weight: normal;
    text-align: center;
  }
}
</style>
