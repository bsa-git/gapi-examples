class ApiGoogle {
  /**
   * Constructor
   * Creates an instance of ApiGoogle.
   * @param {Object} An object of param settings.
   *  etc. {
   *  debug: true,
   *  ...
   *  }
   * @memberOf ApiGoogle
   */
  constructor (params) {
    this.directAccess = true
    this.gapiUrl = 'https://apis.google.com/js/platform.js'
    // Config
    if (typeof params === 'object') {
      this.config = params
      this.debug = !!params.debug
    } else {
      this.config = null
      this.debug = false
    }
    this.auth2 = null
    this.currentUser = null

    if (this.debug) {
      console.log('ApiGoogle.constructor - OK: ', params)
    }
  }

  /**
   * Google Auth load/init
   * @return {Promise}
   */
  loadAuth (params) {
    const self = this
    return new Promise(function (resolve, reject) {
      if (window.gapi === undefined) {
        self._loadGoogleApi().then(function () {
          if (self.debug) {
            console.log('loadGoogleAPI - OK')
          }
          return self._initAuth(params)
        }).then(function () {
          if (self.debug) {
            console.log('googleAuth.init - OK')
          }
          resolve()
        })
      } else if (window.gapi !== undefined && window.gapi.auth2 === undefined) {
        self._initAuth(params).then(function () {
          if (self.debug) {
            console.log('googleAuth.init - OK')
          }
          resolve()
        })
      } else {
        resolve()
      }
    })
  }

  /**
   * Google Client/Auth load/init
   * @param params (Object)
   *  etc. {
   *  apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
   *  clientId: 'xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com',
   *  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
   *  scope: 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send'
   *  }
   * @return {Promise}
   */
  loadClient (params) {
    const self = this
    return new Promise(function (resolve, reject) {
      if (window.gapi === undefined) {
        self._loadGoogleApi().then(function () {
          if (self.debug) {
            console.log('loadGoogleAPI - OK')
          }
          return self._initClient(params)
        }).then(function () {
          if (self.debug) {
            console.log('googleClient.init - OK')
          }
          resolve()
        })
      } else if (window.gapi !== undefined && window.gapi.client === undefined) {
        self._initClient(params).then(function () {
          if (self.debug) {
            console.log('googleClient.init - OK')
          }
          resolve()
        })
      } else {
        resolve()
      }
    })
  }

  /**
   * Load Gmail Api
   * @return {Promise}
   */
  loadGmailApi () {
    return new Promise((resolve, reject) => {
      if (window.gapi.client.gmail === undefined) {
        window.gapi.client.load('gmail', 'v1', resolve)
      } else {
        resolve()
      }
    })
  }

  /**
   * Set direct access
   * @param value (Boolean)
   */
  setDirectAccess (value) {
    this.directAccess = value
  }

  /**
   * Google sign in
   * @param successCallback (Function)
   * @param errorCallback (Function)
   */
  signIn (successCallback, errorCallback) {
    const self = this
    if (this.directAccess) {
      this.auth2.signIn().then(function (googleUser) {
        successCallback(googleUser)
        if (self.debug) {
          console.log('GoogleAuth.signIn - OK')
        }
      }, function (error) {
        errorCallback(error)
        console.log('GoogleAuth.signIn - Error: ', error)
      })
    } else {
      this.auth2.grantOfflineAccess({'redirect_uri': 'postmessage'}).then(function (response) {
        successCallback(response.code)
        if (self.debug) {
          console.log('GoogleAuth.grantOfflineAccess - OK')
        }
      }, function (error) {
        errorCallback(error)
        console.log('GoogleAuth.grantOfflineAccess - Error: ', error)
      })
    }
  }

  /**
   * Google sign out
   * @param successCallback (Function)
   * @param errorCallback (Function)
   */
  signOut (successCallback, errorCallback) {
    const self = this
    this.auth2.signOut().then(function () {
      successCallback()
      if (self.debug) {
        console.log('GoogleAuth.signOut - OK')
      }
    }, function (error) {
      errorCallback(error)
      console.log('GoogleAuth.signOut - Error: ', error)
    })
  }

  /**
   * Add google auth scope
   * @param scope (String)
   * @param successCallback (Function)
   * @param errorCallback (Function)
   * @return {Promise}
   */
  addScope (scope, successCallback, errorCallback) {
    const self = this
    return new Promise(function (resolve, reject) {
      const options = new window.gapi.auth2.SigninOptionsBuilder()
      options.setScope(scope)

      self.currentUser.grant(options).then(
        function (success) {
          successCallback(success)
          if (self.debug) {
            console.log('GoogleAuth.addScope - OK')
          }
          resolve()
        },
        function (fail) {
          errorCallback(fail)
          console.log('GoogleAuth.addScope - Error:', fail)
        })
    })
  }

  /**
   * Google auth disconnect (Revokes all of the scopes that the user granted.)
   *
   */
  disconnect () {
    this.auth2.disconnect()
    if (this.debug) {
      console.log('GoogleAuth.disconnect - OK')
    }
  }

  /**
   * Returns whether the current user is currently signed in.
   * @return {Boolean}
   */
  isSignedIn () {
    return this.auth2.isSignedIn.get()
  }

  /**
   * Listen for changes in the current user's sign-in state.
   * @param onSigninStatus (Function)
   */
  listenSignedIn (onSigninStatus) {
    this.auth2.isSignedIn.listen(onSigninStatus)
    if (this.debug) {
      console.log('listenSignedIn - OK')
    }
  }

  /**
   * Listen for changes in currentUser.
   * @param onCurrentUser (Function)
   */
  listenCurrentUser (onCurrentUser) {
    this.auth2.currentUser.listen(onCurrentUser)
    if (this.debug) {
      console.log('listenCurrentUser - OK')
    }
  }

  /**
   * Get the user's unique ID string.
   * @return {boolean}
   */
  isCurrentUser () {
    return this.currentUser ? !!this.currentUser.getId() : false
  }

  /**
   * Get current user info
   * @return {Object}
   * etc. {
   * token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNmN2RjZjY2YjUwZDZiZGExMTgwYjcwNjdlYzhhZTlhNDhjYzU2YTQifQ...',
   * id: '110341449488589699610',
   * fullName: 'Molly King',
   * givenName: 'Molly',
   * familyName: 'King',
   * imageURL: 'https://test.com/images/user.jpg',
   * email: 'user@test.com'
   * }
   */
  getCurrentUserInfo () {
    let userInfo = {}
    // -------------------
    if (!this.isCurrentUser()) {
      return userInfo
    }
    // Get UserInfo
    const profile = this.currentUser.getBasicProfile()
    userInfo.token = this.currentUser.getAuthResponse().id_token
    userInfo.id = profile.getId()
    userInfo.fullName = profile.getName()
    userInfo.givenName = profile.getGivenName()
    userInfo.familyName = profile.getFamilyName()
    userInfo.imageURL = profile.getImageUrl()
    userInfo.email = profile.getEmail()

    return userInfo
  }

  /**
   * Load google api
   * @return {Promise}
   * @private
   */
  _loadGoogleApi () {
    const self = this
    return new Promise(function (resolve, reject) {
      const script = document.createElement('script')
      script.src = self.gapiUrl
      script.onreadystatechange = script.onload = function () {
        if (!script.readyState || /loaded|complete/.test(script.readyState)) {
          setTimeout(function () {
            resolve()
          }, 500)
        }
      }
      document.getElementsByTagName('head')[0].appendChild(script)
    })
  }

  /**
   * Google auth  load/init
   * @param params (Object)
   * @param params (Object)
   *  etc. {
   *  clientId: 'xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com',
   *  scope: 'profile email https://www.googleapis.com/auth/plus.login'
   *  }
   * @return {Promise}
   * @private
   */
  _initAuth (params) {
    const self = this
    return new Promise(function (resolve, reject) {
      window.gapi.load('auth2', function () {
        // Auth2 Init
        self.auth2 = window.gapi.auth2.init(params)
        self.auth2.then(() => {
          // Get currentUser
          self.currentUser = self.auth2.currentUser.get()
          self.listenCurrentUser(currentUser => {
            self.currentUser = currentUser
          })
          resolve()
        }, (error) => {
          this.error = error
          console.error('gapi.auth2.init - Error', error)
          alert(`gapi.auth2.init - Error: ${error.error}\n Details: ${error.details}`)
        })
      })
    })
  }

  /**
   * Google client  load/init
   * @param params (Object)
   *  etc. {
   *  apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
   *  clientId: 'xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com',
   *  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
   *  scope: 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send'
   *  }
   * @return {Promise}
   * @private
   */
  _initClient (params) {
    const self = this
    return new Promise(function (resolve, reject) {
      // Client Init
      const initClient = function () {
        window.gapi.client.init(params).then(() => {
          // Get GoogleAuth
          self.auth2 = window.gapi.auth2.getAuthInstance()
          // Get currentUser
          self.currentUser = self.auth2.currentUser.get()
          self.listenCurrentUser(currentUser => {
            self.currentUser = currentUser
          })
          resolve()
        }, (error) => {
          this.error = error
          console.error('gapi.client.init - Error', error)
          alert(`gapi.client.init - Error: ${error.error}\n Details: ${error.details}`)
        })
      }
      const libraries = (window.gapi.auth2 === undefined) ? 'client:auth2' : 'client'
      window.gapi.load(libraries, initClient)
    })
  }

  /**
   *  Static load google API
   * @param params
   *  etc. {
   *  apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
   *  clientId: 'xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com',
   *  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
   *  scope: 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send'
   *  }
   * @return {Promise}
   */
  static staticLoadGoogleAPI (params) {
    const apiGoogle = new ApiGoogle({debug: params.debug})

    return new Promise(function (resolve, reject) {
      // Load/Init Google API
      const _params = {
        apiKey: params.apiKey,
        clientId: params.clientId,
        discoveryDocs: params.discoveryDocs,
        scope: params.scope
      }
      apiGoogle.loadClient(_params)
        .then(() => {
          if (params.debug) {
            console.log('apiGoogle.load - OK')
          }
          resolve(apiGoogle)
        })
    })
  }
}

export default ApiGoogle
