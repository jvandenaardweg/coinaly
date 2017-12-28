<template>
  <div id="app">
    <Navigation></Navigation>
    <Loader></Loader>
    <router-view/>
  </div>
</template>

<script>
import Loader from '@/components/Loader'
import Navigation from '@/components/Navigation'

export default {
  name: 'app',
  components: {
    Loader,
    Navigation
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

    // TODO: do with websockets
    setInterval(() => {
      this.$store.dispatch('markets/getAll')
    }, 2000)
  }
}
</script>

<style lang="scss">
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
  line-height: 1.5;
}

#app {
  max-width: 800px;
  margin: 0 auto;
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 80px;
}

label {
  font-weight: bold;
  display: block;
  line-height: 2.4rem;
}

input[type="text"] {
  border-radius: 3px;
  font-size: 1.4rem;
  height: 4rem;
  padding: 0 15px;
  line-height: 4rem;
  border: 1px #DFE1E3 solid;
  width: 100%;

  &:focus {
    border-color: #0077FF;
  }
}

</style>
