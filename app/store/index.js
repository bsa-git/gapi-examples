import Vuex from 'vuex'
import getters from '~/store/getters'

const store = () => new Vuex.Store({
  state: {
    config: {}
  },
  getters: getters,
  mutations: {
    SET_CONFIG (state, config) {
      state.config = config
    }
  }
})

export default store
