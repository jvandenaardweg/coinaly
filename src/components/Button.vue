<template>
  <span>
    <button type="button" class="button">{{ label }}</button>
  </span>
</template>

<script>
export default {
  name: 'Button',
  props: ['href', 'label']
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
}
</style>
