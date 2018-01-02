<template>
  <div class="progress">
    <div class="progress__blue" v-show="blue" :style="{ 'width': `${blue}%` }"></div>
    <div class="progress__orange" v-show="orange" :style="{ 'width': `${orange}%` }"></div>
    <div class="progress__green" v-show="green" :style="{ 'width': `${green}%` }"></div>
    <div class="progress__black" v-show="black" :style="{ 'width': `${black}%` }"></div>
  </div>
</template>

<script>
export default {
  name: 'Progress',
  props: ['blue', 'orange', 'green', 'black']
}
</script>

<style lang="scss" scoped>
.progress {
  height: 4px;
  width: 100%;
  background-color: $color-iron;
  border-radius: 2px;
  overflow: hidden;
  display: flex;

  > div {
    height: 4px;
    width: 100%;
  }

  .progress__blue {
    background-color: $color-azure-radiance;
  }

  .progress__orange {
    background-color: orange;
  }

  .progress__green {
    background-color: $color-chateau-green;
  }

  .progress__black {
    background-color: $color-black;
  }
}
</style>
