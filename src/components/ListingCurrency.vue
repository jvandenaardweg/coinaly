<template>
  <div class="listing-currency" :class="{ 'is-expanded': isExpanded }">
    <div class="listing-currency__header" @click.prevent="toggleExpand()">
      <div class="listing-currency__symbol"><strong>{{ currency.symbol }}</strong></div>
      <div class="listing-currency__meta">{{ currency.amount }} ({{ currency.fiat.price | currency(currency.fiat.prefix) }})</div>
      <div class="listing-currency__percentage" :class="percentageClass">{{ currency.percentage | percentage }}</div>
    </div>
    <div class="listing-currency__body">
      <p>More info</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Listing',
  props: ['currency'],
  data () {
    return {
      isExpanded: false
    }
  },
  computed: {
    percentageClass () {
      if (this.currency.percentage < 0) {
        return 'is-negative'
      } else if (this.currency.percentage < 5) {
        return 'is-warning'
      } else {
        return 'is-positive'
      }
    }
  },
  methods: {
    toggleExpand () {
      this.isExpanded = !this.isExpanded
    }
  },
  filters: {
    percentage (value) {
      return value + '%'
    },
    currency (value, prefix) {
      return prefix + value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.listing-currency {
  padding: 8px 15px;

  &.is-expanded {
    .listing-currency__body {
      display: block;
    }
  }

  .listing-currency__header {
    display: flex;
    position: relative;
    padding-right: 35px;

    &:after {
      content: "";
      height: 40px;
      width: 40px;
      background: red;
      position: absolute;
      right: -15px;
      top: -8px;
      bottom: 0;
    }
  }

  .listing-currency__symbol {
    width: 80px;
    background-attachment: green;
    text-align: left;
  }

  .listing-currency__meta {
    opacity: 0.5;
    padding-right: 5px;
  }

  .listing-currency__percentage {
    align-self: right;
    margin-left: auto;

    &.is-negative {
      color: red;
    }

    &.is-positive {
      color: green;
    }

    &.is-warning {
      color: orange;
    }
  }

  .listing-currency__body {
    display: none;
  }

}
</style>
