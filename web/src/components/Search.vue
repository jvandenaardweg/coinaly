<template>
  <div class="search">
    <label v-if="label">{{ label }}</label>
    <input type="search" :aria-label="placeholder" name="search" v-model="searchQuery" :placeholder="placeholder" ref="inputSearch" autocomplete="off" />
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: ['placeholder', 'label', 'autoFocus'],
  data () {
    return {
      searchQuery: null
    }
  },
  mounted () {
    if (this.autoFocus) {
      this.$refs.inputSearch.focus()
    }
  },
  watch: {
    searchQuery (newValue) {
      this.$emit('searchQuery', newValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  // padding: 11px 15px;
  position: relative;

  input[type="search"] {
    border: 1px $color-loblolly solid;
    padding: 0 15px;
    background-color: $color-white;
    border-radius: 3px;
    color: $color-black;
    font-size: 1.4rem;
    height: 4rem;
    width: 100%;
    display: block;
    outline: none;
    margin: 0;
    appearance: none;
  }

  .search__control {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
