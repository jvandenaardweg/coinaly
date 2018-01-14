<template>
  <div id="setup">
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
        <ErrorMessage v-if="message" :message="message" @close="removeError()"></ErrorMessage>
        <Button v-if="isAuthorized" :className="'danger'" :label="'Cancel'" @click.native="handleCancel()"></Button> &nbsp;
        <Button :label="'Save'" :typeName="'submit'"></Button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Button from '@/components/Button'
import ErrorMessage from '@/components/ErrorMessage'

export default {
  name: 'SetupPage',
  components: {
    Button,
    ErrorMessage
  },
  data () {
    return {
      apiKey: null,
      apiSecret: null,
      exchange: 'bittrex',
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      isAuthorized: 'auth/isAuthorized',
      message: 'auth/error'
    }),
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
      this.isLoading = true
      this.removeError()
      const payload = [
        {
          exchange: this.exchange,
          apiKey: this.apiKey,
          apiSecret: this.apiSecret
        }
      ]
      this.$store.dispatch('auth/getToken', payload)
      .then(() => {
        this.$router.push('/home')
      })
    },
    removeError () {
      this.$store.commit('auth/removeError')
    },
    handleCancel () {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  padding: 0 15px;

  .form__header {
    margin-bottom: 15px;
  }

  .form__header-title {
    margin: 0;
  }

  .form__footer {
    text-align: right;
  }
}

.input-group {
  margin-bottom: 15px;
}
</style>
