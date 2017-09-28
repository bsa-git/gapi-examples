// --- Mutation types --- //
import config from '~/config/env/index'
import ApiGoogle from '~/plugins/gapi.class'

export default async function (context) {
  try {
    // Set config for context and store
    if (context.store.state.config === null) {
      context.config = config
      context.store.commit('SET_CONFIG', config)
    }

    // Set Google Api to store
    if (context.isClient && context.store.state.google.api === null) {
      context.store.commit('SET_GOOGLE_API', new ApiGoogle({debug: config.debug}))
    }

  } catch (e) {
    context.error(e)
  }
}
