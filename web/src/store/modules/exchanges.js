export default {
  namespaced: true,
  state: {
    supportedExchanges: [
      'bittrex',
      'binance'
    ],
    selectedExchanges: [ ]
  },
  mutations: {
    setSelectedExchange (state, exchangeName) {
      if (!state.selectedExchanges[exchangeName]) {
        state.selectedExchanges.push(exchangeName)
      } else {
        console.log('Exchange already present in selectedExchanges.')
      }
    }
  },
  getters: {
    selectedExchanges: state => {
      return state.selectedExchanges
    }
  },
  actions: { }
}
