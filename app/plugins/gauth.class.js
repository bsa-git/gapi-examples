class AuthGoogle {
  /**
   * Constructor
   * Creates an instance of AuthGoogle.
   * @param {Object} An object of param settings.
   *  etc. {
   *  debug: true,
   *  ...
   *  }
   * @memberOf AuthGoogle
   */
  constructor (params) {
    this.debug = !!params.debug
    this.directAccess = true
    this.gapiUrl = 'https://apis.google.com/js/platform.js'
    // Config
    this.config = null
    if (typeof params === 'object') {
      // this.config = Object.assign(params, {scope: 'profile email https://www.googleapis.com/auth/plus.login'})
      this.config = params
    }
    this.auth2 = null
    this.currentUser = null
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
      } else {
        self._initClient(params).then(function () {
          if (self.debug) {
            console.log('googleClient.init - OK')
          }
          resolve()
        })
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
        if (self.debug) {
          console.log('GoogleAuth.signIn - Error: ', error)
        }
      })
    } else {
      this.auth2.grantOfflineAccess({'redirect_uri': 'postmessage'}).then(function (response) {
        successCallback(response.code)
        if (self.debug) {
          console.log('GoogleAuth.grantOfflineAccess - OK')
        }
      }, function (error) {
        errorCallback(error)
        if (self.debug) {
          console.log('GoogleAuth.grantOfflineAccess - Error: ', error)
        }
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
      if (self.debug) {
        console.log('GoogleAuth.signOut - OK')
      }
      successCallback()
    }, function (error) {
      errorCallback(error)
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
          if (self.debug) {
            console.log('GoogleAuth.addScope - OK')
          }
          successCallback(success)
          resolve()
        },
        function (fail) {
          console.log('GoogleAuth.addScope - Error:', fail)
          errorCallback(fail)
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
    if (this.debug) {
      console.log('isCurrentUser - OK', this.currentUser)
    }
    return !!this.currentUser.getId()
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
          self.listenCurrentUser(currentUser => {
            if (self.debug) {
              console.log(' _initClient.listenCurrentUser - OK', currentUser)
            }
            self.currentUser = currentUser
          })
          resolve()
        }, (error) => {
          this.error = error
          console.error('gapi.client.init - Error', error)
          alert(`gapi.client.init - Error: ${error.error}\n Details: ${error.details}`)
        })
      }
      if (window.gapi.client === undefined) {
        const libraries = (window.gapi.auth2 === undefined) ? 'client:auth2' : 'client'
        window.gapi.load(libraries, initClient)
      } else {
        initClient()
      }
    })
  }
}

export default AuthGoogle
