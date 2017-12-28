<template>
  <div class="progress">
    <div class="progress__blue" :style="{ 'width': `${blue}%` }"></div>
    <div class="progress__orange" :style="{ 'width': `${orange}%` }"></div>
    <div class="progress__green" :style="{ 'width': `${green}%` }"></div>
  </div>
</template>

<script>
export default {
  name: 'Progress',
  props: ['blue', 'orange', 'green']
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
}
</style>
