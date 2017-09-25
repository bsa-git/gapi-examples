// The values in the configuration files "config/env/"
// will be overwritten by the values of "env.js" file
export default {
  app_env: 'testing', // development, production, testing
  global: {
    gapi: {
      apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      clientId: 'xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com'
    }
  },
  production: {
    api: {
      base_url: 'http://real-production.com/api'
    }
  },
  development: {
    api: {
      base_url: 'http://real-development.com/api'
    }
  },
  testing: {
    api: {
      base_url: 'http://real-testing.com/api'
    }
  }
}
