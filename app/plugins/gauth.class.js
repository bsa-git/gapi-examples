class AuthGoogle {
  /**
   * Constructor
   * Creates an instance of AuthGoogle.
   * @param {Object} An object of param settings.
   *
   * @memberOf AuthGoogle
   */
  constructor (params) {
    this.debug = !!params.debug
    this.directAccess = false
    this.gapiUrl = 'https://apis.google.com/js/platform.js'
    // Config
    this.config = null
    if (typeof params === 'object') {
      this.config = Object.assign(params, {scope: 'profile email https://www.googleapis.com/auth/plus.login'})
    }
    this.auth2 = null
    this.currentUser = null
  }

  loadAuth () {
    const self = this
    return new Promise(function (resolve, reject) {
      if (window.gapi === undefined) {
        self._loadGoogleApis().then(function () {
          if (self.debug) {
            console.log('loadGoogleAPI - OK')
          }
          return self._initAuth()
        }).then(function () {
          if (self.debug) {
            console.log('googleAuth.init - OK')
          }
          resolve()
        })
      } else if (window.gapi !== undefined && window.gapi.auth2 === undefined) {
        self._initAuth().then(function () {
          if (self.debug) {
            console.log('googleAuth.init - OK')
          }
          resolve()
        })
      }
    })
  }

  loadClient () {
    const self = this
    return new Promise(function (resolve, reject) {
      if (window.gapi === undefined) {
        self._loadGoogleApis().then(function () {
          if (self.debug) {
            console.log('loadGoogleAPI - OK')
          }
          return self._initClient()
        }).then(function () {
          if (self.debug) {
            console.log('googleClient.init - OK')
          }
          resolve()
        })
      } else if (window.gapi !== undefined && window.gapi.auth2 === undefined) {
        self._initClient().then(function () {
          if (self.debug) {
            console.log('googleClient.init - OK')
          }
          resolve()
        })
      }
    })
  }

  setDirectAccess (value) {
    this.directAccess = value
  }

  signIn (successCallback, errorCallback) {
    const self = this
    if (this.directAccess) {
      this.auth2.signIn().then(function (googleUser) {
        if (self.debug) {
          console.log('GoogleAuth.signIn - OK')
        }
        successCallback(googleUser)
      }, function (error) {
        errorCallback(error)
      })
    } else {
      this.auth2.grantOfflineAccess({'redirect_uri': 'postmessage'}).then(function (response) {
        if (self.debug) {
          console.log('GoogleAuth.grantOfflineAccess - OK')
        }
        successCallback(response.code)
      }, function (error) {
        errorCallback(error)
      })
    }
  }

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

  disconnect () {
    this.auth2.disconnect()
    if (this.debug) {
      console.log('GoogleAuth.disconnect - OK')
    }
  }

  isSignedIn () {
    return this.auth2.isSignedIn.get()
  }

  listenSignedIn (onSigninStatus) {
    // Listen for sign-in state changes.
    this.auth2.isSignedIn.listen(onSigninStatus)
    if (this.debug) {
      console.log('listenSignedIn - OK')
    }
  }

  listenCurrentUser (onCurrentUser) {
    // Listen for currentUser changes.
    this.auth2.currentUser.listen(onCurrentUser)
    if (this.debug) {
      console.log('listenCurrentUser - OK')
    }
  }

  isCurrentUser () {
    return !!this.currentUser.getId()
  }

  _loadGoogleApis () {
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

  _initAuth () {
    const self = this
    return new Promise(function (resolve, reject) {
      window.gapi.load('auth2', function () {
        // Auth2 Init
        self.auth2 = window.gapi.auth2.init(self.config)
        // Get currentUser
        self.listenCurrentUser(currentUser => {
          self.currentUser = currentUser
        })
        resolve()
      })
    })
  }

  _initClient (params) {
    const self = this
    return new Promise(function (resolve, reject) {
      window.gapi.load('client', function () {
        // Client Init
        self.auth2 = window.gapi.client.init({
          apiKey: params.apiKey,
          clientId: params.clientId,
          discoveryDocs: params.discoveryDocs,
          scope: params.scope.join(' ')
        }).then(() => {
          // Get currentUser
          self.listenCurrentUser(currentUser => {
            self.currentUser = currentUser
          })
          resolve()
        }, (error) => {
          this.error = error
          console.error('Gapi.client.init - Error', error)
          alert(`Error: ${error.error}\n Details: ${error.details}`)
        })
      })
    })
  }
}

export default AuthGoogle
