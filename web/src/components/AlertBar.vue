<template>
  <div class="alert-bar" :class="{'is-red': isRedAlert }" v-if="showAlert">
    <div class="alert-bar__centered">
      <p><strong>BTC/USDT</strong> is down {{ Math.abs(oneDayDiffPercentage) | percentage }}. Other coins <em>might</em> suffer.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AlertBar',
  computed: {
    ...mapGetters({
      btcUsdMarket: 'markets/btcUsdMarket'
    }),
    oneDayDiffPercentage () {
      return (((this.btcUsdMarket.last - this.btcUsdMarket.info.PrevDay) / this.btcUsdMarket.info.PrevDay) * 100).toFixed(2)
    },
    isRedAlert () {
      return this.oneDayDiffPercentage < -20
    },
    showAlert () {
      return this.oneDayDiffPercentage < -4
    }
  }
}
</script>

<style lang="scss" scoped>
.alert-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: $color-cream-can;
  color: $color-white;
  width: 100%;
  z-index: 10;

  &.is-red {
    background-color: $color-alizarin-crimson;
  }

  .alert-bar__centered {
    max-width: $max-page-width;
    margin: 0 auto;
    text-align: center;
    padding: 8px 15px;

    p {
      margin: 0;
      line-height: 1.5;
    }
  }
}
</style>
