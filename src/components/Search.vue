<template>
  <div class="search">
    <input type="search" :aria-label="placeholder" name="search" v-model="searchQuery" :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: ['placeholder'],
  data () {
    return {
      searchQuery: null
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
  padding: 15px;
  position: relative;

  label {
    display: none;
  }

  input[type="search"] {
    border: 1px $color-iron solid;
    padding: 0 15px;
    background-color: $color-white;
    border-radius: 3px;
    color: $color-black;
    font-size: 1.4rem;
    line-height: 4rem;
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
