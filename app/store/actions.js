import _ from 'lodash'

// --- Gapi People --- //
const receivePeopleMyNames = function (context) {
  window.gapi.client.people.people.get({
    'resourceName': 'people/me',
    'personFields': 'names'
  }).then((resp) => {
    const names = _.omit(resp.result.names[0], ['metadata'])
    context.commit('SET_PEOPLE_MY_NAMES', names)

    if (context.state.config.debug) {
      console.log('people.get - OK. ')
    }
  }, (error) => {
    console.log('people.get - Error. ', `Error: ${error}`)
    alert(`Error: ${error}`)
  })
}

const receivePeopleMyConnections = function (context) {
  window.gapi.client.people.people.connections.list({
    'resourceName': 'people/me',
    'pageSize': 10,
    'personFields': 'names',
  }).then(function (response) {
    let myConnections = []
    const connections = response.result.connections
    if (connections.length > 0) {
      for ( let i = 0; i < connections.length; i++) {
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
    context.commit('SET_PEOPLE_MY_CONNECTIONS', myConnections)

    if (context.state.config.debug) {
      console.log('people.connections.list - OK. ')
    }
  })
}

export default {
  // --- Gapi People --- //
  receivePeopleMyNames,
  receivePeopleMyConnections
}
