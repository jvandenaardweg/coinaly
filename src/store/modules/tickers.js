import axios from '../../axios'

export default {
  namespaced: true,
  state: {
    orders: []
  },
  mutations: {
    addAll (state, items) {
      state.orders = items
    }
  },
  actions: {
    getAll (context) {
      return axios.get(`/`)
      .then(response => {
        console.log(response)
        // context.commit('addAll', response.data.data)
      })
      .catch(error => {
        console.error('Failed to get the artists.', error)
      })
    }
  }
}
