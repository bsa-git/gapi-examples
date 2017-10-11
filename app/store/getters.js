const getConfig = function (state) {
  return state.config
}

const getAuth = function (state) {
  return state.auth
}

const isAuth = function (state) {
  // const stateAuthToken = !!state.auth.token
  // const isClient = state.config.isClient
  // const localStorageToken = (isClient && window.localStorage) ? !!window.localStorage.getItem('token') : false
  // console.log(`stateAuthToken=${stateAuthToken};`, `isClient=${isClient};`, `localStorageToken=${localStorageToken};`)
  return !!state.auth.token
}

const getGapi = function (state) {
  return state.google
}

export default {
  getConfig,
  getAuth,
  isAuth,
  getGapi
}
