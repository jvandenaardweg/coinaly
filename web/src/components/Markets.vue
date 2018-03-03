<template>
  <div class="markets">
    <div class="markets__body">
      <div v-if="!showLoadingIndicator && hasFilteredMarkets" class="markets__legend">
        <div class="markets__legend-symbol" @click="sortBy('MarketName')">Market</div>
        <div class="markets__legend-price" @click="sortBy('Price')">Price</div>
        <div class="markets__legend-percentage" @click="sortBy('percentage')">Change</div>
      </div>
      <Market v-if="hasFilteredMarkets && isWithinPageLimit(index)" v-for="(market, index) in filteredMarkets" :key="market.symbol" :market="market"></Market>
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
import { mapGetters } from 'vuex'
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
    ...mapGetters({
      isLoading: 'markets/isLoading'
    }),
    showLoadingIndicator () {
      return !this.hasFilteredMarkets && this.isLoading && !this.searchQuery
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
  // padding: 0 15px;
  border-radius: 3px;

  .markets__body {
    @include breakpoint(desktop) {
      padding: 0 15px;
    }
  }

  .markets__footer {
    text-align: center;
    padding: 15px 0;
  }

  .markets__legend {
    display: flex;
    padding: 1px 45px 5px 15px;
    width: 100%;
    color: $color-gray-chateau;
    text-transform: uppercase;
    font-size: 1.2rem;

    > div {
      font-weight: bold;
    }

    .markets__legend-symbol {
      flex-basis: 36%;
      flex-shrink: 0;
      max-width: 120px;
    }

    .markets__legend-price {
      flex-grow: 1;
      max-width: 100%;
    }

    .markets__legend-percentage {
      flex-basis: 70px;
      flex-shrink: 0;
      text-align: right;
    }
  }

  .markets__empty {
    font-size: 1.6rem;
    opacity: 0.5;
    font-weight: normal;
    text-align: center;
    padding: 15px;
  }
}
</style>
