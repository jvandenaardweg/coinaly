<template>
  <div class="currency-card" :class="{ 'is-expanded': isExpanded }">
    <header class="currency-card__header" @click.prevent="toggleExpand()">
      <div class="currency-card__symbol">
        <slot name="symbol"></slot>
      </div>
      <div class="currency-card__meta">
        <slot name="meta"></slot>
      </div>
      <div class="currency-card__percentage">
        <slot name="percentage"></slot>
      </div>
    </header>
    <div class="currency-card__stats">
      <slot name="stats"></slot>
      <div class="currency-card__legenda">
        <slot name="legenda"></slot>
      </div>
    </div>
    <div class="currency-card__body">
      <slot name="controls"></slot>
      <slot name="body"></slot>
    </div>
    <div class="currency-card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrencyCard',
  data () {
    return {
      isExpanded: false
    }
  },
  methods: {
    toggleExpand () {
      this.isExpanded = !this.isExpanded
    }
  }
}
</script>

<style lang="scss" scoped>
.currency-card {
  background-color: #fff;
  margin-bottom: 10px;
  border: 1px #DFE1E3 solid;
  border-radius: 3px;
  padding: 0 0 15px 0;

  &.is-expanded {
    .currency-card__body,
    .currency-card__footer,
    .currency-card__legenda {
      display: block;
    }
    .currency-card__header {
      &:after {
        transform: rotate(-180deg);
      }
    }
  }

  .currency-card__header {
    padding: 15px 45px 10px 15px;
    display: flex;
    width: 100%;
    position: relative;

    &:after {
      content: "";
      height: 50px;
      width: 50px;
      background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M225.813 48.907L128 146.72 30.187 48.907 0 79.093l128 128 128-128z"/></svg>');
      position: absolute;
      right: -2px;
      top: 0;
      bottom: 0;
      background-size: 25%;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }

  .currency-card__legenda {
    display: none;
    font-size: 1.1rem;
    padding-top: 10px;

    ul {
      margin: 0;
      list-style: none;
      padding: 0;
      display: flex;

      li {
        margin-right: 10px;

        span {
          opacity: 0.5;
        }

        p {
          margin: 0;
          display: inline-block;
        }

        &:first-child {
          p {
            color: #0077FF;
          }
        }
        &:nth-child(2) {
          p {
            color: #F4BC5F;
          }
        }
      }
    }
  }

  .currency-card__percentage {
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

    p {
      margin: 0;
    }
  }

  .currency-card__symbol {
    width: 80px;
  }

  .currency-card__body {
    display: none;
    padding: 15px 15px 0 15px;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: flex-start;

      li {
        padding-right: 15px;
        width: 33.333333%;
        margin-bottom: 10px;

        small {
          font-size: 1.2rem;
          opacity: 0.5;
          display: block;
        }
        span {
          display: block;
        }
      }
    }
  }

  .currency-card__footer {
    padding: 15px 15px 0 15px;
    text-align: right;
    display: none;
  }

  .currency-card__stats {
    padding: 0 15px;
  }

  .currency-card__meta {

    ul {
      display: flex;
      margin: 0;
      padding: 0;
      list-style: none;
      width: 100%;

      li {
        margin-right: 10px;

        &:last-child {
          margin-right: 0;
        }

        span {
          opacity: 0.5;
        }
      }
    }
  }

  .currency-card__footer {
    border-top: 1px #DFE1E3 solid;
    margin-left: 15px;
    margin-right: 15px;
    padding: 15px 0 0 15px;
  }
}
</style>
