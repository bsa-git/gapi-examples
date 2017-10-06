import Vuex from 'vuex'
import getters from '~/store/getters'
import actions from '~/store/actions'

const store = () => new Vuex.Store({
  state: {
    config: null,
    google: {
      people_my: {
        connections: [],
        names: {
          displayName: '',
          displayNameLastFirst: '',
          familyName: '',
          givenName: ''
        }
      },
      gmail: {
        inbox: []
      }
    }
  },
  getters: getters,
  actions: actions,
  mutations: {
    SET_CONFIG (state, config) {
      state.config = config
    },
    SET_PEOPLE_MY_NAMES (state, names) {
      state.google.people_my.names = names
    },
    SET_PEOPLE_MY_CONNECTIONS (state, connections) {
      state.google.people_my.connections = connections
    },
    SET_GMAIL_MY_MESSAGES_LIST (state, messages) {
      state.google.gmail.inbox = messages
    }
  }
})

export default store
