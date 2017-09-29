// --- Mutation types --- //
import config from '~/config/env/index'
import ApiGoogle from '~/plugins/gapi.class'

export default async function (context) {
  try {
    if (config.debug) {
      console.log('ini-app.middleware - OK.')
    }
    // Set config for context and store
    context.config = config
    context.store.commit('SET_CONFIG', config)

    // Set Google Api to store
    // if (context.store.state.google.api === null) {
    //   context.store.commit('SET_GOOGLE_API', new ApiGoogle({debug: config.debug}))
    // }
  } catch (e) {
    context.error(e)
  }
}
