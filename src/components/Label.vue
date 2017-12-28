<template>
  <div class="label" :class="{'label--red': color === 'red', 'label--green': color === 'green' }">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'Label',
  props: ['text', 'color']
}
</script>

<style lang="scss" scoped>
.label {
  height: 20px;
  border: 1px black solid;
  padding: 0 10px;
  line-height: 2rem;
  font-size: 1.1rem;
  color: black;
  border-radius: 3px;
  display: inline-block;

  &.label--red {
    color: red;
    border-color: red;
  }

  &.label--green {
    color: green;
    border-color: green;
  }
}
</style>
