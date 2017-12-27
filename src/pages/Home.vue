<template>
  <div id="home">
    <!-- <Listing :title="'Open orders'"></Listing> -->
    <Listing :title="'My Balance'"></Listing>
  </div>
</template>

<script>
import Listing from '@/components/Listing.vue'

export default {
  name: 'Home',
  components: {
    Listing
  }
}
</script>

<style lang="scss" scoped>

</style>
