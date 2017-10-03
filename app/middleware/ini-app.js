// --- Mutation types --- //
import config from '~/config/env/index'

export default async function (context) {
  try {
    if (context.isClient && config.debug) {
      console.log('ini-app.middleware - OK.')
    }
    // Set config for context and store
    context.config = config
    context.store.commit('SET_CONFIG', config)
  } catch (e) {
    context.error(e)
  }
}
