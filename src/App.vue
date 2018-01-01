<template>
  <div id="app">
    <Navigation></Navigation>
    <!-- <Loader></Loader> -->
    <keep-alive include="HomePage,BalancesPage,MarketsPage,OrdersPage">
      <router-view></router-view>
    </keep-alive>
    <div class="footer" v-if="isAuthorized">
      <Button :label="'Logout'" :className="'outlined'" @click.native="handleLogout()"></Button>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/Loader'
import Navigation from '@/components/Navigation'
import Button from '@/components/Button'

export default {
  name: 'app',
  components: {
    Loader,
    Navigation,
    Button
  },
  computed: {
    isAuthorized () {
      return this.$store.getters['auth/isAuthorized']
    }
  },
  created () {
    if (this.isAuthorized) {
      this.getAllData()
    }
  },
  methods: {
    handleLogout () {
      this.$store.dispatch('auth/removeApiKey')
      window.clearInterval(this.marketInterval)
      this.$router.push('Home')
    },
    getAllData () {
      this.message = false
      // First we do an API call to check if the credentials are valid
      // If that API call returns an error, the API key and secret seem to be invalid
      this.$store.dispatch('balances/getAll')
      .then(response => {
        // Then we get all market data. We use this throughout the whole website, so we want this to be available after first load
        this.$store.dispatch('markets/getAll')

        // TODO: do with websockets
        this.marketInterval = setInterval(() => {
          this.$store.dispatch('markets/getAll')
        }, 2000)
      })
      .catch(error => {
        this.$store.dispatch('auth/removeApiKey')
        this.$store.dispatch('auth/setError', 'The given API key and secret seem to be invalid.')
        this.$router.push('/')
        console.error(error)
      })
      .finally(() => {
        this.isLoading = false
      })
    }
  },
  watch: {
    isAuthorized: function (newValue) {
      if (newValue === true) {
        this.getAllData()
      }
    }
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

a {
  color: #0077FF;
}

.footer {
  text-align: center;
  margin: 50px 0;
}

</style>
