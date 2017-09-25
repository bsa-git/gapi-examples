const getConfig = function (state) {
  return state.config
}

const getConfigGapi = function (state) {
  return state.config.gapi
}

export default {
  getConfig,
  getConfigGapi
}
