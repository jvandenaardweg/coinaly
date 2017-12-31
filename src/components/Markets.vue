<template>
  <div class="markets">
    <div class="markets__body">
      <Market v-for="(market, index) in filteredMarkets" :key="market.MarketName" :market="market" v-if="limiter(index)"></Market>
    </div>
    <div class="markets__footer">
      <Button :className="'link'" :label="'Show all markets'" v-if="totalMarketItemsShown > paginationLimit" @click.native="showAllMarkets()"></Button>
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
  props: ['filteredMarkets'],
  data () {
    return {
      paginationLimit: 15,
      totalMarketItemsShown: 0
    }
  },
  methods: {
    limiter (index) {
      this.totalMarketItemsShown = (index + 1)
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
}
</style>
