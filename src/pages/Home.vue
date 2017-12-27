<template>
  <div id="home">
    <p>Home, go navigate</p>
    <p>On the homepage we will show the most important information first.</p>
    <div v-if="!hasAccess">
      <form @submit.prevent="handleForm()">
        <input type="text" v-model="access" name="access" placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
    </div>
    <div v-if="hasAccess">
      <p>You now have access</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
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
