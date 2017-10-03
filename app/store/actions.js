import _ from 'lodash'
import data from '~/store/data/people'

// --- Google People API --- //

const receivePeopleMyNames = function ({commit, state}) {
  let names = null
  if (state.config.isStatic) {
    window.gapi.client.people.people.get({
      'resourceName': 'people/me',
      'personFields': 'names,emailAddresses'
    }).then((resp) => {
      names = _.omit(resp.result.names[0], ['metadata'])
      commit('SET_PEOPLE_MY_NAMES', names)

      if (state.config.debug) {
        console.log('people.get - OK.')
      }
    }, (error) => {
      console.log('people.get - Error. ', `Error: ${error}`)
      alert(`Error: ${error}`)
    })
  } else {
    names = data.names[0]
    commit('SET_PEOPLE_MY_NAMES', names)
  }
}

const receivePeopleMyConnections = function ({commit, state}) {
  let myConnections = []
  let connections = []
  if (state.config.isStatic) {
    window.gapi.client.people.people.connections.list({
      'resourceName': 'people/me',
      'pageSize': 10,
      'personFields': 'names,emailAddresses'
    }).then(function (response) {
      connections = response.result.connections
    })
  } else {
    connections = data.connections
  }
  if (connections.length > 0) {
    for (let i = 0; i < connections.length; i++) {
      const person = connections[i]
      if (person.names && person.names.length > 0) {
        myConnections.push(person.names[0].displayName)
      } else {
        myConnections.push('No display name found for connection.')
      }
    }
  } else {
    myConnections.push('No upcoming events found.')
  }
  commit('SET_PEOPLE_MY_CONNECTIONS', myConnections)
  if (state.config.debug) {
    console.log('people.connections.list - OK.')
  }
}

export default {
  // --- Gapi People --- //
  receivePeopleMyNames,
  receivePeopleMyConnections
}
