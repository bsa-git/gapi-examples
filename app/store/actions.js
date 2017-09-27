import _ from 'lodash'

// --- Gapi People --- //
const receivePeopleMyNames = function (context) {
  window.gapi.client.people.people.get({
    'resourceName': 'people/me',
    'personFields': 'names'
  }).then((resp) => {
    const names = resp.result.names[0]
    context.commit('SET_PEOPLE_MY_NAMES', names)

    if (context.state.config.debug) {
      console.log('people.get - OK. ', resp.result.names[0])
      console.log('story.gapi ', context.state.gapi)
    }
  }, (error) => {
    console.log('people.get - Error. ', `Error: ${error}`)
    alert(`Error: ${error}`)
  })
}
export default {
  // --- Gapi People --- //
  receivePeopleMyNames
}
