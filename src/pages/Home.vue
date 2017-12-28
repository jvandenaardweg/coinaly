<template>
  <div id="home">
    <div v-if="!hasAccess">
      <form @submit.prevent="handleForm()">
        <input type="text" v-model="access" name="access" placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
    </div>
    <div v-if="hasAccess">
      <History></History>
    </div>
  </div>
</template>

<script>
import History from '@/components/History'

export default {
  name: 'HomePage',
  components: {
    History
  },
  data () {
    return {
      hasAccess: this.$cookie.get('access') || false
    }
  },
  methods: {
    handleForm () {
      if (this.access === 'jordy') {
        this.$cookie.set('access', true)
        this.hasAccess = true
      }
    }
  }
}
</script>
