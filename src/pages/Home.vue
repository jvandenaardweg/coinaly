<template>
  <div id="home">
    <Orders></Orders>
    <!-- <Listing :title="'Open orders'"></Listing> -->
    <Listing :title="'My Balance'"></Listing>
  </div>
</template>

<script>
import Listing from '@/components/Listing'
import Orders from '@/components/Orders'

export default {
  name: 'Home',
  components: {
    Listing,
    Orders
  }
}
</script>

<style lang="scss" scoped>

</style>
