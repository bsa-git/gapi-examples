import Vuex from 'vuex'

const store = () => new Vuex.Store({
  state: {
    config: {}
  },
  mutations: {
    SET_CONFIG (state, config) {
      state.config = config
    }
  }
})

export default store
