// --- Mutation types --- //
import config from '~/config/env/index'
import ApiGoogle from '~/plugins/gapi.class'

export default async function (context) {
  try {
    // Set config for context and store
    context.config = config
    context.store.commit('SET_CONFIG', config)

    if (context.isClient) {
      console.log('ini-app: - OK', config)
    }

    // Set Google Api to store
    // if (context.isClient && context.store.state.google.api === null) {
    //   const options = {
    //     debug: config.debug,
    //     apiKey: config.gapi.apiKey,
    //     clientId: config.gapi.clientId,
    //     discoveryDocs: config.gapi.services.people.discoveryDocs,
    //     scope: config.gapi.services.people.scopes.get
    //   }
    //   context.store.commit('SET_GOOGLE_API', new ApiGoogle(options))
    // }

  } catch (e) {
    context.error(e)
  }
}
