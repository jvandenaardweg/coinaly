<template>
  <div id="home">
    <div v-if="!hasAccess">
      <form @submit.prevent="handleForm()">
        <input type="text" v-model="access" name="access" placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
    </div>
    <div v-if="hasAccess">
      <Button :type="'outlined'" :icon="'chart'" @click.native="openChart = true"></Button></div>
      <ChartOverlay v-show="openChart" @close="openChart = false"></ChartOverlay>
      <History></History>
    </div>
  </div>
</template>

<script>
import History from '@/components/History'
import ChartOverlay from '@/components/ChartOverlay'
import Button from '@/components/Button'

export default {
  name: 'HomePage',
  components: {
    History,
    ChartOverlay,
    Button
  },
  data () {
    return {
      hasAccess: this.$cookie.get('access') || false,
      openChart: false
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
