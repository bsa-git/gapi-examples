class ApiGoogle {
  /**
   * Creates an instance of LoadGoogleAPI.
   * @param {Object} An object of param settings.
   *
   * @memberOf ApiGoogle
   */
  constructor (params) {
    this.name = 'load-google-api'
    this._callbackName = '__googleApiOnLoadCallback'
    this._clientURL = `https://apis.google.com/js/client.js?onload=${this._callbackName}`
    this._apiKey = params.apiKey
    this._clientId = params.clientId
    this._discoveryDocs = params.discoveryDocs
    this._scope = params.scope ? params.scope.join(' ') : ''
    // Error
    this.error = null
    // Debug
    this.debug = !!params.debug
  }

  /**
   * Injects the Google API Client script into the browser and
   * attaches a handler.
   * @returns {Promise} Returns a promise after injection.
   *
   * @memberOf ApiGoogle
   */
  loadGoogleAPI () {
    return new Promise((resolve, reject) => {
      const clientScriptElement = document.createElement('script')

      clientScriptElement.src = this._clientURL
      window[this._callbackName] = () => {
        resolve()
      }
      document.body.appendChild(clientScriptElement)
    })
  }

  /**
   * After the google api client library is loaded in the browser,
   * this function performs initialization of the client using the
   * credentials from auth file.
   * @returns {Promise} Returns a promise after successful login.
   *
   * @memberOf ApiGoogle
   */
  init () {
    const loadGapiClient = new Promise((resolve, reject) => {
      window.gapi.load('client:auth2', resolve)
    })

    const login = new Promise((resolve, reject) => {
      window.gapi.client.init({
        apiKey: this._apiKey,
        clientId: this._clientId,
        discoveryDocs: this._discoveryDocs,
        scope: this._scope
      }).then(resolve, (error) => {
        this.error = error
        console.error('Gapi.client.init - Error', error)
        alert(`Error: ${error.error}\n Details: ${error.details}`)
      })
    })

    return Promise.all([loadGapiClient, login])
  }

  loadGapiClient () {
    return new Promise((resolve, reject) => {
      window.gapi.load('client:auth2', resolve)
    })
  }

  iniGapiClient (params) {
    return new Promise((resolve, reject) => {
      window.gapi.client.init({
        apiKey: params.apiKey,
        clientId: params.clientId,
        discoveryDocs: params.discoveryDocs,
        scope: params.scope.join(' ')
      }).then(resolve, (error) => {
        this.error = error
        console.error('Gapi.client.init - Error', error)
        alert(`Error: ${error.error}\n Details: ${error.details}`)
      })
    })
  }

  loadGmailApi () {
    return new Promise((resolve, reject) => {
      window.gapi.client.load('gmail', 'v1', resolve)
    })
  }

  isSignedIn () {
    return window.gapi.auth2.getAuthInstance().isSignedIn.get()
  }

  listenSignedIn (onSigninStatus) {
    // Listen for sign-in state changes.
    if (this.debug) {
      console.log('listenSignedIn - OK')
    }
    window.gapi.auth2.getAuthInstance().isSignedIn.listen(onSigninStatus)
  }

  handleAuthClick (self) {
    if (self.debug) {
      console.log('handleAuthClick - OK')
    }
    if (window.gapi) {
      window.gapi.auth2.getAuthInstance().signIn()
    }
  }

  handleSignoutClick (self) {
    if (self.debug) {
      console.log('handleSignoutClick - OK')
    }
    if (window.gapi) {
      window.gapi.auth2.getAuthInstance().signOut()
    }
  }
}

export default ApiGoogle
