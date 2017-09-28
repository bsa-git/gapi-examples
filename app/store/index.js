import Vuex from 'vuex'
import getters from '~/store/getters'
import actions from '~/store/actions'

const store = () => new Vuex.Store({
  state: {
    config: null,
    google: {
      api: null,
      loadedClient: false,
      people_my: {
        connections: [],
        names: {
          displayName: '',
          displayNameLastFirst: '',
          familyName: '',
          givenName: ''
        }
      }
    }
  },
  getters: getters,
  actions: actions,
  mutations: {
    SET_CONFIG (state, config) {
      state.config = config
    },
    SET_GOOGLE_API (state, api) {
      state.google.api = api
      if (state.config.debug) {
        console.log('SET_GOOGLE_API.store - OK.')
      }
    },
    SET_LOADED_GOOGLE_CLIENT (state) {
      state.google.loadedClient = true
      if (state.config.debug) {
        console.log('SET_LOADED_GOOGLE_CLIENT.store - OK.')
      }
    },
    SET_PEOPLE_MY_NAMES (state, names) {
      state.google.people_my.names = names
    },
    SET_PEOPLE_MY_CONNECTIONS (state, connections) {
      state.google.people_my.connections = connections
    }
  }
})

export default store
