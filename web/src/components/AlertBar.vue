<template>
  <div class="alert-bar" :class="{'is-red': isRedAlert }" v-if="showAlert">
    <div class="alert-bar__centered">
      <p><strong>BTC</strong> is {{ upDownText }} {{ Math.abs(oneDayDiffPercentage) | percentage }}. Other coins <em>might</em> suffer.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertBar',
  props: ['btcUsdMarket'],
  computed: {
    oneDayDiffPercentage () {
      if (this.btcUsdMarket) {
        return (((this.btcUsdMarket.last - this.btcUsdMarket.info.PrevDay) / this.btcUsdMarket.info.PrevDay) * 100).toFixed(2)
      } else {
        return null
      }
    },
    isRedAlert () {
      return this.oneDayDiffPercentage < -20 || this.oneDayDiffPercentage > 20
    },
    showDownAlert () {
      return this.oneDayDiffPercentage < -4
    },
    showUpAlert () {
      return this.oneDayDiffPercentage > 4
    },
    showAlert () {
      return this.showDownAlert || this.showUpAlert
    },
    upDownText () {
      return (this.showUpAlert ? 'up' : 'down')
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
