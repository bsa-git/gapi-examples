const getConfig = function (state) {
  return state.config
}

const isClient = function (state) {
  return state.isClient
}

const isTesting = function (state) {
  return (state.config.app_env === 'testing')
}

const getAuth = function (state) {
  return state.auth
}

const isAuth = function (state) {
  return !!state.auth.token
}

const getGapi = function (state) {
  return state.apiGoogle
}

const getGoogleData = function (state) {
  return state.google
}

export default {
  getConfig,
  isClient,
  isTesting,
  getAuth,
  isAuth,
  getGapi,
  getGoogleData
}
