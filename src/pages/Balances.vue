<template>
  <div id="balance">
    <Listing :title="'My Balance'"></Listing>
  </div>
</template>

<script>
import Listing from '@/components/Listing'

export default {
  name: 'BalancesPage',
  components: {
    Listing
  }
}
</script>
