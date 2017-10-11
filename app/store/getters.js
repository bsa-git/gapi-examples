const getConfig = function (state) {
  return state.config
}

const getAuth = function (state) {
  return state.auth
}

const isAuth = function (state) {
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
