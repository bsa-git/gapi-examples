import Vuex from 'vuex'
import getters from '~/store/getters'
import actions from '~/store/actions'

const store = () => new Vuex.Store({
  state: {
    config: null,
    auth: {
      user: null,
      token: null
    },
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
    SET_USER (state, userData) {
      state.auth.user = userData
    },
    SET_TOKEN (state, token) {
      state.auth.token = token
      if (state.config.isClient && window.localStorage) {
        window.localStorage.setItem('token', token)
      }
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
