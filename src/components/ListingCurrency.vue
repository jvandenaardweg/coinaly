<template>
  <div class="listing-currency" :class="{ 'is-expanded': isExpanded }">
    <div class="listing-currency__header" @click.prevent="toggleExpand()">
      <div class="listing-currency__symbol"><strong>{{ currency.symbol }}</strong></div>
      <div class="listing-currency__meta">{{ currency.amount }} ({{ currency.fiat.price | currency(currency.fiat.prefix) }})</div>
      <div class="listing-currency__percentage" :class="percentageClass">{{ currency.percentage | percentage }}</div>
    </div>
    <div class="listing-currency__body">
      <div class="listing-currency__controls">
        <Button :label="'Buy ' + currency.symbol"></Button>
        <Button :label="'Sell ' + currency.symbol"></Button>
        <table>
          <tbody>
            <tr>
              <td>Amount</td>
              <td>1212</td>
            </tr>
            <tr>
              <td>Costs</td>
              <td>1212</td>
            </tr>
            <tr>
              <td>Worth</td>
              <td>1212</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'

export default {
  name: 'Listing',
  props: ['currency'],
  components: {
    Button
  },
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
  background-color: #fff;

  &.is-expanded {
    .listing-currency__body {
      display: block;
    }
    .listing-currency__header {
      &:after {
        transform: rotate(-180deg);
      }
    }
  }

  .listing-currency__header {
    display: flex;
    position: relative;
    padding: 12px 40px 12px 15px;

    &:after {
      content: "";
      height: 40px;
      width: 40px;
      background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M225.813 48.907L128 146.72 30.187 48.907 0 79.093l128 128 128-128z"/></svg>');
      position: absolute;
      right: 3px;
      top: 0;
      bottom: 0;
      background-size: 35%;
      background-repeat: no-repeat;
      background-position: center center;
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
    text-align: left;
    padding: 12px 15px;

    > div {
      border-top: 1px #DFE1E3 solid;
      padding: 12px 0;
    }
  }

  .listing-currency__controls {
    text-align: right;
  }

}
</style>
