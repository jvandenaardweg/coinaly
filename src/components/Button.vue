<template>
  <button type="button" class="button" :class="{ 'button--primary': !type, 'button--danger': type === 'danger', 'button--success': type === 'success', 'button--warning': type === 'warning', 'button--outlined': type === 'outlined'}">{{ label }}</button>
</template>

<script>
export default {
  name: 'Button',
  props: ['href', 'label', 'type']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.button {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 3px;
  background: #0077FF;
  color: white;
  border: 0;
  font-size: 1.4rem;
  font-weight: bold;
  border: 1px transparent solid;

  &.button--danger {
    background: red;
  }

  &.button--success {
    background: green;
  }

  &.button--warning {
    background: orange;
  }

  &.button--outlined {
    background: white;
    color: #0077FF;
    border-color: #0077FF;
  }
}
</style>
