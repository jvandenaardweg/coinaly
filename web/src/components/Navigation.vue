<template>
  <nav class="navigation">
    <div class="navigation__container">
      <div class="navigation__logo">
        <router-link :to="homePath" title="Coinaly" aria-label="Back to the homepage" :class="{'is-active': subIsActive('/home')}" exact>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2888.8 945">
          <path fill="#fff" d="M0 505.4q0-57 17.7-106.5T68.2 313q32.9-36.3 80-57t106-20.5q72.6 0 137.4 26.5L366 359.2a269.6 269.6 0 0 0-46.6-14.8 250.6 250.6 0 0 0-55.4-5.8q-69.7 0-106 43.6t-36.3 123.2q0 76.5 34.3 121.2t115.8 44.6a304.5 304.5 0 0 0 59.9-5.9q29.4-5.9 51-14.7l16.7 98.1q-19.6 9.8-59.4 17.7a421.9 421.9 0 0 1-82 7.8q-65.7 0-114.3-20t-80.4-56q-31.9-35.8-47.6-85.4T0 505.4zm902-1q0 60.8-17.7 110.9t-50 85.3a225 225 0 0 1-78 55q-45.6 19.7-100.5 19.7t-100.2-19.7a226.2 226.2 0 0 1-77.6-55q-32.3-35.3-50.5-85.4t-18.2-110.8q0-60.8 18.2-110.4t51-84.9a225.5 225.5 0 0 1 78-54.5q45.1-19 99.1-19t99.6 19a219.6 219.6 0 0 1 78 54.5q32.4 35.3 50.5 84.9T902 504.4zm-121.7 0q0-76.6-32.9-121.2t-91.7-44.7q-58.9 0-91.8 44.7T531 504.4q0 77.5 32.9 122.7t91.7 45q58.9 0 91.8-45t32.9-122.7zm321 257H982.6v-513h118.7v513.2zm12.8-663.3q0 33.4-21.6 53t-51 19.6q-30.4 0-52-19.6t-21.6-53q0-34.3 21.6-54t52-19.6q29.4 0 51 19.6t21.6 54zm95.3 166.9q34.3-9.8 89.3-18.6t121.7-8.9q62.8 0 105 17.2t67.2 48q25 31 35.3 74.6t10.3 95.7v288.5h-118.7V491.6q0-41.2-5.4-70.1t-17.7-47.1a70.5 70.5 0 0 0-33.3-26.5q-21.1-8.4-51.6-8.4a395.6 395.6 0 0 0-47 3q-24.6 3-36.4 4.9v414.1h-118.7V265zM1921 678q55 0 83.4-5.8V540.7q-9.8-3-28.5-5.9a265.3 265.3 0 0 0-41.2-3 274.2 274.2 0 0 0-39.7 3 123.8 123.8 0 0 0-36.3 10.8 65.8 65.8 0 0 0-26 22q-9.8 14.3-9.8 35.9 0 42.2 26.5 58.4T1921 678zm-9.8-442.5q58.9 0 99.1 14.7t64.3 41.2q24 26.5 34.3 64.3t10.3 83v311q-27.4 6-82.9 14.2t-125.1 8.4q-46.1 0-84.4-8.8t-65.3-28.5q-27-19.6-42.2-51t-15.2-77.5q0-44.2 17.2-74.6a141 141 0 0 1 46.6-49.6q29.4-19.1 68.2-27.4a383.9 383.9 0 0 1 81-8.4 365.5 365.5 0 0 1 41.2 2.5 384.5 384.5 0 0 1 46.1 8.3v-19.6a153.7 153.7 0 0 0-4.9-39.3 81.3 81.3 0 0 0-17.2-32.9q-12.2-14.2-32.3-22t-50.6-7.9q-41.2 0-75.5 5.9t-56 13.7l-14.7-96.1q22.6-7.9 65.8-15.7a515.6 515.6 0 0 1 92.2-7.9zM2400 771.3q-53-1-87.8-11.8t-55.5-30.9q-20.6-20.1-29-50t-8.3-68.2V19.6L2338.2 0v587.8q0 21.6 3.4 36.3a58 58 0 0 0 12.3 25q8.8 10.3 24 15.7t38.7 8.3zm488.8-523q-79.5 292.4-184.5 530-19.6 44-40.2 75.5t-46.1 52a164 164 0 0 1-57 30q-31.3 9.2-72.5 9.2a254.8 254.8 0 0 1-54.5-5.9q-27-5.9-40.7-12.7l21.6-95.2q35.3 13.7 69.6 13.7 46.2 0 72.2-22t45.6-68.2q-56-108-107.5-235.6t-91.7-270.8h126.6q9.8 41.2 24 89.3t30.9 97.6q16.7 49.6 35.3 98.7t37.3 91.2q31.4-87.3 58.9-186t50-190.8h122.7z"/>
        </svg>
        </router-link>
      </div>
      <ul class="navigation__items" v-if="isAuthorized">
        <li><router-link to="/balances" aria-label="View your balances">Balances</router-link></li>
        <li><router-link to="/orders" aria-label="View your open orders">Orders</router-link></li>
        <li><router-link :to="marketPath" aria-label="Browse available exchange markets" :class="{'is-active': subIsActive('/markets')}">Markets</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Navigation',
  computed: {
    ...mapGetters({
      isAuthorized: 'auth/isAuthorized',
      selectedMarket: 'markets/selectedMarket',
      selectedOrderType: 'orders/selectedOrderType'
    }),
    marketPath () {
      const path = (this.selectedMarket && this.selectedMarket !== null ? `/markets/${this.selectedMarket}` : '/markets')
      return path
    },
    homePath () {
      const path = (this.selectedOrderType && this.selectedOrderType !== null ? `/home/${this.selectedOrderType}` : '/home')
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
$navigation-logo-height: 40px;
$navigation-logo-width: 80px;

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
    max-width: $max-page-width;
    margin: 0 auto;
    width: 100%;
    display: flex;
    padding: 0 15px;
    height: 100%;
  }

  .navigation__logo {
    padding: 10px 0;
    text-align: center;

    a {
      display: block;
      height: $navigation-logo-height;
      width: $navigation-logo-width;
      color: $color-black;
      text-decoration: none;
      line-height: 4rem;
      position: relative;
    }

    svg {
      width: 100%;
      height: $navigation-logo-height;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }

  .navigation__items {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    margin-left: auto;

    li {
      padding-left: 10px;

      a {
        color: $color-white;
        text-decoration: none;
        font-size: 1.6rem;
        font-weight: bold;
        opacity: 0.5;
        line-height: 6rem;
        display: block;
        height: 100%;
        transition: 200ms all;

        svg {
          fill: $color-white;
          position: relative;
          top: 5px;
        }

        &.is-active {
          opacity: 1;
        }
      }
    }
  }
}
</style>
