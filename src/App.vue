<template>
  <div id="app">
    <Loader></Loader>
    <router-view/>
  </div>
</template>

<script>
import Loader from '@/components/Loader.vue'

export default {
  name: 'app',
  components: {
    Loader
  },
  created () {
    console.log('get orders')
    console.log('get balances')
    console.log('run tickers')
    // this.$store.dispatch('tickers/getAll')
    this.$store.dispatch('balances/getAll')
    this.$store.dispatch('orders/getAllHistory')
    this.$store.dispatch('orders/getOpenOrders')
    this.$store.dispatch('deposits/getAllHistory')
    this.$store.dispatch('withdrawals/getAllHistory')
  }
}
</script>

<style>
html {
  font-size: 62.5%;
  background: #f4f5f7;
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}

body {
  padding: 0;
  margin: 0;
  font-size: 1.4rem;
}

#app {
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 50px;
}


</style>
