<template>
  <div class="chart">
    <div class="chart__header">
      <h2>{{ currencyPair }}</h2>
      <button type="button" @click.prevent="handleClose()" class="chart__header-control">&times;</button>
    </div>
    <div class="chart__body" id="chart"></div>
  </div>
</template>

<script>
const moment = require('moment-timezone')

export default {
  name: 'ChartOverlay',
  props: ['exchange', 'currencyPair'],
  computed: {
    tradingViewSymbol () {
      return `${this.exchange}:${this.currencyPair}`
    },
    userTimezone () {
      return moment.tz.guess() || 'Europe/Paris'
    }
  },
  created () {
    setTimeout(() => {
      // eslint-disable-next-line
      this.widget = new window.TradingView.widget({
        'container_id': 'chart',
        'autosize': true,
        'symbol': `${this.tradingViewSymbol}`,
        'interval': '60', // D = 1 day, 60 = 1hr
        'timezone': this.userTimezone,
        'theme': 'Light',
        'style': '1',
        'locale': 'en',
        'toolbar_bg': '#f1f3f6',
        'enable_publishing': false,
        'save_image': false,
        'hideideas': true,
        'referral_id': '7376',
        'allow_symbol_change': false
      })

      /*
      whitelabel: options.whitelabel || "",
        width: options.width || 800,
        height: options.height || 500,
        symbol: _symbol,
        interval: options.interval || "1",
        range: options.range || "",
        timezone: options.timezone || "",
        autosize: options.autosize,
        hide_top_toolbar: options.hide_top_toolbar,
        hide_side_toolbar: options.hide_side_toolbar,
        allow_symbol_change: options.allow_symbol_change,
        save_image: options.save_image !== undefined ? options.save_image : true,
        container: options.container_id || "",
        toolbar_bg: options.toolbar_bg || "f4f7f9",
        watchlist: options.watchlist || [],
        editablewatchlist: !!options.editablewatchlist,
        studies: options.studies || [],
        theme: options.theme || "",
        style: options.style || "",
        extended_hours: options.extended_hours === undefined ? undefined : +options.extended_hours,
        details: !!options.details,
        news: !!options.news,
        calendar: !!options.calendar,
        hotlist: !!options.hotlist,
        hideideas: !!options.hideideas,
        hideideasbutton: !!options.hideideasbutton,
        widgetbar_width: +options.widgetbar_width || undefined,
        withdateranges: options.withdateranges || "",
        customer: options.customer || _logo || "",
        venue: options.venue,
        symbology: options.symbology,
        logo: _logo,
        show_popup_button: !!options.show_popup_button,
        popup_height: options.popup_height || "",
        popup_width: options.popup_width || "",
        studies_overrides: options.studies_overrides,
        overrides: options.overrides,
        enabled_features: options.enabled_features,
        disabled_features: options.disabled_features,
        publish_source: options.publish_source || "",
        enable_publishing: options.enable_publishing,
        idea_url: options.idea_url,
        whotrades: options.whotrades || undefined,
        locale: options.locale,
        referral_id: options.referral_id,
        no_referral_id: options.no_referral_id,
        ref_landing_page: options.ref_landing_page,
        fundamental: options.fundamental,
        percentage: options.percentage,
        hidevolume: options.hidevolume,
        padding: options.padding,
        greyText: options.greyText || ""
      */
    })
  },
  methods: {
    handleClose () {
      this.$emit('close')
    }
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
  background-color: $color-white;

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
