<template>
  <nav class="navigation">
    <div class="navigation__container">
      <div class="navigation__logo">
        <router-link to="/" exact>C</router-link>
      </div>
      <ul class="navigation__items" v-if="isAuthorized">
        <li><router-link :to="homePath" :class="{'is-active': subIsActive('/home')}" exact>Home</router-link></li>
        <li><router-link to="/balances">Balances</router-link></li>
        <li><router-link to="/orders">Orders</router-link></li>
        <li><router-link :to="marketPath" :class="{'is-active': subIsActive('/markets')}">Markets</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  computed: {
    isAuthorized () {
      return this.$store.getters['auth/isAuthorized']
    },
    marketPath () {
      const selectedMarket = this.$store.getters['markets/selectedMarket']
      const path = (selectedMarket && selectedMarket !== null ? `/markets/${selectedMarket}` : '/markets')
      return path
    },
    homePath () {
      const selectedOrderType = this.$store.getters['orders/selectedOrderType']
      const path = (selectedOrderType && selectedOrderType !== null ? `/home/${selectedOrderType}` : '/home')
      return path
    }
  },
  methods: {
    subIsActive (input) {
      const paths = Array.isArray(input) ? input : [input]
      return paths.some(path => {
        return this.$route.path.indexOf(path) === 0 // current path starts with this path string
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$navigation-height: 60px;

.navigation {
  position: fixed;
  top: 0;
  left: 0;
  height: $navigation-height;
  line-height: 6rem;
  width: 100%;
  background-color: $color-azure-radiance;
  z-index: 99;

  .navigation__container {
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    padding: 0 15px;
  }

  .navigation__logo {
    padding: 10px 0;
    text-align: center;

    a {
      display: block;
      border: 1px $color-white solid;
      height: 100%;
      width: 40px;
      color: $color-white;
      text-decoration: none;
      line-height: 4rem;
      font-size: 2rem;
    }
  }

  .navigation__items {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    margin-left: auto;

    li {
      padding-left: 15px;

      a {
        color: $color-white;
        text-decoration: none;
        font-size: 1.6rem;
        font-weight: bold;
        opacity: 0.5;

        &.is-active {
          opacity: 1;
        }
      }
    }
  }
}
</style>
