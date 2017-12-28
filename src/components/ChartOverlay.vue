<template>
  <div class="chart">
    <div class="chart__header">
      <h2>BTCXRP</h2>
      <button type="button" @click="$emit('close')" class="chart__header-control">&times;</button>
    </div>
    <div class="chart__body" id="chart"></div>
  </div>
</template>

<script>
export default {
  name: 'ChartOverlay',
  created () {
    setTimeout(() => {
      this.widget = new window.TradingView.widget({
        'container_id': 'chart',
        'autosize': true,
        'symbol': 'BITTREX:XRPBTC',
        'interval': '60', // D = 1 day, 60 = 1hr
        'timezone': 'Europe/Paris',
        'theme': 'Light',
        'style': '1',
        'locale': 'en',
        'toolbar_bg': '#f1f3f6',
        'enable_publishing': false,
        'save_image': false,
        'hideideas': true
      });
    })
  }
}
</script>

<style lang="scss" scoped>
.chart {
  padding: 0;
  height: 400px;
  position: fixed;
  top: 0;
  z-index: 999;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;

  .chart__header {
    padding: 0 15px;
    height: 60px;
    line-height: 6rem;
    text-align: left;
    position: relative;

    h2 {
      margin: 0;
    }
  }

  .chart__header-control {
    font-size: 3rem;
    font-weight: bold;
    width: 60px;
    height: 60px;
    line-height: 4rem;
    border: 0;
    display: inline-block;
    background: none;
    appearance: none;
    position: absolute;
    top: 0;
    right: 0;
  }

  .chart__body {
    height: 100%;
    padding-bottom: 60px;
  }
}
</style>
