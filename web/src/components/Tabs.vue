<template>
  <ul class="tabs">
    <li class="tabs__item" v-for="item in items" :key="item.link">
      <router-link :to="item.link" class="tabs__item-link" :aria-label="`View ${item.label}`" @click.native="setSelectedTab(item.storeName, item.storeType)" exact>{{ item.label }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Tabs',
  props: ['items'],
  methods: {
    setSelectedTab (storeName, storeType) {
      if (storeName === 'orders') {
        this.$store.commit('orders/setSelectedOrderType', storeType)
      } else if (storeName === 'markets') {
        this.$store.commit('markets/setSelectedMarket', storeType)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  list-style: none;
  padding: 0 15px;
  margin: 0;
  display: flex;
  border-radius: 3px;
  overflow: hidden;

  .tabs__item {
    display: block;
    width: 100%;
    margin-right: -1px;

    &:first-child {
      .tabs__item-link {
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
      }
    }

    &:last-child {
      .tabs__item-link {
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
      }
    }

    span {
      font-size: 1rem;
      position: relative;
      top: -1px;
    }
  }

  .tabs__item-link {
    border: 1px rgba(0,0,0, 0.3) solid;
    height: 35px;
    padding: 0 12px;
    line-height: 3.5rem;
    font-size: 1.4rem;
    width: 100%;
    display: block;
    color: rgba(0,0,0, 0.3);
    // background-color: $color-white;
    text-decoration: none;
    text-align: center;
    z-index: 0;

    &.is-active {
      background-color: $color-azure-radiance;
      border: 1px $color-azure-radiance solid;
      color: $color-white;
      position: relative;
      z-index: 1;
      font-weight: bold;
    }
  }
}
</style>
