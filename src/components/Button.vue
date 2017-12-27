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
  outline: none;

  &[disabled] {
    opacity: 0.5;
  }

  &.button--danger {
    background: #DC3A4E;
  }

  &.button--success {
    background: #9DD532;
  }

  &.button--warning {
    background: #F4BC5F;
  }

  &.button--outlined {
    background: white;
    color: #0077FF;
    border-color: #0077FF;
  }
}
</style>
