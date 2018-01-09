import axios from '../../axios'

export default {
  namespaced: true,
  state: {
    history: [],
    isLoading: false
  },
  mutations: {
    addAllHistory (state, items) {
      state.history = items
    },
    startLoading (state) {
      state.isLoading = true
    },
    stopLoading (state) {
      state.isLoading = false
    }
  },
  getters: {
    getAllHistory: state => {
      return state.history
    },
    isLoading: state => {
      return state.isLoading
    }
  },
  actions: {
    getAllHistory (context) {
      context.commit('startLoading')
      return axios.get(`withdrawalhistory`)
      .then(response => {
        context.commit('addAllHistory', response.data.result)
      })
      .catch(error => {
        console.error('Failed to get the withdrawalhistory history.', error)
      })
      .finally(() => {
        context.commit('stopLoading')
      })
    }
  }
}
