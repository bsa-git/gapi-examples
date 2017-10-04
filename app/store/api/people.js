import _ from 'lodash'
import config from '~/config/env/index'

// --- Google People API --- //

const getPeopleMyNames = function () {
  window.gapi.client.people.people.get({
    'resourceName': 'people/me',
    'personFields': 'names,emailAddresses'
  }).then((resp) => {
    const names = _.omit(resp.result.names[0], ['metadata'])
    if (config.debug) {
      console.log('api.people.get - Executed: ', `Names=${names};`)
    }
    return names
  }, (error) => {
    console.log('people.get - Error. ', `Error: ${error}`)
    alert(`Error: ${error}`)
  })
}

const getPeopleMyConnections = function () {
  let myConnections = []
  window.gapi.client.people.people.connections.list({
    'resourceName': 'people/me',
    'pageSize': 10,
    'personFields': 'names,emailAddresses'
  }).then(function (response) {
    const connections = response.result.connections
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
    if (config.debug) {
      console.log('api.people.connections - Executed: ', `Connections=${myConnections};`)
    }
    return myConnections
  }, (error) => {
    console.log('people.connections - Error. ', `Error: ${error}`)
    alert(`Error: ${error}`)
  })
}

export default {
  getPeopleMyNames,
  getPeopleMyConnections
}
