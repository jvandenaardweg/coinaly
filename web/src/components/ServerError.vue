<template>
  <div class="server-error">
    <div class="server-error__header">
      <p>Oops! The communication with the server failed. </p>
    </div>
    <div class="server-error__body">
      <p v-if="message">This is the message we got from the server: <br /><strong>{{ message }}</strong>.</p>
    </div>
    <div class="server-error__footer">
      <p>If this happens more often, please <a href="https://github.com/jvandenaardweg/coinaly/issues">submit a Github issue</a>.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServerError',
  props: ['message']
}
</script>

<style lang="scss" scoped>
.server-error {
  padding-top: 30px;
  font-size: 1.6rem;
  // opacity: 0.5;
  font-weight: normal;
  text-align: center;


  .server-error__header {
    p {
      color: $color-alizarin-crimson;
    }
  }
}
</style>
