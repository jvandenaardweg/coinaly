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
  background-color: #DFE1E3;
  border-radius: 2px;
  overflow: hidden;
  display: flex;

  > div {
    height: 4px;
    width: 100%;
  }

  .progress__blue {
    background-color: #0077FF;
  }

  .progress__orange {
    background-color: orange;
  }

  .progress__green {
    background-color: #23CF5F;
  }

  .progress__black {
    background-color: #000;
  }
}
</style>
