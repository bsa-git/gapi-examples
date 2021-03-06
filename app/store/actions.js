import apiPeople from '~/store/api/people'
import apiGmail from '~/store/api/gmail'
import dataPeople from '~/store/data/people'
import dataGmail from '~/store/data/gmail'

// --- Google People API --- //

const receivePeopleMyNames = function ({commit, state}) {
  let names = null
  if (!state.isTesting) {
    apiPeople.getMyNames()
      .then((names) => {
        commit('SET_PEOPLE_MY_NAMES', names)
        if (state.config.debug) {
          console.log('api.people.get - OK.')
        }
      })
  } else {
    names = dataPeople.names[0]
    commit('SET_PEOPLE_MY_NAMES', names)
    if (state.config.debug) {
      console.log('data.people.get - OK.')
    }
  }
}

const receivePeopleMyConnections = function ({commit, state}) {
  let connections = null
  if (!state.isTesting) {
    apiPeople.getMyConnections()
      .then((connections) => {
        commit('SET_PEOPLE_MY_CONNECTIONS', connections)
        if (state.config.debug) {
          console.log('api.people.connections.list - OK.')
        }
      })
  } else {
    connections = dataPeople.connections
    commit('SET_PEOPLE_MY_CONNECTIONS', connections)
    if (state.config.debug) {
      console.log('data.people.connections.list - OK.')
    }
  }
}
/*
const receiveGmailMyMessages = function ({commit, state}) {
  let messages = null
  if (!state.isTesting) {
    apiGmail.getMyMessages()
      .then((messages) => {
        commit('SET_GMAIL_MY_MESSAGES_LIST', messages)
        if (state.config.debug) {
          console.log('api.gmail.messages.list - OK.')
        }
      })
  } else {
    messages = dataGmail.messages
    commit('SET_GMAIL_MY_MESSAGES_LIST', messages)
    if (state.config.debug) {
      console.log('data.gmail.messages.list - OK.')
    }
  }
}
*/
const receiveGmailMyMessages = function ({commit, state}) {
  let messages = null
  return new Promise((resolve, reject) => {
    if (!state.isTesting) {
      apiGmail.getMyMessages()
        .then((messages) => {
          commit('SET_GMAIL_MY_MESSAGES_LIST', messages)
          if (state.config.debug) {
            console.log('api.gmail.messages.list - OK.')
          }
          resolve(messages)
        })
    } else {
      messages = dataGmail.messages
      commit('SET_GMAIL_MY_MESSAGES_LIST', messages)
      if (state.config.debug) {
        console.log('data.gmail.messages.list - OK.')
      }
      resolve(messages)
    }
  })
}

export default {
  // Google People API
  receivePeopleMyNames,
  receivePeopleMyConnections,
  // Google Gmail API
  receiveGmailMyMessages
}
