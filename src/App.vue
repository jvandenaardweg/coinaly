<template>
  <div id="app">
    <Navigation></Navigation>
    <!-- <Loader></Loader> -->
    <keep-alive include="HomePage,MarketsPage,OrdersPage,BalancesPage">
      <router-view></router-view>
    </keep-alive>
    <div class="footer" v-if="isAuthorized">
      <Button :label="'Logout'" :className="'link-gray'" @click.native="handleLogout()"></Button> &nbsp;
      <Button :label="'Setup'" :className="'link-gray'" @click.native="handleSetup()"></Button>
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
      window.location.reload()
    },
    handleSetup () {
      this.$router.push('/setup')
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
        this.$router.push('/setup')
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
  background: $color-athens-gray;
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
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $color-pickled-bluewood;
  padding-top: 75px;
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
  border: 1px $color-iron solid;
  width: 100%;

  &:focus {
    border-color: $color-azure-radiance;
  }
}

a {
  color: $color-azure-radiance;
}

.footer {
  text-align: center;
  margin: 50px 0;
}

</style>
