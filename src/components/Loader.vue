<template>
  <div class="loader" :class="{'is-hidden': !isLoading }">
    <span v-show="isLoading">Loading:</span>
    <span v-show="!isLoading">Done!</span>
    <span v-if="this.$store.getters['balances/isLoading']">balances</span>
    <span v-if="this.$store.getters['orders/isLoading']">orders</span>
    <span v-if="this.$store.getters['deposits/isLoading']">deposits</span>
    <span v-if="this.$store.getters['withdrawals/isLoading']">withdrawals</span>
  </div>
</template>

<script>

export default {
  name: 'app',
  computed: {
    isLoading () {
      return this.$store.getters['balances/isLoading'] ||
      this.$store.getters['orders/isLoading'] ||
      this.$store.getters['deposits/isLoading'] ||
      this.$store.getters['withdrawals/isLoading']
    }
  }
}
</script>

<style lang="scss" scoped>
.loader {
  height: 40px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: orange;
  color: white;
  padding: 10px;
  z-index: 10;
  transition: 500ms all;
  opacity: 1;
  pointer-events: none;

  &.is-hidden {
    opacity: 0;
  }
}
</style>
