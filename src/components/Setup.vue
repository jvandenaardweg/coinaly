<template>
  <form class="form" @submit.prevent="handleForm()">
    <header class="form__header">
      <h1 class="form__header-title">Setup</h1>
      <p>Please provide your Bittrex API key and secret. They can be created <a href="https://bittrex.com/Manage#sectionApi" target="_blank">here</a>. Your API key and secret is saved only in your browser.</p>
    </header>

    <div class="input-group">
      <label>API Key</label>
      <input type="text" v-model="apiKey" name="apiKey" placeholder="Bittrex API key" />
    </div>
    <div class="input-group">
      <label>API Secret</label>
      <input type="text" v-model="apiSecret" name="apiSecret" placeholder="Bittrex API secret" />
    </div>

    <div class="form__footer">
      <Button :label="'Save'" :typeName="'submit'"></Button>
    </div>
  </form>
</template>

<script>
import Button from '@/components/Button'

export default {
  name: 'Setup',
  components: {
    Button
  },
  data () {
    return {
      apiKey: null,
      apiSecret: null,
      isLoading: false
    }
  },
  computed: {
    saveLabel () {
      if (this.isLoading) {
        return 'Saving...'
      } else {
        return 'Save'
      }
    }
  },
  methods: {
    handleForm () {
      this.$store.dispatch('auth/setApiKey', { apiKey: this.apiKey, apiSecret: this.apiSecret })
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  padding: 0 15px;
}

.form__header {
  margin-bottom: 15px;
}

.form__header-title {
  margin: 0;
}

.input-group {
  margin-bottom: 15px;
}
</style>
