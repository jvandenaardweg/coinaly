<template>
  <nav class="navigation">
    <div class="navigation__logo">
      <router-link to="/" exact>S</router-link>
    </div>
    <ul class="navigation__items">
      <li><router-link to="/" exact>Home</router-link></li>
      <li><router-link :to="'balances'">Balances</router-link></li>
      <li><router-link :to="'orders'">Orders</router-link></li>
      <li><router-link :to="'history'">History</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navigation'
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
  background-color: #0077FF;
  padding: 0 15px;
  display: flex;
  z-index: 99;

  .navigation__logo {
    padding: 10px 0;

    a {
      display: block;
      border: 1px #fff solid;
      height: 100%;
      width: 40px;
      color: #fff;
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
        color: #fff;
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
