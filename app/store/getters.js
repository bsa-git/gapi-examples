const getConfig = function (state) {
  return state.config
}

const getGapi = function (state) {
  return state.google
}

export default {
  getConfig,
  getGapi
}
