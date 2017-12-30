<template>
  <div class="error-message">
    <p>{{ message }}</p>
    <button type="button" class="error-message__control" @click.prevent="handleClose()">&times;</button>
  </div>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: ['message'],
  data () {
    return {
      isOpen: true
    }
  },
  methods: {
    handleClose () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.error-message {
  padding: 15px 30px 15px 15px;
  color: #fff;
  background: #DC3A4E;
  margin-top: 15px;
  font-size: 1.4rem;
  border-radius: 3px;
  position: relative;
  text-align: left;
  overflow: hidden;
  margin-bottom: 15px;

  &.is-hidden {
    display: none;
  }

  p {
    margin: 0;
  }

  .error-message__control {
    width: 40px;
    height: 40px;
    line-height: 4rem;
    position: absolute;
    right: -4px;
    top: -8px;
    color: #fff;
    font-size: 3rem;
    text-align: center;
    display: inline-block;
    border: 0;
    outline: none;
    appearance: none;
    background: none;
  }
}
</style>
