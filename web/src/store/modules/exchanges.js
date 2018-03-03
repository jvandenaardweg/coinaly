import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    selected: null,
    exchanges: []
  },
  mutations: {
    setSelected (state, exchangeName) {
      const exchangeSlug = exchangeName.toLowerCase()
      Vue.set(state, 'selected', exchangeSlug)
    }
  },
  getters: {
    selected (state) {
      return state.selected
    }
  },
  actions: { }
}
