// The values in the configuration files "config/env/"
// will be overwritten by the values of "env.js" file
export default {
  app_env: 'testing', // development, production, testing
  global: {
    gapi: {
      apiKey: 'AIzaSyAks3ZH_qSivh8UhA0V94Cy_60Q_-W524Y',
      clientId: '311979767912-l8upval51s4evdt43gonavi99ucjbpkg.apps.googleusercontent.com'
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
