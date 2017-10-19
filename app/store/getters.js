const getConfig = function (state) {
  return state.config
}

const isClient = function (state) {
  return state.isClient
}

const isStatic = function (state) {
  return state.isStatic
}

const getAuth = function (state) {
  return state.auth
}

const isAuth = function (state) {
  /*
  const stateAuthToken = !!state.auth.token
  const localStorageToken = (state.isClient && window.localStorage) ? !(window.localStorage.getItem('token') === 'null') : false
  return stateAuthToken || localStorageToken
  */
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
  isStatic,
  getAuth,
  isAuth,
  getGapi,
  getGoogleData
}
